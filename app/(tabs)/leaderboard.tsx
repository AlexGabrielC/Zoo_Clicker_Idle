import { Image, StyleSheet, Platform } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function LeaderBoardScreen() {
  return (
    <ParallaxScrollView
      headerImage={<Image source={require('@/assets/images/header-image.png')} style={{ width: '100%', height: 200 }} />}
      headerBackgroundColor={{ dark: '#000', light: '#fff' }}
    >
        <ThemedView style={styles.titleContainer}>
            <ThemedText type="title">Leaderboard</ThemedText>
        </ThemedView>
        <ThemedText>Coming soon...</ThemedText>
        <HelloWave />
        <Image source={require('@/assets/images/react-logo.png')} style={{ alignSelf: 'center' }} />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    marginBottom: 16,
  },
});