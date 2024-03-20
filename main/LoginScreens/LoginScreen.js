import { KeyboardAvoidingView, StyleSheet, Text, Image, 
    TextInput, View, TouchableOpacity} from 'react-native';
import React, { useState, useEffect } from 'react';
import styles from './styles';
import { db, auth } from "../../firestore";

// include navigation here

const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const bypassLogin = () => {
        auth
        .signInWithEmailAndPassword('Bing@gmail.com', '123123')
        .then(userCredentials => {
            const user = userCredentials.user;
            console.log('Logged in with', user.email);
            navigation.navigate('UserTabs')
        })
        .catch(error => alert(error.message))
    }
    const handleLogin = () => {
        auth
        .signInWithEmailAndPassword(email, password)
        .then(userCredentials => {
            const user = userCredentials.user;
            console.log('Logged in with', user.email);
            navigation.navigate('UserTabs')
        })
        .catch(error => alert(error.message))
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
       </View>

       <View style={styles.buttonContainer}>
            <TouchableOpacity
                onPress={bypassLogin}
                style={styles.button}            
            >
                <Text style={styles.buttonText}>Bypass login</Text>
            </TouchableOpacity>
            <View style={styles.space} />
            <TouchableOpacity
                onPress={handleLogin}
                style={styles.button}            
            >
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <View style={styles.space} />
            <TouchableOpacity
                onPress={() => navigation.navigate('Sign Up')}
                style={[styles.button, styles.buttonOutline]}            
            >
                <Text style={styles.buttonOutlineText}>Sign Up</Text>
            </TouchableOpacity>
            <View style={styles.space} />
            <TouchableOpacity
                onPress={() => navigation.navigate('Forgot Password')}
                style={[styles.button, styles.buttonOutline]}            
            >
                <Text style={styles.buttonOutlineText}>Forgot Password?</Text>
            </TouchableOpacity>
       </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;


