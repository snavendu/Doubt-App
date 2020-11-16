import React from "react";
import {
    TouchableOpacity,
    View,
    Text,
    ScrollView,
    StyleSheet,
} from "react-native";
import { colors } from "react-native-elements";

export const Badges = (props: any) => {
    return (
        <TouchableOpacity
            onPress={() => {
                props.selectHandler(props.name);
            }}
        >
            <View
                style={{
                    backgroundColor: props.inverted ? colors.grey5 : "black",
                    margin: 10,
                    ...styles.Badg,
                }}
            >
                <Text
                    style={{
                        color: props.inverted ? "black" : colors.grey5,
                        justifyContent: "center",
                        alignItems: "center",
                        flex: 1,
                    }}
                >
                    {props.name}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const Bubbles = (props: any) => {
    return (
        <View>
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={{
                    flexDirection: "row",
                    backgroundColor: "white",
                    marginTop: 10,
                }}
            >
                {props.data.map((f: any, i: any) => (
                    <Badges
                        key={i}
                        inverted={props.active !== f}
                        name={f}
                        selectHandler={(name: string) => props.setActive(name)}
                    />
                ))}
            </ScrollView>
        </View>
    );
};
export default Bubbles;
export const styles = StyleSheet.create({
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
