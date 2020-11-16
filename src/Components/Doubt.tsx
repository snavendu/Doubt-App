import React, { useEffect, useState } from "react";
import {
    Text,
    View,
    StyleSheet,
    FlatList,
    RefreshControl,
    TouchableOpacity,
} from "react-native";
import { ListItem, Avatar, colors } from "react-native-elements";
import Bubbles from "../ui/Bubbly";
import { IDoubt, InitialData } from "./Interface";

interface IProps {
    navigation: any;
    route: any;
}

export default function Doubt(props: IProps) {
    const [doubt, setdoubt] = useState<IDoubt[]>(InitialData);
    const [active, setactive] = useState("All");
    useEffect(() => {
        if (props?.route?.params?.doubt!) {
            console.log("updating");
            const d = [...doubt];
            d.push(props?.route?.params?.doubt!);
            setdoubt(d);
        }
    }, [props?.route?.params?.doubt!]);
    const renderDoubtList = ({ item }: { item: IDoubt }) => {
        const splitted = item?.user?.name?.split(" ")!;
        const initials = `${splitted[0]?.slice(0, 1)}${
            splitted.length > 1 ? splitted[1]?.slice(0, 1) : ""
        }`;
        console.log(item.content.sub);
        return (
            <View>
                <ListItem
                    onPress={() =>
                        props.navigation.navigate("DoubtDetail", {
                            doubt: item,
                        })
                    }
                    leftElement={
                        <Avatar
                            title={initials.toUpperCase()}
                            rounded
                            source={{
                                uri: "abc.abc",
                            }}
                            size="medium"
                            titleStyle={{
                                color: "black",
                                fontSize: 22,
                                fontWeight: "bold",
                            }}
                            avatarStyle={{
                                backgroundColor: colors.primary,
                                opacity: 0.5,
                            }}
                        />
                    }
                    bottomDivider
                    title={item.content.sub}
                    subtitle={item.content.content.substring(0, 30) + "..."}
                    rightElement={
                        <Text style={{ fontSize: 12 }}>
                            {item.submitted_at}
                        </Text>
                    }
                />
            </View>
        );
    };
    return (
        <View style={styles.container}>
            <Bubbles
                active={active}
                setActive={(a: any) => setactive(a)}
                data={[
                    "All",
                    "Physics",
                    "Chemistry",
                    "Maths",
                    "Social Science",
                    "English",
                    "Hindi",
                ]}
            />
            <FlatList
                data={
                    active === "All"
                        ? doubt
                        : doubt.filter((d) => d.content.subject === active)
                }
                renderItem={renderDoubtList}
                keyExtractor={(item) => item?.id}
                // onRefresh={fetchConvo}
                refreshControl={
                    <RefreshControl refreshing={false} onRefresh={() => {}} />
                }
            />
            <TouchableOpacity
                onPress={() => props.navigation.navigate("CreateDoubt")}
                style={styles.add}
            >
                <Text style={{ fontSize: 40, color: "blue" }}>+</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        marginTop: 30,
    },
    add: {
        position: "absolute",
        height: 70,
        width: 70,
        borderRadius: 35,
        bottom: 30,
        right: 30,
        backgroundColor: colors.primary,
        alignItems: "center",
        justifyContent: "center",
    },
    Badg: {
        height: 30,
        borderRadius: 20,
        padding: 5,
        paddingLeft: 10,
        paddingRight: 10,
    },
});
