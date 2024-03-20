import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, Alert, ScrollView, TouchableOpacity, Image, ImageBackground } from 'react-native';
import "firebase/firestore";
import * as firebase from "firebase";

import {
    Avatar,
    Title,
    Caption,
    Text,
    TouchableRipple,
} from 'react-native-paper';
import styles from './styles';
import { doc, setDoc } from "firebase/firestore";
import { useNavigation } from '@react-navigation/core';
import { db } from "../../../firestore";
import { collection, query, where, getDocs } from "firebase/firestore";

const ProfileScreen = ({ navigation }) => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [image, setImage] = useState();
    const [size, setSize] = useState();

    const loggingout = async () => {
        try {
            await firebase.auth().signOut();
            console.log('logout');
            navigation.navigate('Login');

        } catch (err) {
            Alert.alert('There is something wrong!', err.message);
        }
    }
    
    const getUser = async () => {
        const currentUser = firebase.auth().currentUser;

        try {
            await db
                .collection('users')
                .doc(currentUser.uid)
                .get()
                .then((documentSnapshot) => {
                    if (documentSnapshot.exists) {
                        setUserData(documentSnapshot.data());
                        setImage(userData.photoURL);
                    } else {
                        console.log('hello');
                    }
                })

        } catch (err) {
        }
        try {
            await db
                .collection('following')
                .doc(currentUser.uid)
                .get()
                .then((documentSnapshot) => {
                    if (documentSnapshot.exists) {
                        setSize = documentSnapshot.size
                    } else {
                        setSize = 0
                    }
                })

        } catch (err) {
        }
        setLoading(false);
    }

    useEffect(() => {
        getUser();
        
    }, [navigation, getUser]);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.userName}>
                        {userData ? userData.username : 'User'}
                    </Text>
                    <Image
                        style={styles.userImg}
                        source={{
                            // uri: userData.photoURL,
                             uri: image,
                        }}
                    />
                    <Text style={styles.userName}>
                        {userData ? userData.firstName : 'fname'} {' '}
                        {userData ? userData.lastName : 'lname'}
                    </Text>

                    <View style={styles.userInfoWrapper}>
                        {/* <View style={styles.userInfoItem}>
                            <Text style={styles.userInfoTitle}>10</Text>
                            <Text style={styles.userInfoSubTitle}>Posts</Text>
                        </View> */}
                        <View 
                        style={styles.userInfoItem}>
                            <Text 
                            style={styles.userInfoTitle}
                            onPress={() => { navigation.navigate("Followers") }}>{userData ? userData.followersCount : 0}</Text>
                            <Text style={styles.userInfoSubTitle}>Followers</Text>
                        </View>
                        <View 
                        style={styles.userInfoItem}>
                            <Text 
                            onPress={() => { navigation.navigate("Following") }}
                            style={styles.userInfoTitle}>{userData ? userData.followingCount : 0}</Text>
                            <Text style={styles.userInfoSubTitle}>Following</Text>
                        </View>
                    </View>

                    <Text style={styles.titles}>
                        Bio
                    </Text>

                    <Text style={styles.userBio}>
                        {userData ? userData.bio : 'Default Bio'}
                    </Text>

                    <Text style={styles.titles}>
                        Interests
                    </Text>

                    <Text style={styles.userInterests}>
                        {userData ? userData.interests : 'Default Interests'}
                    </Text>

                    <Text style={styles.titles}>
                        Allergies
                    </Text>

                    <Text style={styles.userAllergies}>
                        {userData ? userData.allergiesRestrictions : 'Default Allergies'}
                    </Text>
                    <View style={styles.userBtn}>
                        <TouchableOpacity
                            onPress={() => { navigation.navigate("Edit Profile") }}
                            style={styles.button}
                        >
                            <Text style={styles.buttonText}>Edit Profile</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.userBtn}>
                        <TouchableOpacity
                            onPress={() => { navigation.navigate("Search") }}
                            style={styles.button}
                        >
                            <Text style={styles.buttonText}>Search</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.userBtn}>
                        <TouchableOpacity
                            onPress={loggingout}
                            style={styles.button}
                        >
                            <Text style={styles.buttonText}>Logout</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
    );

};

export default ProfileScreen;

