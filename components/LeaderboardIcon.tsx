import React, { useState } from 'react';
import { TouchableOpacity, Modal, StyleSheet } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import {useScore} from "@/context/ScoreContext";
import ScoreTableModal from "@/components/ScoreTableModal"; // Importez la modal de scores


const SettingsIcon: React.FC = () => {
    const [isScoreModalVisible, setScoreModalVisible] = useState(false); // État pour le modal des scores
    const { scores } = useScore(); // Utilisez le contexte des scores

    return (
        <>
            <TouchableOpacity style={styles.iconContainer} onPress={() => setScoreModalVisible(true)}>
                <Entypo name="trophy" size={28} color="#fff" />
            </TouchableOpacity>
            <ScoreTableModal
                visible={isScoreModalVisible}
                onClose={() => setScoreModalVisible(false)}
                scores={scores}
            />
        </>
    );
};

const styles = StyleSheet.create({
    iconContainer: {
        position: "absolute",
        top: 100,  // Placer l'icône en haut de l'écran
        right: 20, // Placer l'icône à droite de l'écran
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fond sombre derrière l'icône pour la faire ressortir
        padding: 10,
        borderRadius: 50, // Rendre l'icône ronde
        elevation: 5, // Ajouter une ombre pour la faire ressortir
    },
});

export default SettingsIcon;
