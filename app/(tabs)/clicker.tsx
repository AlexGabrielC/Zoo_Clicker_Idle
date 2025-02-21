import React, { useState, useEffect, useContext } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { GameContext } from "../context/GameContext"; // Ajustez le chemin selon votre structure

const Clicker: React.FC = () => {
    const { caca, setCaca, cacaPerClick } = useContext(GameContext);
    const [currentFrame, setCurrentFrame] = useState<number>(0);
    const [isHurt, setIsHurt] = useState<boolean>(false);
    const [cacaPerSecond, setCacaPerSecond] = useState<number>(0); // Caca gagné par seconde

    // Animation "idle" et "hurt" (comme dans votre code actuel)
    const idleFrames = [
        require("../../assets/animations/idle/FA_TEDDY_Idle_000.png"),
        require("../../assets/animations/idle/FA_TEDDY_Idle_001.png"),
        require("../../assets/animations/idle/FA_TEDDY_Idle_002.png"),
        require("../../assets/animations/idle/FA_TEDDY_Idle_003.png"),
        require("../../assets/animations/idle/FA_TEDDY_Idle_004.png"),
        require("../../assets/animations/idle/FA_TEDDY_Idle_005.png"),
        require("../../assets/animations/idle/FA_TEDDY_Idle_006.png"),
        require("../../assets/animations/idle/FA_TEDDY_Idle_007.png"),
        require("../../assets/animations/idle/FA_TEDDY_Idle_008.png"),
        require("../../assets/animations/idle/FA_TEDDY_Idle_009.png"),
        require("../../assets/animations/idle/FA_TEDDY_Idle_010.png"),
        require("../../assets/animations/idle/FA_TEDDY_Idle_011.png"),
    ];

    // Animation "hurt"
    const hurtFrames = [
        require("../../assets/animations/hurt/FA_TEDDY_Hurt_000.png"),
        require("../../assets/animations/hurt/FA_TEDDY_Hurt_001.png"),
        require("../../assets/animations/hurt/FA_TEDDY_Hurt_002.png"),
        require("../../assets/animations/hurt/FA_TEDDY_Hurt_003.png"),
        require("../../assets/animations/hurt/FA_TEDDY_Hurt_004.png"),
        require("../../assets/animations/hurt/FA_TEDDY_Hurt_005.png"),
    ];

    const frames = isHurt ? hurtFrames : idleFrames;

    const handleClick = () => {
        setCaca(caca + cacaPerClick); // Ajoute du caca en fonction de cacaPerClick
        setIsHurt(true);
        setTimeout(() => setIsHurt(false), 500);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentFrame((prevFrame) => (prevFrame + 1) % frames.length); // On passe à la frame suivante
        }, 100); // Intervalle de 100ms entre chaque image

        return () => clearInterval(interval); // Cleanup de l'intervalle lors du démontage du composant
    }, [isHurt]); // Recréer l'intervalle lorsque l'état de l'animation change

    useEffect(() => {
        const interval = setInterval(() => {
            setCaca((prev: number) => prev + cacaPerSecond); // Ajoute du caca chaque seconde
        }, 1000);

        return () => clearInterval(interval);
    }, [cacaPerSecond]);
    
    return (
        <View style={styles.container}>
            <Text style={styles.title}>💩 Caca: {caca}</Text>

            <TouchableOpacity onPress={handleClick}>
                <Image source={frames[currentFrame]} style={styles.image} />
            </TouchableOpacity>

            <Text style={styles.text}>Cliquez sur l'ours pour gagner des cacas !</Text>
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
        marginBottom: 20,
    },
    image: {
        width: 150,
        height: 150,
    },
    text: {
        fontSize: 16,
        marginTop: 20,
    },
});

export default Clicker;