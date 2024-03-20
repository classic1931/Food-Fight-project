import { KeyboardAvoidingView, StyleSheet, Text, Image, TextInput, View, TouchableOpacity} from 'react-native';
import React, { useState, useEffect } from 'react';
import styles from './styles';
import * as firebase from "firebase";

const ForgotPasswordScreen = ({navigation}) => {
    const [email, setEmail] = useState('')
    const emails = ''
    const sendPasswordReset = async () => {
        try {
            console.log(email);
            await firebase.auth().sendPasswordResetEmail(String(email));
            alert("Password reset link sent!");
        } catch (err) {
            console.error(err);
            alert(err.message);
        }
      };
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
           
            
       </View>

       <View style={styles.buttonContainer}>
            <TouchableOpacity
                onPress={sendPasswordReset}
                style={styles.button}            
            >
                <Text style={styles.buttonText}>Reset Password</Text>
            </TouchableOpacity>
           
        </View>
    </KeyboardAvoidingView>
    )
}

export default ForgotPasswordScreen;