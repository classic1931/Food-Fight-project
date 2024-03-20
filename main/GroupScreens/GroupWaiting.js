import React, { useEffect, useState } from "react";
import { TextInput, StyleSheet, Text, TouchableOpacity, View, Image, FlatList, SafeAreaView} from "react-native";
import { db, auth} from "../../firestore";
import firebase from "firebase";
import * as Clipboard from 'expo-clipboard';
import {useBusinessSearch} from '../hooks/yelp-api/useBusinessSearch';
const Item = ({ title }) => (
<View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
</View>
);

const GroupWaiting = ({navigation, route}) => {
    const copyToClipboard = () => {
        Clipboard.setString(roomCode);
    };
    
    const [userData, setUserData] = useState([]);
    const [roomZipCode, setRoomZipCode] = useState('90630');
    const [foodType, setFoodType] = useState('burger');
    const [theData, setTheData] = useState();
    const [userPref, setUserPreference] = useState();

    const roomCode = route.params.roomID;

    async function arrayForFlatlist(data) {
        let newArray= [];
        for(let i = 0; i< data.length; i++)
        {
            let uName = "aname";

            const userRef = db.collection('users').doc(data[i]);
            const doc = await userRef.get();

            uName = doc.data().username;
            console.log(uName);

            newArray.push({id: i, user: data[i]});

        }

        return(newArray);
    }
    var company = [];
    const getYelpData = async () =>{
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer 9VImCBCq0RWdANlBCkTAyuFmGeWFjb1KtHlgS8z2L56nu4lRdSk3XMcbjktyyKZYsFspTGCoFP8Tp14a53nsEWv4shG42Cp5G98vMXUXYv4cECGOOJ4ytmPFdDcMYnYx");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
            };
        const amount = 10;
        const array = new Array(amount).fill(0);
        const choices = {array};
        fetch(`https://api.yelp.com/v3/businesses/search?term=${foodType}&location=${roomZipCode}&limit=${amount}`, requestOptions)
        .then(response => response.json())
        .then(data => 
            {
                for(let i=0; i < data['businesses'].length; i++){
                    const resturant = {
                        restaurantName: data['businesses'][i]['name'],
                        photoURL: data['businesses'][i]['image_url'],
                        id: data['businesses'][i]['id'],
                        
                    };
       
                    company.push(resturant);
     
                };
                db.collection("group")
                .doc(roomCode)
                .update({businesses: company,0:0,1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0});

            }
                )
       
        .catch(error => console.log('error', error));
        
        
    }
    
    useEffect(() =>{

        async function arrayForFlatlist(data) {
            let newArray= [];
            for(let i = 0; i< data.length; i++)
            {
                let uName = "aname";

                const userRef = db.collection('users').doc(data[i]);
                const doc = await userRef.get();
                uName = doc.data().username;
                newArray.push({id: i, user: uName});

            }
            setUserData(newArray);
            return(newArray);
            
        }
        const observer = db.collection('group').where('roomID','==', roomCode).onSnapshot(querySnapshot => 
            {
                querySnapshot.docChanges().forEach(change =>
                {
                    if(change.type === 'modified')
                    {
                        console.log('group has been modified:',change.doc.data().users);
                        
                        arrayForFlatlist(change.doc.data().users.slice(0));
                
                    }
                    else{
                        arrayForFlatlist(change.doc.data().users.slice(0));    
                    }
                });
                
            },(error) =>{
                console.log("error listening on observer");
            });

            return()=>
            {
                observer(); console.log("detatch listener");                             
            }
    },[]);
    
    const renderItem = ({ item }) => (
        <Item title={item.user} />
    );

    const getPreference = async () => {
        await db
            .collection('userPreferences')
            .add ({
                userPref: userPref,
            })
    }

    return(
        <SafeAreaView style={styles.safe}>
            <View style={styles.buttonContainerHome}>
             <TouchableOpacity
                     onPress={()=>{ navigation.navigate("Activity");}}
                     style={styles.buttonHome}>
                     <Text style={styles.buttonTextHome}>FOOD FIGHT</Text>
                 </TouchableOpacity>
             </View>
            <TouchableOpacity  onPress={copyToClipboard} style={styles.roomId}>    
                <Text style ={styles.roomIdText}>Room ID: {roomCode}</Text>
            </TouchableOpacity>
            <View style={styles.inputContainer}>
                <Text>Zipcode: </Text>
                    <TextInput
                    placeholder="e.g. 90909"
                    keyboardType='numeric'
                    value={roomZipCode}
                    onChangeText={text => setRoomZipCode(text)}
                    style={styles.input}
                    maxLength={5}/>
            </View>
            <View style={styles.inputContainer}>
                <Text>Food Type: </Text>
                    <TextInput
                    placeholder="e.g. burger"
                    value={foodType}
                    onChangeText={text => setFoodType(text)}
                    style={styles.input}/>
            </View>
            <View style= {{width: "90%", justifyContent: 'center', alignSelf: 'center'}}>
            <TextInput
                    placeholder="What do you prefer to eat?"
                    value={userPref}
                    onChangeText={text => setUserPreference(text)}
                    style={styles.input}/>
            </View>
            <View style={styles.flatList}>
                <Text style={styles.inGroupText}> Users in group: {userData.length}</Text>
                <FlatList 
                numColumns={3} 
                data= {userData}
                renderItem={renderItem} 
                keyExtractor={item =>item.id} 
                extraData={userData}/>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={()=>{setTimeout(() => {{getYelpData(), navigation.navigate("GroupSwipe", {roomCode}, {route})};}, 1000); getPreference()}}
                
                    style={styles.button}>
                    <Text style={styles.buttonText}>START THE</Text>
                    <Image source={require('../../assets/logo-transparent.png')}
                        style={{width: 150, height: 150}}/>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default GroupWaiting;

const styles = StyleSheet.create({
    safe:{
        flexDirection: "column",
        flex: 1,
    },
    roomId:{
        borderRadius: 30,
        borderWidth: 2,
        borderColor: '#EC3624',
        alignSelf: "flex-end",
        flex: 0,
        backgroundColor: '#EC3624',
        marginTop: 20,
        alignSelf: 'center',
    },
    buttonContainerHome:{
        width: '100%',
        justifyContent: 'flex-start',
        alignSelf: 'center',
        marginTop: 0,
    },
    roomIdText:{
        fontSize: 16,
        fontWeight: 'bold',
        alignSelf: 'baseline',
        padding: 10,
    },
    MainContainer: 
    {
        flex: 1,   
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#000000',
    },
    input:{
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginTop: 5,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 1,
        shadowRadius: 3,
    },
    inputContainer:{
        width: '90%',
        alignItems: 'center',
        margin: 10,
        justifyContent: 'center',
        flexDirection: 'row',
    },
    container: {
        flex:1,
        paddingTop:22
    },
    buttonContainerHome:{
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 0,
        flex: 0,
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
    note:{
        color: 'white',
        fontSize: 12,
    },
    groupText:{
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
        marginTop:50,
    },
    flatList:
    {
        flex: 0.8,
        marginTop: 5,
        justifyContent: 'center',
        alignItems:'center',
        borderRadius: 10,
        padding: 10,
    },
    inGroupText:
    {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 18,
        margin: 5,
        alignSelf: 'center',
    },
    title:
    {
        fontWeight: 'bold',
        fontSize: 16,
        color:'white'
    },
    item:{
        backgroundColor: '#24382a',
        padding: 15,
        borderRadius:30,
    },
    buttonContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 0,
        padding:10,
      },
    button: {
        backgroundColor: '#2b2b2b',
        width: '55%',
        padding: 15,
        borderRadius: 30,
        alignItems: 'center',
      },
      buttonText:{
        //color: 'white',
        fontWeight: 'bold',
        fontSize: 26,
        color:'#EC3624'
    },
})