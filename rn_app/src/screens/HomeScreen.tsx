import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback} from 'react';
import {RootStackParamList} from '../../App';
import {StackScreenProps} from '@react-navigation/stack';
import {Colors} from 'react-native/Libraries/NewAppScreen';

interface Component {
  name?: string;
  screen?: string;
}

const data = [
  {
    name: 'Bluetooth',
    screen: 'BluetoothScreen',
  },
  {
    name: 'Animation',
    screen: 'AnimationScreen',
  },
  {
    name: 'Spotify',
    screen: 'Spotify',
  },
  {
    name: 'Sequence',
    screen: 'SequenceScreen',
  },
  {
    name: 'Speed Odometer',
    screen: 'SpeedOdometer',
  },
];

type HomeScreenProps = StackScreenProps<RootStackParamList, 'HomeScreen'>;

const HomeScreen = ({navigation}: HomeScreenProps) => {
  const navigationHandler = useCallback((screen: any) => {
    navigation.navigate(screen);
  }, []);

  const renderItem = ({item}: {item: Component}) => {
    return (
      <TouchableOpacity onPress={() => navigationHandler(item.screen)}>
        <View style={styles.component}>
          <Text style={styles.name}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.name}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  component: {
    borderWidth: 1,
    borderColor: '#007BC0',
    padding: 16,
    margin: 12,
  },
  name: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
  },
});
