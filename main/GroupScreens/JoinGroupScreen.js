import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/core';

import { StyleSheet, Text, TouchableOpacity, View, Image, Alert, KeyboardAvoidingView , TextInput} from "react-native";
import { doc, setDoc} from "firebase/firestore"; 
import { db, auth } from '../../firestore';
import firebase from 'firebase';

const JoinGroupScreen = () => {
    const currentUser = firebase.auth().currentUser;
    const userID = currentUser.uid;
    const navigation = useNavigation()
    const [code, setCode] = useState('')
    
    const inputSubmit = async() => 
    {
        console.log(code);
        const groupRef = db.collection('group').doc(code);
        const doc = await groupRef.get();
        console.log(doc.data());
        if (!doc.exists) {
            Alert.alert('Alert', 'Invalid Code');
        } else {
            console.log('Document data found:', doc.data());
            let numUsers =doc.data().users.length 
            if( numUsers>10)
            {
                console.log("Maximum Group members exceeded: ",numUsers);
                Alert.alert('Alert','Maximum Group members exceeded')
            }
            else
            {
                const res = await groupRef.update({users: firebase.firestore.FieldValue.arrayUnion(userID)});
                navigation.navigate("GroupWait", {roomID: code});
            }
            
        }
    }
    return (
            <KeyboardAvoidingView style={styles.MainContainer} behavior="padding">
                <View style={styles.buttonContainerHome}>
                    <TouchableOpacity
                        onPress={()=>{ navigation.navigate("Activity");}}
                        style={styles.buttonHome}
                    >
                        <Text style={styles.buttonTextHome}>FOOD FIGHT</Text>
                    </TouchableOpacity>
                </View>

                <Image source={require('../../assets/logo-transparent.png')}
                    style={{width: 400, height: 400}}/>
                

                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="Input Room Code"
                        placeholderTextColor={'grey'} 
                        value={code}
                        onChangeText={text => setCode(text)}
                        style={styles.input}
                    />
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        onPress={inputSubmit}
                        style={styles.button}>
                        <Text style={styles.buttonText}>Join</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
            
            
    )
}

export default JoinGroupScreen;

const styles = StyleSheet.create({
    MainContainer: 
    {
        flex: 1,   
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#000000',
    },
    container: {
        flex:1,
        justifyContent:'center',
        alignItems: 'center',
    },
    buttonContainerHome:{
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 30,
    },
    buttonHome: {
        backgroundColor: '#EC3624',
        width: '100%',
        padding: 10,
        borderRadius: 0,
        alignItems: 'center',
    },
    buttonTextHome:{
        color: 'white',
        fontWeight: 'bold',
        fontSize: 40,
    },
    inputContainer:
    {
        width: '80%',
    },
    input: 
    {
        backgroundColor: '#2b2b2b',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 10,
        color:'white'
      },
    buttonContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 35,
      },
    button: {
        backgroundColor: '#EC3624',
        width: '60%',
        padding: 15,
        borderRadius: 30,
        alignItems: 'center',
      },
      buttonText:{
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
})