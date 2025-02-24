import React, {useEffect, useState} from 'react';
import {View, Text, Modal, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import {useScore} from '@/context/ScoreContext'; // Importez le contexte des scores

interface ScoreTableModalProps {
    visible: boolean,
    onClose: () => void,
    scores?: { id: string; user_id: string; score: number; created_at: string }[]
}

const ScoreTableModal: React.FC<ScoreTableModalProps> = ({visible, onClose}) => {
    const {scores, fetchScores} = useScore();

    useEffect(() => {
        fetchScores();
    }, [fetchScores]);

    return (
        <Modal animationType="slide" transparent={true} visible={visible}>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Tableau des Scores</Text>
                    <FlatList
                        data={scores}
                        keyExtractor={(item) => item.id}
                        renderItem={({item}) => (
                            <View style={styles.scoreRow}>
                                <Text style={styles.scoreText}>{item.user_id}</Text>
                                <Text style={styles.scoreText}>{item.score}</Text>
                            </View>
                        )}
                    />
                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Text style={styles.closeButtonText}>Fermer</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    scoreRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    scoreText: {
        fontSize: 16,
    },
    closeButton: {
        marginTop: 20,
    },
    closeButtonText: {
        color: '#4285F4',
        fontSize: 16,
    },
});

export default ScoreTableModal;
