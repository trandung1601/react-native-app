import {Platform} from 'react-native';
import {handleBleAndroidPermission} from './Ble.android';

export const BlePermission = async () => {
  switch (Platform.OS) {
    case 'android':
      return await handleBleAndroidPermission();
    case 'ios':
      break;
    default:
      break;
  }
};
