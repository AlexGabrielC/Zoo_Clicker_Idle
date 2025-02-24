// components/SettingsIcon.tsx
import React, { useState } from 'react';
import { TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AuthSettingsModal from './AuthSettingsModal';

const SettingsIcon: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <TouchableOpacity style={styles.iconContainer} onPress={() => setModalVisible(true)}>
        <Ionicons name="settings-outline" size={28} color="#fff" />
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <AuthSettingsModal onClose={() => setModalVisible(false)} />
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
      position: "absolute",
      top: 40,  // Placer l'icône en haut de l'écran
      right: 20, // Placer l'icône à droite de l'écran
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fond sombre derrière l'icône pour la faire ressortir
      padding: 10,
      borderRadius: 50, // Rendre l'icône ronde
      elevation: 5, // Ajouter une ombre pour la faire ressortir
  },
});

export default SettingsIcon;
