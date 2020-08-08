import React, { useCallback, useEffect, useState } from 'react';
import { View, Image, Text, Alert } from 'react-native';

import { useNavigation, useIsFocused } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import styles from './styles';
import landingImg from '../../assets/images/landing.png';
import studyIcon from '../../assets/images/icons/study.png';
import teachIcon from '../../assets/images/icons/give-classes.png';
import heartIcon from '../../assets/images/icons/heart.png';
import api from '../../services/api';
// import { clearAll } from '../../services/asyncStorage';

const Landing: React.FC = () => {
  const [connections, setConnections] = useState(0);

  const isFocused = useIsFocused();

  // clearAll();

  const navigation = useNavigation();

  const handleNavigateToTeachPage = useCallback(() => {
    navigation.navigate('Teach');
  }, [navigation]);

  const handleNavigateToStudyTabs = useCallback(() => {
    navigation.navigate('StudyTabs');
  }, [navigation]);

  useEffect(() => {
    api
      .get('connections')
      .then(response => {
        if (response.data) {
          setConnections(response.data.total);
        }
      })
      .catch(error => {
        Alert.alert(
          'Error',
          `There is an error getting number of connections: ${error.message}`,
        );
      });
  }, [isFocused]);

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
        {`${connections} connections already made `}
        <Image source={heartIcon} />
      </Text>
    </View>
  );
};

export default Landing;
