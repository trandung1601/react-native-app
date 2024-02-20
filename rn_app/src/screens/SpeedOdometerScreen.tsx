import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {
  Arc,
  Background,
  DangerPath,
  Indicator,
  Marks,
  Needle,
  Progress,
} from 'react-native-cool-speedometer';
import Speedometer from 'react-native-cool-speedometer/dist/Speedometer';
import {G, Line, Svg, Text} from 'react-native-svg';
import {SpeedOdometer} from '.';

import Speed from '../components/Speedometer';

const SpeedOdometerScreen = () => {
  const center = 250 / 2;

  return (
    <SafeAreaView
      style={{
        justifyContent: 'center',
        alignSelf: 'center',
        flex: 1,
        backgroundColor: 'black',
      }}>
      <Speedometer
        min={0}
        max={260}
        value={30}
        width={350}
        height={350}
        angle={250}
        lineCap="butt">
        <Background color="white" />

        {/* <Needle
          baseOffset={40}
          circleRadius={30}
          color="red"
          circleColor="white"
        /> */}
        {/* <DangerPath color="red" offset={6} angle={40} arcWidth={4} /> */}
        {/* <Progress color="#007BC0" arcWidth={10} /> */}

        {/* <Marks step={2}>
          {(mark, i) => (
            <G key={i}>
              <Line
                // {...console.log(mark.coordinates)}
                {...mark.coordinates}
                stroke={'white'}
                strokeOpacity={1}
                strokeWidth={1}
                // x1={mark.coordinates.x1}
                // y1={mark.coordinates.y1}
                // x2={i % 2 == 0 ? mark.coordinates.x2 : mark.coordinates.x2}
                // y2={mark.coordinates.y2}
                // x1={12.06147584281834}
                // y1={268.40402866513375}
                // x2={23.33778729224923 - 5}
                // y2={264.2997869452257 + 1.5}
                // x1={mark.coordinates.x1}
                // y1={mark.coordinates.y1}
                // x2={i % 2 !== 0 ? mark.coordinates.x2 : mark.coordinates.x2 - 5}
                // y2={
                //   i % 2 !== 0 ? mark.coordinates.y2 : mark.coordinates.y2 + 1.5
                // }

                // x1={200}
                // y1={0}
                // x2={200}
                // y2={12 - 5}
              />
            </G>
          )}
        </Marks> */}
        {/* <Marks step={2}>
          {(mark, i) => (
            <G key={i}>
              <Line
                // {...console.log(mark.coordinates)}
                // {...mark.coordinates}
                stroke={'white'}
                strokeOpacity={1}
                strokeWidth={1}
                // x1={mark.coordinates.x1}
                // y1={mark.coordinates.y1}
                // x2={i % 2 == 0 ? mark.coordinates.x2 : mark.coordinates.x2}
                // y2={mark.coordinates.y2}
                // x1={13.7746885484556}
                // y1={272.9392444077623}
                // x2={20.29257444925966}
                // y2={270.3863708534907}

                x1={204.84766202214962}
                y1={0.05875819901734758}
                x2={204.6779938513744}
                y2={7.056701662051751}
              />
            </G>
          )}
        </Marks> */}

        <Marks step={10}>
          {(mark, i) => (
            <G key={i} lineSize={20}>
              <Line
                {...mark.coordinates}
                stroke={'white'}
                strokeOpacity={1}
                strokeWidth={2}
                strokeLinecap="butt"
              />
            </G>
          )}
        </Marks>

        {/* <Indicator fixValue={false} /> */}
      </Speedometer>

      <Speed max={200} value={30} min={0}></Speed>
    </SafeAreaView>
  );
};

export default SpeedOdometerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
