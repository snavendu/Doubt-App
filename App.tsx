import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import RootContainer from "./src/navigation/Dashboard";

export default function App() {
    return (
        <View style={styles.container}>
            <RootContainer />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
