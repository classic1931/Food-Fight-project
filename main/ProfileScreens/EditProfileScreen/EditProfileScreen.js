import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ImageBackground, TouchableOpacity, TextInput, Alert } from 'react-native'
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/core';
import * as ImagePicker from 'expo-image-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as firebase from "firebase";
import { db, auth, storage } from "../../../firestore";
import uuid from 'uuid';


import { collection, query, where, getDocs, setDoc, doc } from "firebase/firestore";
import { SafeAreaView } from 'react-native-safe-area-context';
const EditProfileScreen = () => {

    const navigation = useNavigation()
    const [hasGalleryPermission, sethasGalleryPermission] = useState(null);
    const [image, setImage] = useState("");
    const [uploading, setUploading] = useState(false);
    const [userData, setUserData] = useState("");

    const getPictureBlob = (uri) => {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.onerror = function (e) {
                reject(new TypeError("Network request failed"));
            };
            xhr.responseType = "blob";
            xhr.open("GET", image, true);
            xhr.send(null);
        });
    };

    const uploadImageToBucket = async () => {
        let blob;
        const currentUser = firebase.auth().currentUser;
        try {
            setUploading(true);
            blob = await getPictureBlob(image);

            const ref = await firebase.storage().ref().child('uPhotos/' + currentUser.uid);
            const snapshot = await ref.put(blob);
            console.log("link path");
            return await snapshot.ref.getDownloadURL();
        } catch (e) {
            alert(e.message);
        } finally {
            blob.close();
            setUploading(false);
        }
    };

    const UpdateImage = async () => {

        const currentUser = firebase.auth().currentUser;
        console.log("user Upadted");

        let imgUrl = await uploadImageToBucket();
        if (imgUrl === null && userData.photoURL) {
            imgUrl = userData.photoURL;
        }

        await db
            .collection('users')
            .doc(currentUser.uid)
            .update({
                photoURL: imgUrl,
            })
            .then(() => console.log("user Upadted"));
    };



    const getUser = async () => {
        const currentUser = firebase.auth().currentUser;

        try {
            await db
                .collection('users')
                .doc(currentUser.uid)
                .get()
                .then((documentSnapshot) => {
                    if (documentSnapshot.exists) {
                        console.log('User Data', documentSnapshot.data());
                        setUserData(documentSnapshot.data());
                    } else {
                        console.log('hello');
                    }
                })

        } catch (err) {
            Alert.alert('There is something wrong!', err.message);
        }


    }

    useEffect(() => {
        console.log('completed');
        getUser();

        (async () => {
            const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
            sethasGalleryPermission(galleryStatus.status === 'granted');

        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediatypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [3, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    const handleUpdate = async () => {
        const currentUser = firebase.auth().currentUser;
        UpdateImage();
        try {
            await db
                .collection('users')
                .doc(currentUser.uid)
                .update({
                    allergiesRestrictions: userData.allergiesRestrictions,
                    bio: userData.bio,

                    lastName: userData.lastName,
                    firstName: userData.firstName,
                    interests: userData.interests,
                    username: userData.username,
                    zipCode: userData.zipCode,

                })
                .then(() => {
                    console.log('User Updated!');

                    Alert.alert(
                        'Profile Updated!',
                        'Your profile has been updated successfully.'
                    );

                })
        } catch (err) {
            Alert.alert('There is something wrong!', err.message);
        }


    }

    if (hasGalleryPermission === false) {
        return <Text>No access to Internal Storage</Text>
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAwareScrollView>
            <View style={styles.container}>

                <View style={{ margin: 20 }}>
                    <View style={{ alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => pickImage()}>
                            <View style={{
                                height: 200,
                                width: 200,
                                borderRadius: 15,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                                <ImageBackground source={{
                                    uri: image ? image : 'https://i.pinimg.com/474x/65/25/a0/6525a08f1df98a2e3a545fe2ace4be47.jpg'
                                }}
                                    style={{ height: 200, width: 200 }}
                                    imageStyle={{ borderRadius: 15 }}
                                >
                                    <View style={{
                                        flex: 1,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>
                                        <Icon name="camera" size={60} color="#fff" style={{
                                            opacity: 0.7,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderWidth: 1,
                                            borderColor: '#fff',
                                            borderRadius: 10,
                                        }}></Icon>
                                    </View>
                                </ImageBackground>
                            </View>
                        </TouchableOpacity>

                        <Text style={{ marginTop: 10, fontSize: 30, fontWeight: 'bold' }}>{userData ? userData.firstName : 'fname'}{' '}{userData ? userData.lastName : 'lname'}</Text>
                    </View>


                    <View style={styles.action}>
                        <FontAwesome name="user-o" size={25} />
                        <TextInput
                            placeholder={userData ? userData.firstName : ''}
                            value={userData ? userData.firstName : ''}
                            placeholderTextColor="#666666"
                            autoCorrect={false}
                            style={styles.textInput}
                            onChangeText={(txt) => setUserData({ ...userData, firstName: txt })}
                        ></TextInput>
                    </View>
                    <View style={styles.action}>
                        <FontAwesome name="user-o" size={25} />
                        <TextInput
                            placeholder={userData ? userData.lastName : ''}
                            value={userData ? userData.lastName : ''}
                            placeholderTextColor="#666666"
                            autoCorrect={false}
                            style={styles.textInput}
                            onChangeText={(txt) => setUserData({ ...userData, lastName: txt })}
                        ></TextInput>
                    </View>

                    <View style={styles.action}>
                        <FontAwesome name="id-badge" size={25} />
                        <TextInput
                            placeholder={userData ? userData.username : ''}
                            value={userData ? userData.username : ''}
                            placeholderTextColor="#666666"
                            autoCorrect={false}
                            style={styles.textInput}
                            onChangeText={(txt) => setUserData({ ...userData, username: txt })}
                        ></TextInput>
                    </View>
                    <View style={styles.action}>
                        <FontAwesome name="list-alt" size={25} />
                        <TextInput
                            placeholder= "Edit bio..."
                            value={userData ? userData.bio : ''}
                            placeholderTextColor="#666666"
                            autoCorrect={false}
                            style={styles.textInput}
                            onChangeText={(txt) => setUserData({ ...userData, bio: txt })}
                        ></TextInput>
                    </View>
                    <View style={styles.action}>
                        <FontAwesome name="thumbs-o-up" size={25} />
                        <TextInput
                            placeholder= "Edit interests..."
                            value={userData ? userData.interests : ''}
                            placeholderTextColor="#666666"
                            autoCorrect={false}
                            style={styles.textInput}
                            onChangeText={(txt) => setUserData({ ...userData, interests: txt })}
                        ></TextInput>
                    </View>
                    <View style={styles.action}>
                        <FontAwesome name="plus-square" size={25} />
                        <TextInput
                            placeholder="Edit allergies..."
                            value={userData ? userData.allergiesRestrictions : ''}
                            placeholderTextColor="#666666"
                            autoCorrect={false}
                            style={styles.textInput}
                            onChangeText={(txt) => setUserData({ ...userData, allergiesRestrictions: txt })}
                        ></TextInput>
                    </View>
                    <View style={styles.action}>
                        <FontAwesome name="address-book-o" size={25} />
                        <TextInput
                            placeholder={userData ? userData.zipCode : ''}
                            value={userData ? userData.zipCode : ''}
                            placeholderTextColor="#666666"
                            keyboardType='number-pad'
                            autoCorrect={false}
                            style={styles.textInput}
                            onChangeText={(txt) => setUserData({ ...userData, zipCode: txt })}
                        ></TextInput>
                    </View>

                    <TouchableOpacity style={styles.commandButton} onPress={() => { handleUpdate(); }}>
                        <Text style={styles.panelButtonTitle}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAwareScrollView>
        </SafeAreaView>
    );
}

export default EditProfileScreen;
