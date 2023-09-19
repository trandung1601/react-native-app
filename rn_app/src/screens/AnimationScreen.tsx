import {Button, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

const AnimationScreen = () => {
  const offsetY = useSharedValue(0);
  const offsetX = useSharedValue(0);
  const progress = useSharedValue(0);
  const value = 40;
  const x = useSharedValue(0);
  const y = useSharedValue(0);
  const _x = useSharedValue(0);
  const _y = useSharedValue(0);
  const c = useSharedValue('red');

  const animatedStylesX = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: x.value,
      },
      {
        translateX: y.value,
      },
    ],
  }));

  const animatedStylesY = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: _x.value,
      },
      {
        translateX: _y.value,
      },
    ],
  }));
  const [xValua, setXValue] = useState(0);
  const bg = useAnimatedStyle(() => {
    console.log(y.value);
    return {
      backgroundColor: interpolateColor(y.value, [0], ['red', 'green']),
    };
  });
  //   useEffect(() => {
  //     x.value = withRepeat(
  //       withTiming(0, {duration: 1500}, isFinished => {
  //         if (isFinished) {
  //           x.value = withTiming(-40, {duration: 1500});
  //         }
  //       }),
  //       -1,
  //       true,
  //     );
  //   }, []);

  const duration = {duration: 1000};

  const handlePress = () => {
    'worklet';
    y.value = withTiming(-value, duration, isFinished => {
      if (isFinished) {
        y.value = withTiming(0, duration, isFinished => {
          if (isFinished) {
            x.value = withTiming(-value, duration, isFinished => {
              if (isFinished) {
                x.value = withTiming(0, duration, isFinished => {
                  if (isFinished) {
                  }
                });
              }
            });
          }
        });
      }
    });

    console.debug('[background]: ', bg);

    // _y.value = withTiming(0, duration, isFinished => {
    //   if (isFinished) {
    //     _x.value = withTiming(40, duration, isFinished => {
    //       if (isFinished) {
    //         _x.value = withTiming(0, duration, isFinished => {
    //           if (isFinished) {
    //             _y.value = withTiming(40, duration);
    //           }
    //         });
    //       }
    //     });
    //   }
    // });
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.box}>
        {/* <Animated.View style={[styles.bottom, animatedStylesY]} /> */}
        <Animated.View style={[styles.top, animatedStylesX, bg]} />
      </View>

      <Button onPress={handlePress} title="Click me" />
    </SafeAreaView>
  );
};

export default AnimationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  box: {
    borderWidth: 1,
    borderColor: 'black',
    height: 200,
    width: 200,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  top: {
    // backgroundColor: 'green',
    width: 20,
    height: 20,
    position: 'absolute',
  },
  bottom: {
    backgroundColor: 'pink',
    width: 20,
    height: 20,
  },
});
