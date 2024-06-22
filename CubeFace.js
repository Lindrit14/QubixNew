import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';

const CubeFace = ({ faceConfig, onColorChange }) => {
  return (
    <View style={styles.grid}>
      {faceConfig.map((color, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.cubePiece, { backgroundColor: color }]}
          onPress={() => onColorChange(index)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 100,  // Adjust the size based on your screen layout
    margin: 5,
  },
  cubePiece: {
    width: 30,
    height: 30,
    margin: 1,
  }
});

export default CubeFace;
