import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Landing from '../pages/Landing';
import Teach from '../pages/Teach';
import StudyTabs from './StudyTabs';

const { Navigator, Screen } = createStackNavigator();

const AppStack: React.FC = () => {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false }}>
        <Screen name="Landing" component={Landing} />
        <Screen name="Teach" component={Teach} />

        <Screen name="StudyTabs" component={StudyTabs} />
      </Navigator>
    </NavigationContainer>
  );
};

export default AppStack;
