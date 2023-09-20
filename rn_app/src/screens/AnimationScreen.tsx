import React, {useEffect, useState} from 'react';
import {Button, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import Animated, {
  Easing,
  interpolate,
  interpolateColor,
  runOnJS,
  runOnUI,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

const AnimationScreen = () => {
  const value = 40;
  const x = useSharedValue(0);
  const y = useSharedValue(0);
  const _x = useSharedValue(0);
  const _y = useSharedValue(0);

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
  const [firstValua, setFirstValue] = useState(0);
  const [secondValua, setSecondValue] = useState(0);
  const fbg = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        firstValua,
        [0, 1],
        ['#ed0007', '#007bc0'],
      ),
      position: firstValua === 0 ? 'absolute' : undefined,
      zIndex: firstValua === 0 ? 1 : 0,
    };
  });

  const sbg = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        secondValua,
        [0, 1],
        ['#d43694', '#38862a'],
      ),
      position: firstValua === 1 ? 'absolute' : undefined,
      zIndex: firstValua === 1 ? 1 : 0,
    };
  });

  const duration = {duration: 2000, easing: Easing.inOut(Easing.linear)};

  useEffect(() => {
    function callee() {
      'worklet';
      y.value = withTiming(-value, duration, isFinished => {
        if (isFinished) {
          y.value = withTiming(0, duration, isFinished => {
            if (isFinished) {
              x.value = withTiming(-value, duration, isFinished => {
                if (isFinished) {
                  x.value = withTiming(0, duration, isFinished => {
                    if (isFinished) {
                      runOnJS(setFirstValue)(1);
                      y.value = withTiming(-value, duration, isFinished => {
                        if (isFinished) {
                          y.value = withTiming(0, duration, isFinished => {
                            if (isFinished) {
                              x.value = withTiming(
                                -value,
                                duration,
                                isFinished => {
                                  if (isFinished) {
                                    x.value = withTiming(
                                      0,
                                      duration,
                                      isFinished => {
                                        if (isFinished) {
                                          runOnJS(setFirstValue)(0);
                                          callee();
                                        }
                                      },
                                    );
                                  }
                                },
                              );
                            }
                          });
                        }
                      });
                    }
                  });
                }
              });
            }
          });
        }
      });
    }
    callee();

    function call() {
      'worklet';
      _y.value = withTiming(value, duration, isFinished => {
        if (isFinished) {
          _y.value = withTiming(0, duration, isFinished => {
            if (isFinished) {
              _x.value = withTiming(value, duration, isFinished => {
                if (isFinished) {
                  _x.value = withTiming(0, duration, isFinished => {
                    if (isFinished) {
                      runOnJS(setSecondValue)(1);
                      _y.value = withTiming(value, duration, isFinished => {
                        if (isFinished) {
                          _y.value = withTiming(0, duration, isFinished => {
                            if (isFinished) {
                              _x.value = withTiming(
                                value,
                                duration,
                                isFinished => {
                                  if (isFinished) {
                                    _x.value = withTiming(
                                      0,
                                      duration,
                                      isFinished => {
                                        if (isFinished) {
                                          runOnJS(setSecondValue)(0);
                                          call();
                                        }
                                      },
                                    );
                                  }
                                },
                              );
                            }
                          });
                        }
                      });
                    }
                  });
                }
              });
            }
          });
        }
      });
    }
    call();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.box}>
        <Animated.View style={[styles.top, animatedStylesX, fbg]} />
        <Animated.View style={[styles.bottom, animatedStylesY, sbg]} />
      </View>
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
    backgroundColor: 'green',
    width: 20,
    height: 20,
    zIndex: 1,
  },
  bottom: {
    backgroundColor: 'red',
    width: 20,
    height: 20,
  },
});
