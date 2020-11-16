import React from "react";
import { TouchableOpacity, View, Image, StyleSheet, Text } from "react-native";
import { colors } from "react-native-elements";
import { IDoubt } from "./Interface";

export default function Detail(props: any) {
    const { doubt }: { doubt: IDoubt } = props.route.params;
    const renderImages = () => {
        const media = doubt.content?.screenShot!;
        if (!media) {
            return null;
        }
        return (
            <TouchableOpacity>
                <View style={{ flex: 1 }}>
                    <Image
                        source={{ uri: media }}
                        style={{ height: 250, margin: 10, borderRadius: 10 }}
                    />
                </View>
            </TouchableOpacity>
        );
    };

    const renderTopic = () => {
        return <Text style={styles.Title}>{doubt.content.sub}</Text>;
    };

    const renderContent = () => {
        return <Text style={styles.SubTitle}>{doubt.content.content}</Text>;
    };

    return (
        <View style={styles.container}>
            {renderTopic()}
            {renderContent()}
            {renderImages()}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    Title: {
        fontSize: 20,
        fontWeight: "bold",
        margin: 10,
    },
    SubTitle: {
        fontSize: 18,
        color: colors.grey3,
        margin: 10,
    },
});
