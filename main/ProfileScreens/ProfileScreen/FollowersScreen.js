import { KeyboardAvoidingView, StyleSheet, Text, Image, SafeAreaView, TextInput, View, TouchableOpacity} from 'react-native';
import React, { useState, useEffect } from 'react';
import styles from './styles';
import { db } from "../../../firestore";

const FollowersScreen = () => {
    return (
        <SafeAreaView style={{ height: 600 }}>
        <Text style = {styles.title}> Followers List</Text>
        {/* <FlatList
             numColumns={1}
             horizontal ={false}
             data = {users}
             renderItem = {({item}) => (
                     <Text style = {{color: 'black', fontSize: 20, paddingLeft: 20}}>{item.name}</Text>
             )}
        /> */}
    </SafeAreaView>
    )
}

export default FollowersScreen;
