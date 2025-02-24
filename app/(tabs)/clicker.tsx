import React, { useState, useEffect, useContext } from "react";
import { Text, Image, StyleSheet, TouchableOpacity, ImageBackground } from "react-native";
import { GameContext } from "@/context/GameContext"; // Importez le contexte
import * as Notifications from 'expo-notifications';
import { AppState } from 'react-native';
import SettingsIcon from "@/components/SettingsIcon";
import LeaderboardIcon from "@/components/LeaderboardIcon";
import { useScore } from "@/context/ScoreContext"; // Importez le contexte des scores

export default function Clicker() {
    const { caca, setCaca, cacaPerClick } = useContext(GameContext); // Utilisez le contexte
    const { scores } = useScore(); // Utilisez le contexte des scores
    const [currentFrame, setCurrentFrame] = useState(0); // Frame actuelle de l'animation
    const [isHurt, setIsHurt] = useState(false); // État pour déterminer si l'ours est blessé
    const [lastActivity, setLastActivity] = useState(Date.now()); // Dernière activité utilisateur

    // Animation "idle_svg"
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
        require("../../assets/animations/hurt_svg/FA_TEDDY_Hurt_000.svg"),
        require("../../assets/animations/hurt_svg/FA_TEDDY_Hurt_001.svg"),
        require("../../assets/animations/hurt_svg/FA_TEDDY_Hurt_002.svg"),
        require("../../assets/animations/hurt_svg/FA_TEDDY_Hurt_003.svg"),
        require("../../assets/animations/hurt_svg/FA_TEDDY_Hurt_004.svg"),
        require("../../assets/animations/hurt_svg/FA_TEDDY_Hurt_005.svg"),
    ];

    // Choisir le bon tableau d'images en fonction des états (idle ou hurt).
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
                body: "Tu n'a pas récupérer le caca de ton ours !",
            },
            trigger: {
                type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL, // Le type de trigger : déclenchement basé sur un intervalle de temps
                seconds: 3600, // Temps d'attente avant d'envoyer la notification (ici, 60 secondes)
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
        }, 1000 / 12); // Intervalle de 50 ms entre chaque image

        return () => clearInterval(interval); // Cleanup de l'intervalle lors du démontage du composant
    }, [isHurt]); // Recréer l'intervalle lorsque l'état de l'animation change

    const handleClick = () => {
        setCaca(caca + cacaPerClick); // À chaque clic, on ajoute du caca en fonction de cacaPerClick
        setIsHurt(true); // Mettre l'état "hurt_svg" quand on clique
        setTimeout(() => setIsHurt(false), 1000 / 6); // Revenir à l'animation "idle_svg" après 300ms
    };

    return (
        <ImageBackground
            source={require("../../assets/images/fond.png")}
            style={styles.container}
            resizeMode="cover" // Utilisez props au lieu de style
            imageStyle={{ width: '100%', height: '100%' }} // Assurez-vous que l'image couvre tout le conteneur
        >
            <SettingsIcon />
            <LeaderboardIcon />
            <Text style={styles.title}>💩 Caca: {caca}</Text>

            {/* Affichage de l'ours avec animation */}
            <TouchableOpacity onPress={handleClick}>
                <Image source={frames[currentFrame]} style={styles.image} />
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
        fontSize: 36, // Augmenter la taille de police pour un titre plus grand
        fontWeight: "bold",
        textAlign: "center",
        color: '#ffffff', // Texte en blanc
        textShadowColor: '#000', // Ombre du texte
        textShadowOffset: { width: 2, height: 2 }, // Définir l'offset de l'ombre
        textShadowRadius: 5, // Rayon de l'ombre
        backgroundColor: 'rgba(0, 0, 0, 0.4)', // Fond légèrement sombre derrière le texte
        padding: 10,
        borderRadius: 10,
        marginBottom: 100,  // Ajuster la marge pour positionner le titre plus haut
        marginHorizontal: 20,
    },
    image: {
        width: 250,
        height: 250,
        marginLeft: 45,
        marginTop: 100,
    },
    text: {
        fontSize: 20, // Augmenter la taille du texte
        fontWeight: "600", // Légère mise en gras pour un effet plus marquant
        color: '#c3cca8', // Couleur dorée pour attirer l'attention
        textAlign: "center", // Centrer le texte
        textShadowColor: '#000', // Ombre du texte pour plus de contraste
        textShadowOffset: { width: 2, height: 2 }, // Positionner l'ombre
        textShadowRadius: 5, // Douceur de l'ombre
        position: 'absolute', // Position absolue pour le positionnement
        bottom: 450, // Positionner le texte en bas
        backgroundColor: 'rgba(0, 0, 0, 0.3)', // Fond sombre derrière le texte pour améliorer la lisibilité
        padding: 10,
        borderRadius: 10,
        marginHorizontal: 30, // Plus d'espace autour du texte
    },
    button: {
        backgroundColor: '#4285F4',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginBottom: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});
