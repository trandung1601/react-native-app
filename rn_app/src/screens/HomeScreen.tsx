import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {RootStackParamList} from '../../App';
import {StackScreenProps} from '@react-navigation/stack';

interface Component {
  name?: string;
}

const data = [
  {
    name: 'Bluetooth',
  },
];

type HomeScreenProps = StackScreenProps<RootStackParamList, 'HomeScreen'>;

const HomeScreen = ({navigation}: HomeScreenProps) => {
  const renderItem = ({item}: {item: Component}) => {
    return (
      <TouchableOpacity onPress={() => navigation.push('BluetoothScreen')}>
        <View style={styles.component}>
          <Text>{item.name}</Text>
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
  },
  component: {},
});
