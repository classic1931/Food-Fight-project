import { KeyboardAvoidingView, StyleSheet, Text, Image, 
    TextInput, View, FlatList, SafeAreaView, TouchableOpacity} from 'react-native';
import React, { useState } from 'react';
import { db } from "../../../firestore";
import styles from './styles';

const Search = ({navigation}) => {
    const [users, setUsers] = useState([])

    const fetchUsers = (search) => {
         db.collection('users')
         .where('username', '>=', search)
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
    return (
       <SafeAreaView style={{ height: 600 }}>
           <Text style = {styles.title}> FOOD FIGHT SEARCH</Text>
           <TextInput
                style = {styles.searchBar}
                placeholder = "Type Here"
                placeholderTextColor= 'white'
                onChangeText={(search) => fetchUsers(search)}/>
           <FlatList
                numColumns={1}
                horizontal ={false}
                data = {users}
                renderItem = {({item}) => (
                    <TouchableOpacity onPress= {() => navigation.navigate("Other Profile", {uid: item.id}) } >
                        <Text style = {{color: 'black', fontSize: 20}}>{item.username}</Text>
                    </TouchableOpacity>

                )}
           />
       </SafeAreaView>
    )
}

export default Search;
