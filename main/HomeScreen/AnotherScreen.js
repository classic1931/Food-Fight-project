import React, { useState, useEffect } from 'react';
import {SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity, FlatList, TextInput, ScrollView, Alert, RefreshControl} from 'react-native';
import { db } from "../../firestore";
import Icon from 'react-native-vector-icons/Ionicons';

const AnotherScreen = ({navigation}) => {
    const [posts, setPosts] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    let postCollection = [];

    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }

    const getPosts = async() =>
    {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
        const postsRef = db.collection('posts');
        const snapshot = await postsRef.get();
        if (snapshot.empty) {
            console.log('No matching documents.');
            return;
        }  

        snapshot.forEach(doc => {
            console.log(doc.id, '=>', doc.data());
            postCollection.push(doc.data());
        });
        setPosts(postCollection);
        console.log("ONE TIME")
        // console.log(postCollection)
        
    }
    useEffect(() => {
        // fetchPosts();
        getPosts();
    }, []);

    const renderItem = ({ item }) => (
        <Item title={item.title} />
    );
    
    const Item = ({ title }) => (
        <View style={styles.item}>
            <Text style={styles.title}>{title}</Text>
        </View>
    );

    const deletePost = async(docId) => {
        try {
            await db.collection('posts').doc(docId).delete();
            Alert.alert('Post has been deleted!');
            console.log("Post Deleted!")
        }
        catch (err) {
            Alert.alert('There is something wrong!', err.message);
        }
        navigation.navigate('HomeScreen')
    }

    const PostObject = ({photo, profile, user, caption, location, likes, menuItem, docId}) => (
    // Post Header
    <View style = {styles.container}>  
        <View style = {{flexDirection: 'row', justifyContent: 'space-between', margin: 5, alignItems: 'center'}}>
            <View style = {{flexDirection: 'row', alignItems: 'center'}}>
                <Image source = {{uri: profile}} style = {styles.story}/>
                <View>
                    <Text style = {{color: 'black', marginLeft: 5, fontWeight: '700'}}>
                        {user}
                    </Text>
                    <Text style = {{color: 'black', marginLeft: 5, fontWeight: '400', fontSize: 12}}>
                        {location}
                    </Text>
                </View>
            </View>
            <TouchableOpacity onPress={() => {deletePost(docId)}}>
                <Icon style = {styles.icon} name = "close-outline" size = {20} color = "#000" />
            </TouchableOpacity> 
        </View>
        {/* PostImage */}
        <View style = {{width: '100%', height: 450}}>
                <Image source = {{uri: photo}} style = {{height: '100%', resizeMode: 'cover'}}/>
        </View>
        {/* PostFooter */}
        <View style = {{marginHorizontal: 10, marginTop: 10, marginBottom: 10}}>

            <View style = {{flexDirection: 'row'}}>
                <View style = {{flexDirection: 'row', width: "20%", justifyContent: 'space-between'}}>
                    <TouchableOpacity>
                        <Icon name = "heart-outline" size = {30} color = "#000" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Icon name = "chatbubble-outline" size = {27} color = "#000" />
                    </TouchableOpacity>
                </View>
                <View style = {{flex: 1, alignItems: 'flex-end'}}>
                <TouchableOpacity>
                        <Icon name = "bookmark-outline" size = {30} color = "#000" />
                </TouchableOpacity>
                </View>
            </View>
            {/* PostCaption */}
            <View style = {{flexDirection: 'row', marginTop: 5}}>
                <Text style = {{color: 'black', flexWrap: 'wrap', flex: 1}}>
                    <Text style = {{fontWeight: '600'}}>
                        {user} {""}              
                    </Text>
                    <Text>
                        {caption}  
                    </Text>
                </Text>
            </View>
        </View>
    </View>   
    )

    return ( 
    <SafeAreaView style = {styles.container}>
        <View style = {styles.container}>
            <FlatList nestedScrollEnabled={true}
                data= {posts}
                refreshing={refreshing}
                onRefresh={getPosts}
                renderItem={({ item }) => (
                        <PostObject photo={item.imageUrl} 
                                    profile={item.userPic}
                                    user={item.user} 
                                    caption={item.caption} 
                                    likes={item.likes}
                                    docId={item.docId}
                                    location={item.location}
                                    menuItem={item.menuItem}/>
                )} 
                keyExtractor={item =>item.docId} 
            />
        </View>
    </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    story: {
        width: 35,
        height: 35,
        marginLeft: 6,
        borderWidth: 1.6,
        borderColor: '#ff8501',
        borderRadius: 35,
    },
    icon: {
        width: 20,
        height: 20,
        marginLeft: 10
    },
    shareicon: {
        transform: [{
            rotate: '320deg'
        }],
        marginTop: -3,
    },
})

export default AnotherScreen;