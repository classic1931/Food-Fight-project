import React, {useRef} from "react";
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, Alert, View, Image, FlatList, SafeAreaView} from "react-native";
import styles from "./styles";
import { db, auth } from "../../firestore";
import firebase from "firebase";
import Icon from 'react-native-vector-icons/FontAwesome';
import Foundation from 'react-native-vector-icons/Foundation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { LinearGradient } from "expo-linear-gradient";

const Results = ({navigation, route, room}) => {
    const roomCode = route.params.route.params.roomCode;
    let temp = 0;
    let pList = [];
    const [theData, setTheData] = useState();
    const [firstName, setFirstName] = useState();
    const [secondName, setSecondName] = useState();
    const [thirdName, setThirdName] = useState();
    const [firstAmount, setFirstAmount] = useState();
    const [secondAmount, setSecondAmount] = useState();
    const [thirdAmount, setThirdAmount] = useState();

    const [preferences, setPreferences] = useState();
    const [userData, setUserData] = useState([0,1,2]);
    useEffect(() =>{
        async function arrayForFlatlist() {
            let newArray= [];
            const userRef = db.collection('group').doc(roomCode);
            const doc = await userRef.get();
            const docdata = doc.data();
            for(let i = 0; i< 10; i++)
            {
                newArray.push(docdata[i]);
            }
            function findIndicesOfMax(inp, count) {
                var outp = [];
                for (var i = 0; i < inp.length; i++) {
                    outp.push(i); 
                    if (outp.length > count) {
                        outp.sort(function(a, b) { return inp[b] - inp[a]; }); 
                        outp.pop(); 
                    }
                }
                return outp;
            }
            let max = findIndicesOfMax(newArray,3);
            setUserData(max);
            return(newArray);
            
        }
        const observer = db.collection('group').where('roomID','==', roomCode).onSnapshot(querySnapshot => 
            {
                querySnapshot.docChanges().forEach(change =>
                {   
                    let numbers = change.doc.data();
                    setFirstName(numbers.businesses[userData[0]].restaurantName);
                    setSecondName(numbers.businesses[userData[1]].restaurantName);
                    setThirdName(numbers.businesses[userData[2]].restaurantName);
                    setFirstAmount(numbers[userData[0]]);
                    setSecondAmount(numbers[userData[1]]);
                    setThirdAmount(numbers[userData[2]]);
                    
                    if(change.type === 'modified')
                    {
                        arrayForFlatlist();
                        setFirstName(numbers.businesses[userData[0]].restaurantName);
                        setSecondName(numbers.businesses[userData[1]].restaurantName);
                        setThirdName(numbers.businesses[userData[2]].restaurantName);
                        setFirstAmount(numbers[userData[0]]);
                        setSecondAmount(numbers[userData[1]]);
                        setThirdAmount(numbers[userData[2]]);
                    }
                    else{
                        arrayForFlatlist();    
                    }
                });
            },(error) =>{
                console.log("error listening on observer");
            });

            return() => {
                observer(); console.log("detatch listener");
            }
    }, [theData]);

    const getPreference = () => {
        db.collection("userPreferences").get()
        .then((snapshot) => {
            let preferences = snapshot.docs.map(doc => {
                const data = doc.data();
                const id = doc.id;
                return {id, ...data }
            });
            setPreferences(preferences);
        })
    }

    useEffect(() => {
        // fetchPosts();
        getPreference();
    }, []);
    
    return (
        <LinearGradient
            colors={['rgba(255, 255, 255, 0)', '#D72F2F']}
            style={styles.safe}>
            <SafeAreaView style={styles.safe}>
                <View style={styles.buttonContainerHome}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('GroupStart') }
                        style={styles.buttonHome}>
                        <Text style={styles.buttonTextHome}>FOOD FIGHT</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.roomId}>    
                    <Text style ={styles.roomIdText}>Room ID: {roomCode}</Text>
                </View>
                <View style={styles.GroupOfRest}>
                    <Text style={styles.MostLiked}>MOST LIKED:</Text>
                    <View style={styles.Restaurants}>
                        <Text style ={styles.firstOption}>1. {firstName}: {firstAmount} votes</Text>
                    </View>
                    <View style={styles.Restaurants}>
                        <Text style ={styles.RestaurantsText}>2. {secondName}: {secondAmount} votes</Text>
                    </View>
                    <View style={styles.Restaurants}>
                        <Text style ={styles.RestaurantsText}>3. {thirdName}: {thirdAmount} votes</Text>
                    </View>
                    <View style={styles.preferences}>
                        <Text style={styles.MostLiked}>Group Preferences</Text>
                        <FlatList 
                            data = {preferences}
                            renderItem = {({item}) => (
                                <Text>{item.userPref}</Text>
                            )}
                        />
                    </View>
                    <View style={styles.endButtons}>
                        <TouchableOpacity onPress={() => setTheData(1+theData)} style = {styles.functionButton}>
                                <Foundation name="refresh" size={50} color="#FC0000" />
                            </TouchableOpacity>
                        <TouchableOpacity onPress={() => {db.collection('group').doc(roomCode).delete(), navigation.navigate('GroupStart')}} style = {styles.functionButton}>
                            <MaterialIcons name="exit-to-app" size={50} color="#FC0000" />
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </LinearGradient>  
  )
}

export default Results

