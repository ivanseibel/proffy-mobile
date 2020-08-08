import React, { useCallback } from 'react';
import { View, Image, Text } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import styles from './styles';
import landingImg from '../../assets/images/landing.png';
import studyIcon from '../../assets/images/icons/study.png';
import teachIcon from '../../assets/images/icons/give-classes.png';
import heartIcon from '../../assets/images/icons/heart.png';
import { clearAll } from '../../services/asyncStorage';

const Landing: React.FC = () => {
  // clearAll();

  const navigation = useNavigation();

  const handleNavigateToTeachPage = useCallback(() => {
    navigation.navigate('Teach');
  }, [navigation]);

  const handleNavigateToStudyTabs = useCallback(() => {
    navigation.navigate('StudyTabs');
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={landingImg} style={styles.banner} />

      <Text style={styles.title}>
        Welcome,
        {'\n'}
        <Text style={styles.titleBold}>What do you want to do?</Text>
      </Text>

      <View style={styles.buttonsContainer}>
        <RectButton
          style={[styles.button, styles.buttonPrimary]}
          onPress={handleNavigateToStudyTabs}
        >
          <Image source={studyIcon} />

          <Text style={styles.buttonText}>Study</Text>
        </RectButton>

        <RectButton
          style={[styles.button, styles.buttonSecondary]}
          onPress={handleNavigateToTeachPage}
        >
          <Image source={teachIcon} />

          <Text style={styles.buttonText}>Teach</Text>
        </RectButton>
      </View>

      <Text style={styles.totalConnections}>
        {`200 connections already made `}
        <Image source={heartIcon} />
      </Text>
    </View>
  );
};

export default Landing;
