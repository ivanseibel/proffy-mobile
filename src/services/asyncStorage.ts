import AsyncStorage from '@react-native-community/async-storage';
import { ITeacher } from '../@types/teacher';

export const storeTeacher = async (value: ITeacher): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(`@TeacherClass:${value.id}`, jsonValue);
  } catch (e) {
    // saving error
  }
};

export const getTeacher = async (
  key: string,
): Promise<ITeacher | undefined> => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : undefined;
  } catch (e) {
    return undefined;
  }
};

export const removeTeacher = async (key: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    // error
  }
};
