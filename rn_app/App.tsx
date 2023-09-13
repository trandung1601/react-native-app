import React, {useEffect, useState} from 'react';
import {
  FlatList,
  NativeEventEmitter,
  NativeModules,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import BleManager, {
  BleDisconnectPeripheralEvent,
  BleManagerDidUpdateValueForCharacteristicEvent,
  BleScanCallbackType,
  BleScanMatchMode,
  BleScanMode,
  Peripheral,
} from 'react-native-ble-manager';
import {BlePermission} from './src/bluetooth/Permission.index';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);
declare module 'react-native-ble-manager' {
  // enrich local contract with custom state properties needed by App.tsx
  interface Peripheral {
    connected?: boolean;
    connecting?: boolean;
  }
}
const SECONDS_TO_SCAN_FOR = 7;
const SERVICE_UUIDS: string[] = [];
const ALLOW_DUPLICATES = true;

const App = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [peripherals, setPeripherals] = useState(
    new Map<Peripheral['id'], Peripheral>(),
  );

  useEffect(() => {
    /**
        //* Initialize the BLE 
     */
    BleManager.start({showAlert: false, forceLegacy: true});
  }, []);

  useEffect(() => {
    /**Initialize the BLE */
    BleManager.start({showAlert: false, forceLegacy: true});

    /**
     */ /* Listener to handle the opeation when device is connected , disconnected Handle stop scan
, when any value will update from BLE device
*/
    const listeners = [
      bleManagerEmitter.addListener(
        'BleManagerDiscoverPeripheral',
        handleDiscoverPeripheral,
      ),
      bleManagerEmitter.addListener('BleManagerStopScan', handleStopScan),
      bleManagerEmitter.addListener(
        'BleManagerDisconnectPeripheral',
        handleDisconnectedPeripheral,
      ),
      bleManagerEmitter.addListener(
        'BleManagerDidUpdateValueForCharacteristic',
        handleUpdateValueForCharacteristic,
      ),
    ];

    /**
     * //* Check the Bluetooth Permission For Android and  request if required.
     */

    BlePermission()
      .then(result => {
        enableBluetoothInDevice();
      })
      .catch(err => {
        console.log(222);
      });

    return () => {
      console.debug('component unmounting. Removing listeners...');
      for (const listener of listeners) {
        listener.remove();
      }
    };
  }, []);

  /**
   */ /* Enable the Bluetooth Permission
   */
  const enableBluetoothInDevice = () => {
    BleManager.enableBluetooth()
      .then(() => {
        // Success code
        //** Start the scanning */
      })
      .catch(error => {
        console.error('error---->', error);
      });
  };

  /**
   * //* Start the bluetooth scanning
   */
  const startScan = () => {
    if (!isScanning) {
      // reset found peripherals before scan
      setPeripherals(new Map<Peripheral['id'], Peripheral>());
      try {
        console.debug('[startScan] starting scan...');
        setIsScanning(true);
        BleManager.scan(SERVICE_UUIDS, SECONDS_TO_SCAN_FOR, ALLOW_DUPLICATES, {
          matchMode: BleScanMatchMode.Sticky,
          scanMode: BleScanMode.LowLatency,
          callbackType: BleScanCallbackType.AllMatches,
        })
          .then(() => {
            console.debug('[startScan] scan promise returned successfully.');
          })
          .catch(err => {
            console.error('[startScan] ble scan error thrown', err);
          });
      } catch (error) {
        console.error('[startScan] ble scan error thrown', error);
      }
    }
  };

  /**
   * //* Method to handle when Peripheral is connected.
   */
  const handleDiscoverPeripheral = (peripheral: Peripheral) => {
    console.debug('[handleDiscoverPeripheral] new BLE peripheral=', peripheral);
    if (!peripheral.name) {
      peripheral.name = 'NO NAME';
    }
    addOrUpdatePeripheral(peripheral.id, peripheral);
  };

  const addOrUpdatePeripheral = (id: string, updatedPeripheral: Peripheral) => {
    // new Map() enables changing the reference & refreshing UI.
    // TOFIX not efficient.
    setPeripherals(map => new Map(map.set(id, updatedPeripheral)));
  };

  /**
   * //* Handle the bluetooth Stop scan
   */
  const handleStopScan = () => {
    setIsScanning(false);
    console.debug('[handleStopScan] scan is stopped.');
  };

  /**
   * //* method to Handle when peripheral will disconnected
   */
  const handleDisconnectedPeripheral = (
    event: BleDisconnectPeripheralEvent,
  ) => {
    let peripheral = peripherals.get(event.peripheral);
    if (peripheral) {
      console.debug(
        `[handleDisconnectedPeripheral][${peripheral.id}] previously connected peripheral is disconnected.`,
        event.peripheral,
      );
      addOrUpdatePeripheral(peripheral.id, {...peripheral, connected: false});
    }
    console.debug(
      `[handleDisconnectedPeripheral][${event.peripheral}] disconnected.`,
    );
  };

  /**
   * //* Method to handle Value which we get from Peripheral Device
   */
  const handleUpdateValueForCharacteristic = (
    data: BleManagerDidUpdateValueForCharacteristicEvent,
  ) => {
    console.debug(
      `[handleUpdateValueForCharacteristic] received data from '${data.peripheral}' with characteristic='${data.characteristic}' and value='${data.value}'`,
    );
  };

  const togglePeripheralConnection = async (peripheral: Peripheral) => {
    console.log(peripheral.connected);
    if (peripheral && peripheral.connected) {
      console.log(peripheral);
    }
  };

  const renderItem = ({item}: {item: Peripheral}) => {
    const backgroundColor = item.connected ? '#069400' : Colors.white;
    return (
      <TouchableHighlight
        underlayColor="#0082FC"
        onPress={() => togglePeripheralConnection(item)}>
        <View style={[styles.row, {backgroundColor}]}>
          <Text style={styles.peripheralName}>
            {item.name} - {item?.advertising?.localName}
            {item.connecting && ' - Connecting...'}
          </Text>
          <Text style={styles.rssi}>RSSI: {item.rssi}</Text>
          {/* <Text style={styles.peripheralId}>{item.id}</Text> */}
        </View>
      </TouchableHighlight>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={startScan}
        style={{
          backgroundColor: '#007BC0',
          padding: 16,
          alignItems: 'center',
          marginBottom: 10,
        }}>
        <Text style={{color: 'white', fontSize: 20}}>Scan devices</Text>
      </TouchableOpacity>

      {Array.from(peripherals.values()).length === 0 && (
        <View style={styles.row}>
          <Text style={styles.noPeripherals}>
            No Peripherals, press "Scan Bluetooth" above.
          </Text>
        </View>
      )}

      <FlatList
        data={Array.from(peripherals.values())}
        contentContainerStyle={{rowGap: 12}}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

export default App;

const boxShadow = {
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  row: {
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 20,
    ...boxShadow,
  },
  peripheralName: {
    fontSize: 16,
    textAlign: 'center',
    padding: 10,
    color: Colors.black,
  },
  rssi: {
    fontSize: 12,
    textAlign: 'center',
    padding: 2,
    color: Colors.black,
  },
  peripheralId: {
    fontSize: 12,
    textAlign: 'center',
    padding: 2,
    paddingBottom: 20,
    color: Colors.black,
  },
  noPeripherals: {
    margin: 10,
    textAlign: 'center',
    color: Colors.white,
  },
});
