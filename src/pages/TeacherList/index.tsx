import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import Picker from 'react-native-picker-select';

import styles from './styles';

import PageHeader from '../../components/PageHeader';
import TeacherItem from '../../components/TeacherItem';

const TeacherList: React.FC = () => {
  const [selectedWeekday, setSelectedWeekday] = useState();
  const weekdays = [
    { label: 'Sunday', value: 0 },
    { label: 'Monday', value: 1 },
    { label: 'Tuesday', value: 2 },
    { label: 'Wednesday', value: 3 },
    { label: 'Thursday', value: 4 },
    { label: 'Friday', value: 5 },
    { label: 'Saturday', value: 6 },
  ];

  return (
    <View style={styles.container}>
      <PageHeader title="Available Proffys">
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
              <Picker items={weekdays} />
              {/* <TextInput
                placeholderTextColor="#c1bccc"
                style={styles.input}
                placeholder="Which weekday?"
              /> */}
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
        </View>
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
