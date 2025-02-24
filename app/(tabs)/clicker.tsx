import React, { useState, useEffect, useContext } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, ImageBackground } from "react-native";
import { GameContext } from "@/context/GameContext"; // Importez le contexte
import * as Notifications from 'expo-notifications';
import { AppState } from 'react-native';
import SettingsIcon from "@/components/SettingsIcon";

export default function Clicker() {
    const { caca, setCaca, cacaPerClick } = useContext(GameContext); // Utilisez le contexte
    const [currentFrame, setCurrentFrame] = useState(0); // Frame actuelle de l'animation
    const [isHurt, setIsHurt] = useState(false); // État pour déterminer si l'ours est blessé
    const [lastActivity, setLastActivity] = useState(Date.now()); // Dernière activité utilisateur

    // Animation "idle"
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

    // Choisir le bon tableau d'images en fonction de l'état (idle ou hurt)
    const frames = isHurt ? hurtFrames : idleFrames;

    // Fonction pour gérer l'inactivité et planifier la notification
    useEffect(() => {
        const inactivityInterval = setInterval(() => {
            if (Date.now() - lastActivity > 60 * 1000) {
                scheduleNotification(); // Si 4 heures sont passées, planifier une notification
            }
        }, 60000); // Vérification toutes les 60 secondes

        return () => clearInterval(inactivityInterval); // Nettoyer l'intervalle de vérification d'inactivité
    }, [lastActivity]);

    const scheduleNotification = async () => {

        await Notifications.scheduleNotificationAsync({
            content: {
                title: "Hey, tu es inactif !",
                body: "Tu n'a pas récuperer le caca de ton ours !",
            },
            trigger: {
                type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL, // Le type de trigger : déclenchement basé sur un intervalle de temps
                seconds: 60, // Temps d'attente avant d'envoyer la notification (ici, 60 secondes)
            }
        });
    };

    // Fonction pour gérer l'ouverture et la fermeture de l'application
    useEffect(() => {
        const handleAppStateChange = (nextAppState: string) => {
            if (nextAppState === 'active') {
                setLastActivity(Date.now()); // Mise à jour de la dernière activité quand l'app devient active
            }
        };

        const appStateListener = AppState.addEventListener('change', handleAppStateChange);

        return () => {
            appStateListener.remove(); // Nettoyer l'écouteur lors du démontage
        };
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentFrame((prevFrame) => (prevFrame + 1) % frames.length); // On passe à la frame suivante
        }, 100); // Intervalle de 100ms entre chaque image

        return () => clearInterval(interval); // Cleanup de l'intervalle lors du démontage du composant
    }, [isHurt]); // Recréer l'intervalle lorsque l'état de l'animation change

    const handleClick = () => {
        setCaca(caca + cacaPerClick); // À chaque clic, on ajoute du caca en fonction de cacaPerClick
        setIsHurt(true); // Mettre l'état "hurt" quand on clique
        setTimeout(() => setIsHurt(false), 500); // Revenir à l'animation "idle" après 500ms
    };

    return (
        <ImageBackground
            source={require("../../assets/images/fond.png")}
            style={styles.container}
            imageStyle={{ resizeMode: 'cover', height: '100%', width: '100%' }}
        >
            <SettingsIcon />
            <Text style={styles.title}>💩 Caca: {caca}</Text>

            {/* Affichage de l'ours avec animation */}
            <TouchableOpacity onPress={handleClick}>
                <Image source={frames[currentFrame]} style={styles.image}  />
            </TouchableOpacity>

            <Text style={styles.text}>Cliquez sur l'ours pour gagner des cacas !</Text>
        </ImageBackground>
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
        marginBottom: 10,
        color: 'white',
    },
    image: {
        width: 250,
        height: 250,
        marginLeft: 45,
        marginTop:100,
    },
    text: {
        fontSize: 16,
        marginTop: 30,
        color: 'white',
    },
});
