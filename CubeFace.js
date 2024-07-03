// CubeFace.js
import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';

const CubeFace = ({ faceConfig, onColorChange }) => {
  return (
    <View style={styles.faceContainer}>
      {faceConfig.map((color, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.square, { backgroundColor: color }]}
          onPress={() => onColorChange(index)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  faceContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 90,
    height: 90,
  },
  square: {
    width: 30,
    height: 30,
    borderWidth: 1,
    borderColor: 'black',
  },
});

export default CubeFace;
