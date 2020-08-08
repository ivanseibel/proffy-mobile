import AsyncStorage from '@react-native-community/async-storage';
import { ITeacher } from '../@types/teacher';

export const storeTeacher = async (teacherClass: ITeacher): Promise<void> => {
  try {
    const classes = await AsyncStorage.getItem('@TeacherClasses');

    let parsedClasses: ITeacher[] = [];

    if (classes) {
      parsedClasses = JSON.parse(classes);
    }

    parsedClasses.push(teacherClass);

    const stringfied = JSON.stringify(parsedClasses);

    await AsyncStorage.setItem(`@TeacherClasses`, stringfied);
  } catch (e) {
    // saving error
  }
};

export const getTeacher = async (
  classId: string,
): Promise<ITeacher | undefined> => {
  try {
    const classes = await AsyncStorage.getItem('@TeacherClasses');

    if (!classes) {
      return undefined;
    }

    const parsedClasses: ITeacher[] = JSON.parse(classes);

    const index = parsedClasses.findIndex(item => item.id === classId);

    if (index < 0) {
      return undefined;
    }

    return parsedClasses[index];
  } catch (e) {
    return undefined;
  }
};

export const removeTeacher = async (classId: string): Promise<void> => {
  try {
    const classes = await AsyncStorage.getItem('@TeacherClasses');

    if (!classes) {
      return;
    }
    const parsedClasses: ITeacher[] = JSON.parse(classes);

    const index = parsedClasses.findIndex(item => item.id === classId);

    if (index < 0) {
      return;
    }

    parsedClasses.splice(index, 1);

    if (parsedClasses.length === 0) {
      await AsyncStorage.removeItem('@TeacherClasses');
      return;
    }

    const stringfied = JSON.stringify(parsedClasses);

    await AsyncStorage.setItem(`@TeacherClasses`, stringfied);
  } catch (e) {
    // error
  }
};

export const getAllTeachers = async (): Promise<ITeacher[] | undefined> => {
  try {
    const classes = await AsyncStorage.getItem('@TeacherClasses');

    if (!classes) {
      return undefined;
    }

    const parsedClasses: ITeacher[] = JSON.parse(classes);

    return parsedClasses;
  } catch (e) {
    return undefined;
  }
};

export const clearAll = async (): Promise<void> => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    // clear error
  }

  // eslint-disable-next-line no-console
  console.log('Done.');
};
