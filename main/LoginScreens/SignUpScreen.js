import { KeyboardAvoidingView, StyleSheet, Text, Image, TextInput, Alert, View, TouchableOpacity} from 'react-native';
import React, { useState, useEffect } from 'react';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { db, auth } from "../../firestore";

const SignUpScreen = ({navigation}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setconfirmPassword] = useState('')
    
    const inputSubmit = async() =>{
        console.log('password:', password);
        console.log('confirmPassword:', confirmPassword);
        if (password === confirmPassword){
            console.log('same')
            auth
            .createUserWithEmailAndPassword(email , password)
            .then(userCredentials => {
                
                const user = userCredentials.user;
                console.log('Created account with', user.email);
                navigation.navigate('Create Profile')
            })
            .catch(error => alert(error.message))
        } else {
            Alert.alert('Alert', 'Passwords do not match!');   
        }
    }
    return (
        <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
    >
        <Image source={require('../../assets/clear_logo.png')}
            style={{width: '100%', height: 350}}
        />
       <View style={styles.inputContainer}>
           
           <TextInput
                placeholder="e.g. jim@foodfight.com"
                value={email}
                onChangeText={text => setEmail(text)}
                style={styles.input}
            />
            <View style={styles.space} />
            <TextInput
                placeholder="Your password here"
                value={password}
                onChangeText={text => setPassword(text)}
                style={styles.input}
                secureTextEntry
            />
            <View style={styles.space} />
            <TextInput
                placeholder="Confirm your password here"
                value={confirmPassword}
                onChangeText={text => setconfirmPassword(text)}
                style={styles.input}
                secureTextEntry     
            />
       </View>
       <View style={styles.buttonContainer}>
            
            <TouchableOpacity
                onPress={inputSubmit}
                style={[styles.button, styles.buttonOutline]}            
            >
                <Text style={styles.buttonOutlineText}>Sign Up</Text>
            </TouchableOpacity>
            
       </View>
    </KeyboardAvoidingView>
    
    )
}

export default SignUpScreen;

