import React, { useState, useEffect, useCallback } from 'react';
import { View, ScrollView } from 'react-native';

import { useIsFocused } from '@react-navigation/native';
import styles from './styles';
import PageHeader from '../../components/PageHeader';
import TeacherItem from '../../components/TeacherItem';
import { ITeacher } from '../../@types/teacher';
import { getAllTeachers } from '../../services/asyncStorage';

const Favorites: React.FC = () => {
  const [classes, setClasses] = useState<ITeacher[]>([]);
  const [updateFavorite, setUpdateFavorite] = useState(false);

  const isFocused = useIsFocused();

  useEffect(() => {
    getAllTeachers().then(teacherClasses => {
      if (teacherClasses) {
        setClasses(teacherClasses);
        return;
      }
      setClasses([]);
    });
  }, [isFocused, updateFavorite]);

  const toggleUpdateFavorite = useCallback(() => {
    setUpdateFavorite(state => !state);
  }, []);

  return (
    <View style={styles.container}>
      <PageHeader title="My favorite Proffys" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
      >
        {classes.map((item, index) => (
          <TeacherItem
            teacher={item}
            key={index}
            onUpdateFavorite={toggleUpdateFavorite}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default Favorites;
