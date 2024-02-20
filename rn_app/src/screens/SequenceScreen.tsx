import React, {useState} from 'react';
import {Button, StyleSheet, View} from 'react-native';

const ChainableCommand = {
  commandSequence: Array<string>(),
  addCommand: (command: any) => {
    ChainableCommand.commandSequence.push(command);
  },
  createpromise: (command: any) => {
    return new Promise<void>(resolve => {
      setTimeout(() => {
        console.log(`send ${command}`);
        resolve();
      }, 2000);
    });
  },
  start: () => {
    let call = ChainableCommand.commandSequence.reduce(
      async (previousPromise, sequence) => {
        await previousPromise;
        return await ChainableCommand.createpromise(sequence);
      },
      Promise.resolve(),
    );
    return call;
  },
};

const SequenceScreen = () => {
  const handle = () => {
    ChainableCommand.addCommand('ATMA');
    ChainableCommand.addCommand('ATFF');
    ChainableCommand.addCommand('ATFM');

    console.log(ChainableCommand.commandSequence);
    ChainableCommand.start();
  };
  const [map, setMap] = useState(new Map<number, Object>());

  const handle2 = async () => {
    setMap(map => new Map(map.set(1, {name: 'dung'})));
  };
  const handle3 = async () => {
    console.debug('[map]: ', map);
  };

  const addOrUpdateMap = (id: number, object: Object) => {
    setMap(map => new Map(map.set(id, object)));
  };

  function sleep(ms: number) {
    return new Promise<void>(resolve => setTimeout(resolve, ms));
  }

  return (
    <View style={styles.container}>
      <View style={styles.btn}>
        <Button onPress={() => handle()} title="Button" />
        <Button onPress={() => handle2()} title="Button2" />
        <Button
          onPress={() =>
            addOrUpdateMap(1, {name: 'Tuan', id: 1, class: 'titan'})
          }
          title="addOrUpdateMap"
        />
        <Button onPress={() => handle3()} title="Show Map" />
      </View>
    </View>
  );
};

export default SequenceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  btn: {
    borderWidth: 1,
    borderColor: 'green',
    margin: 16,
  },
});
