import React, { useCallback } from 'react';
import { View, ImageBackground, Text } from 'react-native';

import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import teachBgImage from '../../assets/images/give-classes-background.png';

import styles from './styles';

const Teach: React.FC = () => {
  const navigation = useNavigation();

  const handleNavigateBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={teachBgImage}
        style={styles.content}
        resizeMode="contain"
      >
        <Text style={styles.title}>Do you want to be a Proffy teacher?</Text>
        <Text style={styles.description}>
          To start, you must register your self as a teacher in our web
          platform.
        </Text>
      </ImageBackground>
      <RectButton style={styles.okButton} onPress={handleNavigateBack}>
        <Text style={styles.okButtonText}>I understand</Text>
      </RectButton>
    </View>
  );
};

export default Teach;
