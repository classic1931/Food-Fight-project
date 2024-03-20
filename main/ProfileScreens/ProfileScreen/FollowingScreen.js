import { KeyboardAvoidingView, StyleSheet, Text, Image, 
    TextInput, View, TouchableOpacity, SafeAreaView, FlatList, TouchableHighlight } from 'react-native';
import React, { useState, useEffect } from 'react';
import styles from './styles';
import { db } from "../../../firestore";
import * as firebase from "firebase";

const FollowingScreen = (navigation) => {
    const [users, setUsers] = useState([])
    const [users2, setUsers2] = useState([])
    const [refresh, setRefresh] = useState([true])

    const fetchUsers = () => {
         db.collection('following')
         .doc(firebase.auth().currentUser.uid)
         .collection("userFollowing")
         .get()
         .then((snapshot) => {
             let users = snapshot.docs.map(doc => {
                 const data = doc.data();
                 const id = doc.id;
                 return {id, ...data }
             });
             setUsers(users);
         })
    }

    useEffect(() => {
        fetchUsers();
        
    });
    return (
       <SafeAreaView style={{ height: 600 }}>
           <Text style = {styles.title}> Following List</Text>
           <FlatList
                numColumns={1}
                horizontal ={false}
                data = {users}
                renderItem = {({item}) => (
                        <Text style = {{color: 'black', fontSize: 20, paddingLeft: 20}}>{item.name}</Text>
                )}
           />
       </SafeAreaView>
    )
}

export default FollowingScreen;
