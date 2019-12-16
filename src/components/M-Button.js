import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const MButton = props => {
    return (
        <TouchableOpacity style={styles.button} onPress={props.customClick}>
            <Text style={styles.text}>{props.title}</Text>
        </TouchableOpacity>
    );
};
const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        backgroundColor: '#3a59b7',
        color: '#ffffff',
        padding: 10,
        marginTop: 16,
        marginLeft: 35,
        marginRight: 35,
    },
    text: {
        color: '#ffffff',
    },
});
export default MButton;