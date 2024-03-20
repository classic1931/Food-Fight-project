
    import React, { useEffect, useState } from "react";
    import { useNavigation } from '@react-navigation/core';
    import { StyleSheet, Text, TouchableOpacity, View, Image, SafeAreaView, Alert } from "react-native";
    import styles from "./styles";
    import { db, auth } from "../../firestore";
    import firebase from "firebase";

    const GroupStart = () => {
        const currentUser = firebase.auth().currentUser;
        const userID = currentUser.uid;
        const navigation = useNavigation()

        const createGroup = async() =>
        {  
            const newGroup = await db.collection('group').add({users:[userID]});
            const groupID = newGroup.id;
            const res = await newGroup.update({roomID: groupID});
            navigation.navigate("GroupWait", {roomID: groupID});
        }
        useEffect(() => {
            async function fetchData() {
                const userData = await db.collection('users').doc(userID).get();
                const userDataFormat = userData.data();
                Alert.alert("Allergies and Restrictions", userDataFormat.allergiesRestrictions); 
            }
            fetchData();
        },[]);
        
        return(
            <SafeAreaView style={styles.safe}>
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
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        onPress={createGroup}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Create Group</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        onPress={()=>{ navigation.navigate("JoinGroup")}}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Join Group</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView> 
        )
    }

    export default GroupStart;
    

