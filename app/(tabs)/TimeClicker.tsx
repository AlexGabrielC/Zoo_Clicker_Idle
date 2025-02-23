import React, { useState, useEffect, useContext, useCallback } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, Modal, Button } from "react-native";
import { GameContext } from "@/context/GameContext"; // Importez le contexte
import { useNavigation, useFocusEffect } from "@react-navigation/native"; // Importez useNavigation et useFocusEffect

export default function TimedClicker() {
    const { cacaPerClick, cacaPerSecond } = useContext(GameContext); // Utilisez le contexte
    const navigation = useNavigation(); // Utilisez useNavigation pour obtenir l'objet de navigation
    const [timeLeft, setTimeLeft] = useState(60);
    const [score, setScore] = useState(0); // Utilisez un état local pour le score
    const [isGameOver, setIsGameOver] = useState(false);
    const [isModalVisible, setModalVisible] = useState(true); // État pour la modal
    const [isGameStarted, setGameStarted] = useState(false); // État pour savoir si le jeu a commencé

    useFocusEffect(
        useCallback(() => {
            // Réinitialiser l'état de la modal lorsque l'écran est focus
            setModalVisible(true);
            setGameStarted(false);
            setTimeLeft(60);
            setScore(0);
            setIsGameOver(false);
        }, [])
    );

    useEffect(() => {
        if (isGameStarted && timeLeft > 0 && !isGameOver) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        } else if (timeLeft === 0) {
            setIsGameOver(true);
        }
    }, [timeLeft, isGameOver, isGameStarted]);

    useEffect(() => {
        if (isGameStarted && !isGameOver) {
            const interval = setInterval(() => {
                setScore((prevScore) => prevScore + cacaPerSecond);
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [cacaPerSecond, isGameOver, isGameStarted]);

    const handleClick = useCallback(() => {
        if (!isGameOver) {
            setScore(score + cacaPerClick); // Mettre à jour le score local
        }
    }, [isGameOver, score, cacaPerClick]);

    const restartGame = useCallback(() => {
        setTimeLeft(60);
        setScore(0);
        setIsGameOver(false);
        setGameStarted(true);
    }, []);

    const startGame = useCallback(() => {
        setModalVisible(false);
        setGameStarted(true);
    }, []);

    const closeModal = useCallback(() => {
        setModalVisible(false);
        navigation.goBack(); // Retourne à l'écran précédent
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>Voulez-vous jouer en mode Contre la Montre ?</Text>
                        <Button title="Oui" onPress={startGame} />
                        <Button title="Non" onPress={closeModal} />
                    </View>
                </View>
            </Modal>

            {!isModalVisible && (
                <>
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
                </>
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
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        alignItems: "center",
    },
    modalText: {
        fontSize: 18,
        marginBottom: 20,
    },
});
