import {
  LayoutChangeEvent,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import tailwind from 'twrnc';
import {PlaylistType, playlist} from '../constants/playlist';
import {EllipsisHorizontal} from '../icons/EllipsisHorizontal';
const formatter = Intl.NumberFormat('en-IN');

const Playlist = () => {
  return (
    <View style={tailwind.style('bg-black')}>
      {playlist.map((song: PlaylistType, index: number) => {
        return (
          <View
            style={tailwind.style(
              'flex flex-row items-center justify-between py-2 mr-5',
            )}
            key={JSON.stringify(song.name + index)}>
            <View style={tailwind.style('flex flex-row items-center')}>
              <View
                style={tailwind.style(
                  'absolute w-10 flex-row items-center justify-center',
                )}>
                <Text
                  style={tailwind.style(
                    'text-sm text-center font-bold text-white opacity-50',
                  )}>
                  {index + 1}
                </Text>
              </View>
              <View style={tailwind.style('pl-10')}>
                <Text
                  style={tailwind.style('text-base font-medium text-white')}>
                  {song.name}
                </Text>
                <Text style={tailwind.style('text-sm text-white opacity-60')}>
                  {formatter.format(song.plays)}
                </Text>
              </View>
            </View>
            <EllipsisHorizontal />
          </View>
        );
      })}
    </View>
  );
};

const Spotify = () => {
  const sv = useSharedValue<number>(0);
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      'worklet';
      sv.value = event.contentOffset.y;
    },
  });

  return (
    <Animated.View style={[tailwind.style('flex-1 bg-black')]}>
      <Animated.View style={tailwind.style('flex-1')}>
        <Animated.ScrollView
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          style={tailwind.style('flex-1')}
          showsVerticalScrollIndicator={false}>
          <Animated.View style={[tailwind.style('pb-10')]}>
            {/* Button Section */}
            {/* <Animated.View
              style={[
                tailwind.style(
                  'flex items-center justify-center z-10 pb-4 pt-4',
                ),
              ]}>
              <Pressable
                style={tailwind.style(
                  'bg-green-500 px-10 py-2 items-center rounded-full',
                )}>
                <Text
                  style={tailwind.style(
                    'text-base font-bold text-white uppercase',
                  )}>
                  Shuffle Play
                </Text>
              </Pressable>
            </Animated.View> */}
            {/* Songs List */}
            <Playlist />
          </Animated.View>
        </Animated.ScrollView>
      </Animated.View>
    </Animated.View>
  );
};

export default Spotify;

const styles = StyleSheet.create({});
