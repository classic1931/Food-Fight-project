import { KeyboardAvoidingView, StyleSheet, Text, Image, TextInput, View, TouchableOpacity} from 'react-native';
import React, { useState, useEffect } from 'react';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { db, auth } from "../../firestore";
import "firebase/firestore";
import * as firebase from "firebase";

const CreateProfileScreen = ({navigation}) => {
    const [username, setUsername] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [zipCode, setZipCode] = useState('')
    const [allergiesRestrictions, setAllergiesRestrictions] = useState('')
    const emptyState = () => {
        setUsername('');
        setFirstName('');
        setLastName('');
        setZipCode('');
        setAllergiesRestrictions('');
      };
    const currentUser = firebase.auth().currentUser;
    const handlePress = () => {
        if (!username) {
          Alert.alert('Username is required');
        } else if (!firstName) {
          Alert.alert('First name is required.');
        } else if (!lastName) {
          Alert.alert('Last name is required.');
        } else if (!zipCode) {
          Alert.alert('ZipCode is required.');
        } else {
            const db = firebase.firestore();
            db.collection("users")
            .doc(currentUser.uid)
            .set({
                username: username,
                lastName: lastName,
                firstName: firstName,
                zipCode: zipCode,
                allergiesRestrictions: allergiesRestrictions,
                followersCount: 0,
                followingCount: 0,
            });
          emptyState();
          navigation.navigate('UserTabs')
        }
      };
    return (
        <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
    >
        <Image source={require("../../assets/clear_logo.png")}
            resizeMode='contain'
            style={{marginTop: '-40%', marginBottom: '-20%', width: '100%', height: 400}}
        />
         <View style={styles.inputContainer}>
           <Text>UserName</Text>
           <TextInput
                placeholder="e.g. jimbo123"
                value={username}
                onChangeText={text => setUsername(text)}
                style={styles.input}
            />
            <View style={styles.space} />
            <Text>First Name</Text>
            <TextInput
                placeholder="First Name"
                value={firstName}
                onChangeText={text => setFirstName(text)}
                style={styles.input}
            />
            <View style={styles.space} />
            <Text>Last Name</Text>
            <TextInput
                placeholder="Last Name"
                value={lastName}
                onChangeText={text => setLastName(text)}
                style={styles.input}
            />
            <View style={styles.space} />
            <Text>ZipCode</Text>
            <TextInput
                placeholder="ZipCode"
                value={zipCode}
                onChangeText={text => setZipCode(text)}
                style={styles.input}
            />
            <View style={styles.space} />
            <Text>Allergies or Restricitions</Text>
            <TextInput
                placeholder="Allergies/Restrictions"
                value={allergiesRestrictions}
                onChangeText={text => setAllergiesRestrictions(text)}
                style={styles.input}
            />
            <View style={styles.space} />
            <TouchableOpacity
                onPress={handlePress}
                style={[styles.button, styles.buttonOutline]}            
            >
                <Text style={styles.buttonOutlineText}>Save</Text>
            </TouchableOpacity>
            
       </View>
    </KeyboardAvoidingView>
    
    )
}

export default CreateProfileScreen;

