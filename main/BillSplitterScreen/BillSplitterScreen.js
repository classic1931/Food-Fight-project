import { KeyboardAvoidingView, StyleSheet, Text, Image, 
    TextInput, View, TouchableOpacity} from 'react-native';
import React, { useState, useEffect } from 'react';
import styles from './styles';

const BillSplitterScreen = () => {
    const [totalBill, setTotalBill] = useState('')
    const [totalTip, setTotalTip] = useState('')
    const [people, setPeople] = useState('')
    const [splitValue, setSplitValue] = useState('')
    var split = 0;
    
    const calculate = () => {
        split = (parseInt(totalBill) + parseInt(totalTip))/parseInt(people);
        setSplitValue(split.toFixed(2));
        console.log(splitValue);
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior="padding"
        >
            <View style={styles.inputContainer}>
                <Text style={styles.title}>Total Bill</Text>
                <TextInput
                    placeholder="Total Bill"
                    value={totalBill}
                    onChangeText={text => setTotalBill(text)}
                    style={styles.input}
                />
                <View style={styles.space} />
                <Text style={styles.title}>Total Tip</Text>
                <TextInput
                    placeholder="Total Tip"
                    value={totalTip}
                    onChangeText={text => setTotalTip(text)}
                    style={styles.input}
                />
                <View style={styles.space} />
                <Text style={styles.title}># of people</Text>
                <TextInput
                    placeholder="# of people"
                    value={people}
                    onChangeText={text => setPeople(text)}
                    style={styles.input}
                />
            </View>

            <View style ={styles.buttonContainer}>
                <View style={styles.space} />
                <TouchableOpacity
                onPress={calculate}
                style={styles.button}
                >
                    <Text style={styles.buttonText}>Calculate</Text>
                </TouchableOpacity> 
            </View>
            <View style ={styles.display}>
                <Text style = {styles.displayText}>$ {splitValue}</Text>
            </View>
        </KeyboardAvoidingView>
    )
}

export default BillSplitterScreen;
