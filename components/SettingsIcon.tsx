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
        <Ionicons name="settings-outline" size={28} color="#333" />
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
    position: 'absolute',
    top: 40,
    right: 20,
  },
});

export default SettingsIcon;
