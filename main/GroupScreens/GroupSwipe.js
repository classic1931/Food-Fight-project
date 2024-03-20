import React, {useRef} from "react";
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/core';
//import { NavigationContainer } from '@react-navigation/native';
//import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, TouchableOpacity, Alert, View, Image, FlatList, SafeAreaView} from "react-native";
import styles from "./styles";
import { doc, setDoc, getDoc, onSnapshot } from "firebase/firestore"; 
import { db, auth } from "../../firestore";
import firebase from "firebase";
import Icon from 'react-native-vector-icons/FontAwesome';

import Octicons from 'react-native-vector-icons/Octicons';
import Swiper from "react-native-deck-swiper";
import {BEARER_TOKEN} from '../hooks/yelp-api/config';

// 
let DUMMY_DATA = [
    {
        id: "5kfcCQympRu6-BI99XiCCQ",
        photoURL: "https://media0.giphy.com/media/3o7bu3XilJ5BOiSGic/giphy.gif",
        restaurantName: "Loading",
        swipe: 0,
    },
    {
        id: "bP4ovqsjSZZmDvgKwx7Zrw",
        photoURL: "https://s3-media2.fl.yelpcdn.com/bphoto/49HCJeNsnexERxBAKRW_QQ/o.jpg",
        restaurantName: "Smoke & Fire Social Eatery",
        swipe: 0,
    },
    {
        id: "qkv0VVJrtmHxxKElqwXFTA",
        photoURL: "https://s3-media1.fl.yelpcdn.com/bphoto/vsUBJlhlpXp6nvrTb4ibbA/o.jpg",
        restaurantName: "Omega Burgers",
        swipe: 0,
    },
    {
        id: "mEqjT__wX74L3KKUYy5svw",
        photoURL: "https://s3-media1.fl.yelpcdn.com/bphoto/JPp1gZOAm5Ti9eDq4P2LDA/o.jpg",
        restaurantName: "Nillys Neighborhood Burger Shop",
        swipe: 0,
    },
    {
        id: "lHkb4GaOvgbwLTouGT3dKA",
        photoURL: "https://s3-media1.fl.yelpcdn.com/bphoto/GWPuCnnRxtSsk33cvfY7MA/o.jpg",
        restaurantName: "Tam's Burgers",
        swipe: 0,
    },
    {
        id: "e_H6pBi8MBrauCEbtaJJyw",
        photoURL: "https://s3-media1.fl.yelpcdn.com/bphoto/xxmtoJWwYiGIvDEv8MI_Mg/o.jpg",
        restaurantName: "Time Out Burger",
        swipe: 0,
    },
    {
        id: "wxCdTC5U6yhBRxKQDffSpA",
        photoURL: "https://s3-media2.fl.yelpcdn.com/bphoto/EypWCAAlx4V8cEO72BkjiA/o.jpg",
        restaurantName: "Nexx Burger",
        swipe: 0,
    },
    {
        id: "-ddx_SZ4nJJADNpl29i84g",
        photoURL: "https://s3-media3.fl.yelpcdn.com/bphoto/Y4ao63qhlHfvAcYq1pyzVQ/o.jpg",
        restaurantName: "SteelCraft Bellflower",
        swipe: 0,
    },
    {
        id: "zqWxgPZU0CDU7VYgidcDCA",
        photoURL: "https://s3-media1.fl.yelpcdn.com/bphoto/rMm5DiOKykJhI3FaeMr0sQ/o.jpg",
        restaurantName: "Dave's Burgers",
        swipe: 0,
    },
    {
        id: "0znrhByWGLP5j_IhjxebOA",
        photoURL: "https://s3-media4.fl.yelpcdn.com/bphoto/wnWVQgXq4DEPJmFcKvOoNw/o.jpg",
        restaurantName: "Mr Pete's Burgers",
        swipe: 0,
    },
]
const temp = {
    restaurantName: '',
    photoURL: '',
    id: '',
};
var companys = [];
var testing = true;
let choices1 = [];
const GroupSwipe = ({navigation, route}) => {

    const roomCode = route.params.roomCode;
    const room  = roomCode;
    const swipeRef = useRef(null);
    const [COMPANYS, setCOMPANYS] = useState([]);

    useEffect(() => {
        async function fetchData() {
            
            const response = await db
                .collection('group')
                .doc(roomCode)
                .get();
            const test1 = response.data();
            const restData = test1['businesses'];
  
            DUMMY_DATA = restData;
            setCOMPANYS(restData);
 
        }
        setTimeout(()=> {fetchData();}, 2000);
        

    }, []);

    const increment = firebase.firestore.FieldValue.increment(1);


    const storyRef = db.collection('group').doc(roomCode);

    const like = (cardIndex) =>{

        switch (cardIndex) {
            case 0:
                storyRef.update( {0 : increment} );
                break;
            case 1:
                storyRef.update( {1 : increment} );
                break;
            case 2:
                storyRef.update( {2 : increment} );
                break;
            case 3:
                storyRef.update( {3 : increment} );
                break;
            case 4:
                storyRef.update( {4 : increment} );
                break;
            case 5:
                storyRef.update( {5 : increment} );
                break;
            case 6:
                storyRef.update( {6 : increment} );
                break;
            case 7:
                storyRef.update( {7 : increment} );
                break;
            case 8:
                storyRef.update( {8 : increment} );
                break;
            case 9:
                storyRef.update( {9 : increment} );
                console.log('end');
                break;
        }
    }
    const dislike = (cardIndex) =>{
        if (cardIndex >9){
            console.log('end')
        }
    }
    return (
        <SafeAreaView style={styles.safe}>
            <View style={styles.buttonContainerHome}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('GroupStart') }
                    style={styles.buttonHome}
                >
                    <Text style={styles.buttonTextHome}>FOOD FIGHT</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.roomId}>    
                <Text style ={styles.roomIdText}>Room ID: {roomCode}</Text>
            </View>
            
            <View style={styles.cards}>
                <Swiper 
                    ref={swipeRef}
                    containerStyle={{backgroundColor: 'transparent'}}
                    cards={DUMMY_DATA}
                    stackSize={3}
                    cardIndex={0}
                    onSwipedLeft={cardIndex => {console.log(), dislike(cardIndex)}}
                    onSwipedRight={cardIndex => {console.log(), like(cardIndex)}}
                    animateCardOpacity
                    verticalSwipe={false}
                    renderCard={(card) => (
                        <View style={styles.cardstyle}
                        key={card.id} >
                            <Text style={{alignSelf: 'center', margin:10, fontSize: 18, fontWeight: 'bold',}}>{card.restaurantName}</Text>
                            <Image 
                                style={{ alignSelf: 'center', width: 300,
                                height: 300,resizeMode: 'contain', borderRadius: 5, 
                                margin:15, borderRadius: 20, justifyContent: 'center'}}
                                source={{ uri: card.photoURL }}
                                />
                        </View>
                        
                    )}
                />
            </View>
            <View style = {styles.functionList}>           
        
                    <TouchableOpacity onPress={() => swipeRef.current.swipeLeft()} style = {styles.functionButton}>
                        <Icon name="times-circle-o" size={80} color="#AA4747" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => swipeRef.current.swipeRight()} style = {styles.functionButton}>
                        <Icon name="check-circle-o" size={80} color="#9DC151" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {{navigation.navigate("Results", {route}, {roomCode}, {room})};}} style = {styles.functionButton}>
                        <Octicons name="stop" size={55} color="#75B9DF" />
                    </TouchableOpacity>
                
            </View>
        </SafeAreaView>
        
    )
}

export default GroupSwipe

