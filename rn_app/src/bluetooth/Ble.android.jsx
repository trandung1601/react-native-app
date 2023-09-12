import {PermissionsAndroid, Platform} from 'react-native';

const handleBleAndroidPermission = () => {
  return new Promise((resolve, reject) => {
    console.debug('[Check Ble permission]');
    console.debug('[Platform Version]: ', Platform.Version);
    if (Platform.OS === 'android' && Platform.Version >= 31) {
      PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
      ]).then(result => {
        if (
          (result['android.permission.BLUETOOTH_CONNECT'] &&
            result['android.permission.BLUETOOTH_SCAN']) === 'granted'
        ) {
          console.log(result);
          console.debug(
            '[handleBleAndroidPermission] User accepts runtime permissions android 12+',
          );
          resolve();
        } else {
          console.error(
            '[handleBleAndroidPermission] User refuses runtime permissions android 12+',
          );
          reject(new Error('User refuses runtime permissions android 12+'));
        }
      });
    } else if (Platform.OS === 'android' && Platform.Version >= 23) {
      PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ).then(cResult => {
        if (cResult) {
          console.log(cResult);
          console.debug(
            '[handleBleAndroidPermission] runtime permission Android <12 already OK',
          );
          resolve();
        } else {
          PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          ).then(requestResult => {
            if (requestResult === 'granted') {
              console.debug(
                '[handleBleAndroidPermission] User accepts runtime permission android <12',
              );
              resolve();
            } else {
              console.error(
                '[handleBleAndroidPermission] User refuses runtime permission android <12',
              );
              reject(
                new Error('User refuses runtime permissions android < 12'),
              );
            }
          });
        }
      });
    }
  });
};

export {handleBleAndroidPermission};
