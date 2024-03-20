import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, Alert, ScrollView, TouchableOpacity, Image, ImageBackground } from 'react-native';
import "firebase/firestore";
import * as firebase from "firebase";

import {
    Text,
} from 'react-native-paper';
import styles from './styles';
import { db } from "../../../firestore";

const OtherProfileScreen = ({ route }) => {
    const [userData, setUserData] = useState(null);
    const [originUserData, setOriginUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [image, setImage] = useState(null);
    const [following, setFollowing] = useState();
    const increment = firebase.firestore.FieldValue.increment(1);
    const decrement = firebase.firestore.FieldValue.increment(-1);
    const ref = db.collection("users").doc(firebase.auth().currentUser.uid);
    const ref2 = db.collection("users").doc(route.params.uid);
    const onFollow = () => {
        firebase.firestore()
            .collection("following")
            .doc(firebase.auth().currentUser.uid)
            .collection("userFollowing")
            .doc(route.params.uid)
            .set({name: userData.firstName + " " + userData.lastName})
        ref.update({followingCount: increment})
        ref2.update({followersCount: increment})
    }
    const onUnfollow = () => {
        firebase.firestore()
            .collection("following")
            .doc(firebase.auth().currentUser.uid)
            .collection("userFollowing")
            .doc(route.params.uid)
            .delete()
            ref.update({followingCount: decrement})
            ref2.update({followersCount: decrement})
    }

    const getUser = async () => {
        const currentUser = firebase.auth().currentUser;

        try {
            await db
                .collection('users')
                .doc(route.params.uid)
                .get()
                .then((documentSnapshot) => {
                    if (documentSnapshot.exists) {
                        setUserData(documentSnapshot.data());
                        setImage(userData.photoURL);
                    }
                })

        } catch (err) {
        }
    }

    const checkFollowing = async() => {
        try {
            await db
                .collection('following')
                .doc(firebase.auth().currentUser.uid)
                .collection("userFollowing")
                .doc(route.params.uid)
                .get()
                .then((documentSnapshot) => {
                    if (documentSnapshot.exists) {
                        setFollowing(true)
                    } else {
                        setFollowing(false)
                    }
                })

        } catch (err) {
        }
    }

    useEffect(() => {
        checkFollowing();
        getUser();
        
    }, [route,following,getUser]);

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
                            //uri: userData.photoURL,
                            uri: image,
                        }}
                    />
                    <Text style={styles.userName}>
                        {userData ? userData.firstName : 'fname'} {' '}
                        {userData ? userData.lastName : 'lname'}
                    </Text>

                    <View style={[styles.container]}>
                            {following ? (
                                <TouchableOpacity
                                    style={[styles.buttonOutlined, styles.container, styles.margin15Right]}
                                    title="Following"
                                    onPress={() => onUnfollow()}>
                                    <Text style={[styles.bold, styles.center, ]}>Following</Text>
                                </TouchableOpacity>
                            )
                                :
                                (
                                    <TouchableOpacity
                                        style={[styles.buttonOutlined, styles.container, styles.margin15Right]}
                                        title="Follow"
                                        onPress={() => onFollow()}>
                                        <Text style={[styles.bold, styles.center, ]}>Follow</Text>
                                    </TouchableOpacity>
                                )}
                        </View>

                    <View style={styles.userInfoWrapper}>
                        <View style={styles.userInfoItem}>
                            <Text style={styles.userInfoTitle}>10</Text>
                            <Text style={styles.userInfoSubTitle}>Posts</Text>
                        </View>
                        <View 
                        style={styles.userInfoItem}>
                            <Text 
                            
                            style={styles.userInfoTitle}>{userData ? userData.followersCount : 0}</Text>
                            <Text style={styles.userInfoSubTitle}>Followers</Text>
                        </View>
                        <View 
                        style={styles.userInfoItem}>
                            <Text style={styles.userInfoTitle}>{userData ? userData.followingCount : 0}</Text>
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

                </View>
            </ScrollView>
        </SafeAreaView>
    );

};

export default OtherProfileScreen;

