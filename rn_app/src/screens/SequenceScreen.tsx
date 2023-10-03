import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

const ChainableCommand = {
  commandSequence: Array<string>(),
  addCommand: (command: string) => {
    ChainableCommand.commandSequence.push(command);
  },
  createpromise: (command: string) => {
    return new Promise<void>(resolve => {
      setTimeout(() => {
        console.log(`send ${command}`);
        resolve();
      }, 2000);
    });
  },
  start: () => {
    ChainableCommand.commandSequence.reduce(
      (previousPromise: any, sequence: any) => {
        console.log('sequence: ', sequence);
        return previousPromise.then(() => {
          return ChainableCommand.createpromise(sequence);
        });
      },
      Promise.resolve(),
    );
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

  return (
    <View style={styles.container}>
      <View style={styles.btn}>
        <Button onPress={() => handle()} title="Button" />
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
