import React, {useState, useEffect} from 'react'
import {View, Text, TouchableOpacity, StyleSheet, ImageBackground, Button, TextInput, Alert} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import * as firebase from "firebase";
import { db } from "../../firestore";

const AddNewPost = ({navigation, restaurId}) => {
    const [image, setImage] = useState("");
    const [hasGalleryPermission, sethasGalleryPermission] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [userData, setUserData] = useState("");

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
        var post = await db.collection('posts').doc();
        try {
            setUploading(true);
            blob = await getPictureBlob(image);
            const ref = await firebase.storage().ref().child('postPhotos/'+ post.id);
            const snapshot = await ref.put(blob);
            // console.log("link path");
            return await snapshot.ref.getDownloadURL();
        } catch (e) {
            alert(e.message);
        } finally {
            blob.close();
            setUploading(false);
        }
    };

    useEffect(() => {
        getUser();
        (async () => {
            const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
            sethasGalleryPermission(galleryStatus.status === 'granted'); 
        })();
    }, []);

    const pickImage = async () => {
        console.log('hello')
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
        let imgUrl = await uploadImageToBucket();
        if (imgUrl === null && userData.photoURL) {
            imgUrl = userData.photoURL;
        }
        try {
            var post = await db.collection('posts').doc();
            post.set({
                user: userData.username,
                userPic: userData.photoURL,
                imageUrl: imgUrl,
                caption: userData.caption,
                location: userData.location,
                menuItem: userData.menuItem,
                docId: post.id,
                likes: 0,
                restId: restaurId,
            })
            .then(() => {
                console.log('Post made!');

                Alert.alert(
                    'Post Made!',
                    'Your post has been updated successfully.'
                );
            })
        } catch (err) {
            Alert.alert('There is something wrong!', err.message);
            console.log(err.message)
        }
        if(restaurId == "")
        {
            navigation.navigate('HomeScreen');
        }
        else{
            navigation.goBack();
        }
    }

    return (
        <View style = {styles.container}>
            <Header navigation = {navigation}/>
            {/* <FormPost/> */}
            <View style={{ alignItems: 'center' }}>
                <TouchableOpacity onPress={() => pickImage()}>
                    <View style={{
                        height: 300,
                        width: 200,
                        borderRadius: 15,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <ImageBackground source={{
                            uri: image ? image : 'https://i.pinimg.com/474x/65/25/a0/6525a08f1df98a2e3a545fe2ace4be47.jpg'
                        }}
                            style={{ height: 300, width: 300 }}
                            // imageStyle={{ borderRadius: 15 }}
                        >
                            <View style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            </View>
                        </ImageBackground>
                    </View>
                </TouchableOpacity>
            </View>

            <View>
                <TextInput
                    style = {{color: "black", fontSize: 20, height: 50, marginTop: 15}} 
                    placeholder = {'Write a caption...'}
                    value={userData ? userData.caption : ''}
                    placeholderTextColor = "gray"
                    multiline = {true}
                    onChangeText={(txt) => setUserData({ ...userData, caption: txt })}
                    />
            </View>
            <View>
                <TextInput 
                    style = {{color: "black", fontSize: 20, height: 50}} 
                    placeholder = {'Add a location'}
                    value={userData ? userData.location : ''}
                    placeholderTextColor = "gray"
                    multiline = {true}
                    onChangeText={(txt) => setUserData({ ...userData, location: txt })}
                    />
            </View>
            <View>
                <TextInput 
                    style = {{color: "black", fontSize: 20, height: 50}} 
                    placeholder = {'Add menu item'}
                    value={userData ? userData.menuItem : ''}
                    placeholderTextColor = "gray"
                    multiline = {true}
                    onChangeText={(txt) => setUserData({ ...userData, menuItem: txt })}
                    />
            </View>
            <Button 
                onPress={() => { handleUpdate(); }}
                title = 'Post'
                />
        </View>
    )
}

const Header = ({navigation}) => (
    <View style ={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon style = {styles.icon} name = "chevron-back-outline" size = {35} color = "#000" />
        </TouchableOpacity>
        <Text style = {styles.headerText}> NEW POST</Text>
    </View>
)

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    headerText: {
        color: '#000',
        fontWeight: '700',
        fontSize: 20,
        marginRight: 130
    }
})

export default AddNewPost;