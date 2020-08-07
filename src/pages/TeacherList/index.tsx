import React, { useState, useCallback } from 'react';
import { View, Text } from 'react-native';
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

const TeacherList: React.FC = () => {
  const [selectedWeekday, setSelectedWeekday] = useState();
  const [isFiltersvisible, setIsFiltersVisible] = useState(false);
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

  return (
    <View style={styles.container}>
      <PageHeader
        title="Available Proffys"
        headerRight={
          <BorderlessButton onPress={handleToggleShowFilters}>
            <Feather name="filter" size={20} color="#fff" />
          </BorderlessButton>
        }
      >
        {isFiltersvisible && (
          <View style={styles.searchForm}>
            <Text style={styles.label}>Subject</Text>
            <TextInput
              placeholderTextColor="#c1bccc"
              style={styles.input}
              placeholder="Which subject?"
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
                />
              </View>
            </View>
            <RectButton style={styles.submitButton}>
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
        <TeacherItem />
        <TeacherItem />
        <TeacherItem />
        <TeacherItem />
        <TeacherItem />
        <TeacherItem />
      </ScrollView>
    </View>
  );
};

export default TeacherList;
