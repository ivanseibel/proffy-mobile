import React, { useState, useCallback } from 'react';
import { View, Text, Alert } from 'react-native';
import {
  ScrollView,
  TextInput,
  BorderlessButton,
  RectButton,
} from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

import styles from './styles';

import PageHeader from '../../components/PageHeader';
import TeacherItem from '../../components/TeacherItem';
import Picker from '../../components/Picker';
import api from '../../services/api';

export interface ITeacher {
  user_id: string;
  avatar: string;
  name: string;
  subject: string;
  bio: string;
  cost: number;
  whatsapp: string;
}

const TeacherList: React.FC = () => {
  const [weekday, setSelectedWeekday] = useState('');
  const [subject, setSubject] = useState('');
  const [time, setTime] = useState('');
  const [classes, setClasses] = useState<ITeacher[]>([]);

  const [isFiltersVisible, setIsFiltersVisible] = useState(false);
  const weekdays = [
    { label: 'Sunday', value: 0 },
    { label: 'Monday', value: 1 },
    { label: 'Tuesday', value: 2 },
    { label: 'Wednesday', value: 3 },
    { label: 'Thursday', value: 4 },
    { label: 'Friday', value: 5 },
    { label: 'Saturday', value: 6 },
  ];

  const handleToggleShowFilters = useCallback(() => {
    setIsFiltersVisible(state => !state);
  }, []);

  const headerFilterIcon: React.ReactNode = (
    <BorderlessButton onPress={handleToggleShowFilters}>
      <Feather name="filter" size={20} color="#fff" />
    </BorderlessButton>
  );

  const searchTeachers = useCallback(() => {
    const filterIsIncomplete = subject === '' || weekday === '' || time === '';

    if (filterIsIncomplete) {
      Alert.alert(
        'Error',
        'Your must provide subject, week day and time to search by teachers',
      );
      return;
    }

    const params = {
      week_day: weekday,
      subject,
      time,
    };

    api
      .get<ITeacher[]>('classes', {
        params,
      })
      .then(response => {
        if (response.data.length === 0) {
          Alert.alert('Warning', 'No classes found');
          return;
        }
        setClasses(
          response.data.map(item => {
            return {
              ...item,
              avatar: item.avatar
                ? item.avatar
                : `https://api.adorable.io/avatars/80/${item.name}.png`,
            };
          }),
        );
        setIsFiltersVisible(false);
      })
      .catch(error => {
        Alert.alert(
          'Error',
          `There is an error getting classes list: ${error.message}`,
        );
      });
  }, [subject, time, weekday]);

  return (
    <View style={styles.container}>
      <PageHeader title="Available Proffys" headerRight={headerFilterIcon}>
        {isFiltersVisible && (
          <View style={styles.searchForm}>
            <Text style={styles.label}>Subject</Text>
            <TextInput
              placeholderTextColor="#c1bccc"
              style={styles.input}
              placeholder="Which subject?"
              value={subject}
              onChangeText={setSubject}
            />

            <View style={styles.inputGroup}>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Weekday</Text>
                <Picker
                  title="Choose a weekday"
                  pickerValues={weekdays}
                  placeholder="Which weekday?"
                  inputStyle={styles.picker}
                  onChange={setSelectedWeekday}
                />
              </View>

              <View style={styles.inputBlock}>
                <Text style={styles.label}>Time</Text>
                <TextInput
                  placeholderTextColor="#c1bccc"
                  style={styles.input}
                  placeholder="Which time?"
                  value={time}
                  onChangeText={setTime}
                />
              </View>
            </View>
            <RectButton style={styles.submitButton} onPress={searchTeachers}>
              <Text style={styles.submitButtonText}>Search</Text>
            </RectButton>
          </View>
        )}
      </PageHeader>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
      >
        {classes.map((item, index) => (
          <TeacherItem teacher={item} key={index} />
        ))}
      </ScrollView>
    </View>
  );
};

export default TeacherList;
