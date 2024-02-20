import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Svg, Circle, Path, G, Text as SvgText, Line} from 'react-native-svg';

const Speedometer = ({value, min, max}) => {
  const angle = ((value - min) / (max - min)) * 180; // Calculate the angle based on value, min, and max

  return (
    <View style={styles.container}>
      <Svg width={300} height={300}>
        {/* Outer circle */}
        <Circle
          cx={150}
          cy={150}
          r={130}
          stroke="black"
          strokeWidth={3}
          fill="transparent"
        />

        {/* Indicator path */}
        <Path
          d={`M150,150 L150,20 A130,130 0 0,1 ${150 + Math.sin(angle) * 130},${
            150 - Math.cos(angle) * 130
          } Z`}
          fill="red"
        />

        {/* Speedometer labels */}
        <SvgText
          x={150}
          y={100}
          textAnchor="middle"
          fontSize={20}
          fontWeight="bold">
          {min}
        </SvgText>
        <SvgText
          x={50}
          y={150}
          textAnchor="end"
          fontSize={20}
          fontWeight="bold">
          {max}
        </SvgText>
        <SvgText
          x={250}
          y={150}
          textAnchor="start"
          fontSize={20}
          fontWeight="bold">
          {max}
        </SvgText>
        <SvgText
          x={150}
          y={270}
          textAnchor="middle"
          fontSize={20}
          fontWeight="bold">
          {min}
        </SvgText>

        {/* Value text */}
        <SvgText
          x={150}
          y={180}
          textAnchor="middle"
          fontSize={36}
          fontWeight="bold">
          {value}
        </SvgText>

        {/* Speed needle */}
        <G transform={`rotate(${angle}, 150, 150)`}>
          <Line
            x1={150}
            y1={150}
            x2={150}
            y2={50}
            stroke="black"
            strokeWidth={2}
          />
        </G>

        {/* KM symbol */}
        <SvgText
          x={150}
          y={200}
          textAnchor="middle"
          fontSize={18}
          fontWeight="bold">
          km/h
        </SvgText>
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Speedometer;
