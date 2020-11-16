import React, { useState, useEffect, useRef } from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import { Camera } from "expo-camera";
import { Feather as Icons } from "@expo/vector-icons";
import { colors, Input, Button } from "react-native-elements";
import { Badges } from "../ui/Bubbly";
import { IDoubt } from "./Doubt";
import moment from "moment";
import shortid from "shortid";
const subjects = [
    "Physics",
    "Chemistry",
    "Maths",
    "Social Science",
    "English",
    "Hindi",
];
interface IProps {
    navigation: any;
}
export default function App(props: IProps) {
    const [hasPermission, setHasPermission] = useState(false);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [sub, setsub] = useState("");
    const [content, setcontent] = useState("");
    const [subject, setsubject] = useState("");
    const [doubt, setdoubt] = useState();
    const [img, setimg] = useState("");
    const [error, seterror] = useState();
    const [camera, setcamera] = useState(false);
    const cam = useRef();
    const _takePicture = async () => {
        if (cam.current) {
            const option = { quality: 0.5, base64: true, skipProcessing: true };
            const picture = await cam.current.takePictureAsync(option);
            if (picture.uri) {
                cam.current.resumePreview();
                console.log(picture.uri);
                setimg(picture.uri);
                setcamera(false);
            }
        }
    };

    function handler() {
        if (!sub) {
            seterror(1);
            return;
        }
        if (!content) {
            seterror(2);
            return;
        }
        if (!subject) {
            alert("Please select one of the subject tag");
            return;
        }
        const doubt: IDoubt = {
            id: shortid(),
            user: {
                id: shortid(),
                name: "Navendu Shekhar",
            },
            content: {
                content,
                sub,
                subject,
                screenShot: img,
            },
            submitted_at: moment().format("Do MM YYYY"),
        };
        setdoubt(doubt);
        props.navigation.navigate("Doubt", { doubt });
    }

    const renderForm = () => {
        return (
            <View style={{ flex: 1, margin: 10 }}>
                <Text
                    style={{
                        fontSize: 22,
                        fontWeight: "bold",
                        marginBottom: 20,
                    }}
                >
                    Submit Your Doubt regarding your Subject
                </Text>
                <Input
                    value={sub}
                    onFocus={() => seterror(0)}
                    label="Topic"
                    onChangeText={setsub}
                    errorMessage={error === 1 ? "*Topic field is required" : ""}
                />
                <Input
                    value={content}
                    label="Ask Question"
                    onFocus={() => seterror(0)}
                    onChangeText={setcontent}
                    multiline
                    errorStyle={{ color: colors.error }}
                    errorMessage={
                        error === 2 ? "*content field is required" : ""
                    }
                />
                <View style={{ flexDirection: "row" }}>
                    {img ? (
                        <Image
                            source={{ uri: img }}
                            style={{
                                width: 80,
                                height: 80,
                                margin: 10,
                                borderRadius: 10,
                                borderColor: colors.primary,
                                borderWidth: 2,
                            }}
                        />
                    ) : null}
                    <Icons
                        onPress={() => setcamera(true)}
                        name="camera"
                        size={80}
                        color={colors.primary}
                    />
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        flexWrap: "wrap",
                        marginTop: 10,
                    }}
                >
                    {subjects.map((s, i) => (
                        <Badges
                            key={i}
                            inverted={s !== subject}
                            name={s}
                            selectHandler={(name: string) =>
                                s === subject ? setsubject("") : setsubject(s)
                            }
                        />
                    ))}
                </View>
                <Button
                    title="Submit Doubt"
                    containerStyle={{
                        position: "absolute",
                        bottom: 20,
                        right: 15,
                    }}
                    titleStyle={{ fontSize: 22 }}
                    buttonStyle={{ borderRadius: 7 }}
                    onPress={handler}
                />
            </View>
        );
    };

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === "granted");
        })();
    }, []);

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }
    return (
        <View style={{ flex: 1 }}>
            {!camera ? (
                renderForm()
            ) : (
                <Camera ref={cam} style={{ flex: 1 }} type={type}>
                    <View
                        style={{
                            flex: 1,
                            backgroundColor: "transparent",
                            flexDirection: "row",
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                alignSelf: "flex-end",
                                justifyContent: "center",
                            }}
                            onPress={() => {
                                // setType(
                                //     type === Camera.Constants.Type.back
                                //         ? Camera.Constants.Type.front
                                //         : Camera.Constants.Type.back
                                // );
                                _takePicture();
                            }}
                        >
                            <View
                                style={{
                                    marginBottom: 10,
                                }}
                            >
                                <Icons
                                    name="aperture"
                                    size={80}
                                    color={colors.primary}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                </Camera>
            )}
        </View>
    );
}
