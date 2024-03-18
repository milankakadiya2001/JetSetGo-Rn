import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import strings from '../i18n/strings';

// Check App Platform
const checkPlatform = () => {
  if (Platform.OS === 'android') {
    return 'android';
  } else {
    return 'ios';
  }
};

// Set Async Storage Data
const setAsyncStorageData = async (key, value) => {
  const stringData = JSON.stringify(value);
  await AsyncStorage.setItem(key, stringData);
};

// Get Async Storage Data
const getAsyncStorageData = async key => {
  const data = await AsyncStorage.getItem(key);
  return JSON.parse(data);
};

const showPopupWithOk = (title, message, okClicked) => {
  Alert.alert(title ? title : strings.jetSetGo, message ? message : '', [
    {text: strings.ok.toUpperCase(), onPress: () => okClicked && okClicked()},
  ]);
};

export {
  checkPlatform,
  setAsyncStorageData,
  getAsyncStorageData,
  showPopupWithOk,
};
