import React, { useContext, useState, useEffect } from "react";
import {View, Text, StyleSheet, Button, ImageBackground, TouchableOpacity} from "react-native";
import { GameContext } from "@/context/GameContext";  // Assurez-vous que ce chemin est correct

interface Quest {
    id: number;
    title: string;
    description: string;
    level: number;
    goal: number;
    reward: number;
    progress: number;
}

const questsData: Quest[] = [
    {
        id: 1,
        title: "Augmenter de 100 caca par clique'",
        description: "Cette mission est repeatable.",
        level: 1,
        goal: 100,
        reward: 500,
        progress: 0,  // Progression en fonction de caca
    },
    {
        id: 2,
        title: "Augmenter de 10 caca par seconde'",
        description: "Cette mission est repeatable.",
        level: 1,
        goal: 10,
        reward: 500,
        progress: 0,  // Progression en fonction de cacaPerSecond
    },
];

const Quetes = () => {
    const { caca, setCaca, cacaPerClick, setCacaPerClick, cacaPerSecond, setCacaPerSecond } = useContext(GameContext);
    const [quests, setQuests] = useState(questsData);

    // Fonction pour vérifier si la quête est terminée
    const isQuestCompleted = (quest: Quest) => {
        return quest.progress >= quest.goal;
    };

    // Fonction pour gérer la récompense de la quête
    const handleQuestReward = (questId: number) => {
        setQuests((prevQuests) =>
            prevQuests.map((quest) => {
                if (quest.id === questId) {
                    // Augmenter la récompense et le niveau de la quête
                    const newLevel = quest.level + 1;
                    const newReward = quest.reward + (quest.reward * 0.2); // Augmenter la récompense de 20%
                    return {
                        ...quest,
                        level: newLevel,
                        reward: Math.round(newReward),
                        progress: 0,  // Réinitialiser la progression
                    };
                }
                return quest;
            })
        );
    };

    // Fonction de mise à jour de la progression
    useEffect(() => {
        const updateProgress = () => {
            setQuests((prevQuests) =>
                prevQuests.map((quest) => {
                    let newProgress = quest.progress;

                    // Mise à jour de la progression en fonction du caca
                    if (quest.title.includes("clique")) {
                        newProgress = cacaPerClick - quest.goal*(quest.level-1);
                    } else if (quest.title.includes("seconde")) {
                        newProgress = cacaPerSecond - quest.goal*(quest.level-1);
                    }

                    return {
                        ...quest,
                        progress: newProgress,
                    };
                })
            );
        };

        // Intervalle pour mettre à jour la progression des quêtes en fonction du caca par seconde
        const interval = setInterval(updateProgress, 1000);

        return () => clearInterval(interval);
    }, [cacaPerClick, cacaPerSecond]);

    return (
        <ImageBackground
            source={require("../../assets/images/fond_up.png")}
            style={styles.containerfd}
            imageStyle={{ resizeMode: 'cover', height: '100%', width: '100%' }}
        >
            <View style={styles.container}>
                <Text style={styles.title}>Liste des Quêtes</Text>
                <View style={styles.questsList}>
                    {quests.map((quest) => (
                        <View key={quest.id} style={styles.questContainer}>
                            <Text style={styles.questTitle}>{quest.title}</Text>
                            <Text style={styles.questDescription}>{quest.description}</Text>
                            <Text style={styles.questProgress}>
                                Progression: {quest.progress} / {quest.goal}
                            </Text>

                            {/* Si la quête est terminée, afficher la récompense */}
                            {isQuestCompleted(quest) ? (
                                <TouchableOpacity style={styles.butonReward} onPress={() => handleQuestReward(quest.id)}>
                                    <Text style={styles.butonRewardText}>Reclamer</Text>
                                </TouchableOpacity>
                            ) : (
                                <Text style={styles.reward}>Récompense: {quest.reward}</Text>
                            )}
                        </View>
                    ))}
                </View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    containerfd: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f0f0",
    },
    container: {
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
        color: "#a1e164", // Une couleur naturelle, douce et moderne
        textShadowColor: "#000", // Ombre douce, correspondant au dégradé du fond
        textShadowOffset: { width: 3, height: 3 }, // Décalage pour l'effet de bord
        textShadowRadius: 3, // Rayon de l'ombre pour plus de douceur
        fontFamily: "Arial", // Vous pouvez personnaliser la police ici selon vos préférences
    },
    questsList: {
        width: "100%",
        paddingHorizontal: 20,
    },
    questContainer: {
        backgroundColor: "rgba(168,169,168,0.5)",
        padding: 15,
        borderRadius: 15,
        marginVertical: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
        borderWidth: 4, // Largeur du cadre
        borderColor: "#000", // Couleur du cadre
    },

    questTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 5,
    },
    questDescription: {
        fontSize: 14,
        marginBottom: 10,
    },
    questProgress: {
        fontSize: 14,
        marginBottom: 10,
    },
    butonRewardContainer: {
        marginTop: 10,
        borderRadius: 5,
        overflow: 'hidden', // Pour appliquer les bords arrondis
        backgroundColor: "#4CAF50", // Couleur de fond du bouton
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5, // Pour Android
    },
    butonReward: {
        paddingVertical: 12,
        paddingHorizontal: 5,
        backgroundColor: "#4CAF50",  // Couleur de fond du bouton
        borderRadius: 10,
        borderColor: "#130e0e",
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    butonRewardText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
    },
    reward: {
        fontSize: 16,
        color: "green",
        fontWeight: "bold",
    },
});

export default Quetes;
