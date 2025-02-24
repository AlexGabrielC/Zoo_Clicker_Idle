import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Quetes = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Liste des Quêtes</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f0f0",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
    },
});

export default Quetes;
