import React from 'react';
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
