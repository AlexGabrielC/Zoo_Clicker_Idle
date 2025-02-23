import React, { useState, useEffect, useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { GameContext } from "../context/GameContext"; // Importez le contexte

export default function TimedClicker() {
    const { caca, setCaca, cacaPerClick, cacaPerSecond } = useContext(GameContext); // Utilisez le contexte
    const [timeLeft, setTimeLeft] = useState(60);
    const [score, setScore] = useState(0);
    const [isGameOver, setIsGameOver] = useState(false);

    useEffect(() => {
        if (timeLeft > 0 && !isGameOver) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        } else if (timeLeft === 0) {
            setIsGameOver(true);
        }
    }, [timeLeft, isGameOver]);

    useEffect(() => {
        if (!isGameOver) {
            const interval = setInterval(() => {
                setCaca((prevCaca) => prevCaca + cacaPerSecond);
                setScore((prevScore) => prevScore + cacaPerSecond);
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [cacaPerSecond, isGameOver]);

    const handleClick = () => {
        if (!isGameOver) {
            setCaca(caca + cacaPerClick); // À chaque clic, on ajoute du caca en fonction de cacaPerClick
            setScore(score + cacaPerClick); // Mettre à jour le score
        }
    };

    const restartGame = () => {
        setTimeLeft(60);
        setScore(0);
        setIsGameOver(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Temps restant: {timeLeft} secondes</Text>
            <Text style={styles.title}>💩 Score: {score}</Text>

            {isGameOver ? (
                <View>
                    <Text style={styles.gameOverText}>Temps écoulé! Votre score est de {score} cacas.</Text>
                    <TouchableOpacity style={styles.restartButton} onPress={restartGame}>
                        <Text style={styles.restartButtonText}>Rejouer</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <TouchableOpacity onPress={handleClick}>
                    <Image source={require('../../assets/animations/idle/FA_TEDDY_Idle_000.png')} style={styles.image} />
                </TouchableOpacity>
            )}
        </View>
    );
}

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
    gameOverText: {
        fontSize: 20,
        marginTop: 20,
    },
    restartButton: {
        backgroundColor: "#ddd",
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
    },
    restartButtonText: {
        fontSize: 16,
    },
});
