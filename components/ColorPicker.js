import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';

const colors = ['white', 'red', 'blue', 'orange', 'green', 'yellow'];

const ColorPicker = ({ selectedColor, setSelectedColor }) => {
    return (
        <View>
            <Text style={styles.title}>Select Color</Text>
            <View style={styles.colorContainer}>
                {colors.map(color => (
                    <TouchableOpacity
                        key={color}
                        style={[styles.colorButton, { backgroundColor: color, borderWidth: selectedColor === color ? 2 : 0 }]}
                        onPress={() => setSelectedColor(color)}
                    />
                ))}
            </View>
            <Text style={styles.selectedColor}>Selected Color: {selectedColor}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        color: 'white',
        fontSize: 24,
        marginBottom: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    colorContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20
    },
    colorButton: {
        width: 40,
        height: 40,
        margin: 5,
        borderRadius: 20,
        borderColor: 'white',
    },
    selectedColor: {
        color: 'white',
        fontSize: 18,
        marginBottom: 20,
        textAlign: 'center'
    },
});

export default ColorPicker;
