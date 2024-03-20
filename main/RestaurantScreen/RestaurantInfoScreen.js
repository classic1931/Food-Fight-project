
import React, { useState ,useEffect} from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, Image, ImageBackground, TextInput, View, TouchableOpacity, Pressable, SafeAreaView, FlatList, StatusBar, ScrollView, ActivityIndicator, Modal, Alert, Dimensions} from 'react-native'
//import { useBusinessSearch } from '../../yelp-api/useBusinessSearch';
import { useNavigation } from '@react-navigation/core';
import styles from './styles';
import { LinearGradient } from 'expo-linear-gradient';
import { db, auth, storage } from '../../firestore';
import { useBusinessSearch } from '../../yelp-api/useBusinessSearch';
import { getBusiness } from '../../yelp-api/getBusiness';
import firebase from "firebase";
import {ref, uploadBytes} from "firebase/storage";
import * as ImagePicker from 'expo-image-picker';


//used if unable to connect to yelp  
const bizDetails = 
{
  "alias": "howlin-rays-los-angeles-3",
  "categories": [
    {
      "alias": "southern",
      "title": "Southern",
    },
     {
      "alias": "chickenshop",
      "title": "Chicken Shop",
    },
     {
      "alias": "tradamerican",
      "title": "American (Traditional)",
    },
  ],
  "coordinates": {
    "latitude": 34.061517,
    "longitude": -118.239716,
  },
  "display_phone": "(213) 935-8399",
  "hours": [
    {
      "hours_type": "REGULAR",
      "is_open_now": false,
      "open":  [
        {
          "day": 2,
          "end": "1900",
          "is_overnight": false,
          "start": "1000",
        },
        {
          "day": 3,
          "end": "1900",
          "is_overnight": false,
          "start": "1000",
        },
        {
          "day": 4,
          "end": "1900",
          "is_overnight": false,
          "start": "1000",
        },
        {
          "day": 5,
          "end": "1900",
          "is_overnight": false,
          "start": "1000",
        },
        {
          "day": 6,
          "end": "1900",
          "is_overnight": false,
          "start": "1000",
        },
      ],
    },
  ],
  "id": "7O1ORGY36A-2aIENyaJWPg",
  "image_url": "https://s3-media4.fl.yelpcdn.com/bphoto/jjUd-rw3if3Ia1YkVrW-yQ/o.jpg",
  "is_claimed": true,
  "is_closed": false,
  "location": {
    "address1": "727 N Broadway",
    "address2": "Ste 128",
    "address3": "",
    "city": "Los Angeles",
    "country": "US",
    "cross_streets": "",
    "display_address": [
      "727 N Broadway",
      "Ste 128",
      "Los Angeles, CA 90012",
    ],
    "state": "CA",
    "zip_code": "90012",
  },
  "name": "Howlin' Ray's",
  "phone": "+12139358399",
  "photos": [
    "https://s3-media4.fl.yelpcdn.com/bphoto/jjUd-rw3if3Ia1YkVrW-yQ/o.jpg",
    "https://s3-media4.fl.yelpcdn.com/bphoto/hxW_ZPbPKJVDoVAFIrwUFA/o.jpg",
    "https://s3-media4.fl.yelpcdn.com/bphoto/MJUkD3lWR3-2hO7fZsg_0g/o.jpg",
  ],
  "price": "$$",
  "rating": 4.5,
  "review_count": 7013,
  "transactions": [
    "delivery",
  ],
  "url": "https://www.yelp.com/biz/howlin-rays-los-angeles-3?adjust_creative=Ra6-03v2rFlQMSE7_amkXQ&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_lookup&utm_source=Ra6-03v2rFlQMSE7_amkXQ",
};
    

const RestaurantInfoScreen = ({navigation, route}) => {
  //const navigation = useNavigation();
  //const [modalVisible, setModalVisible] = useState(false);
  //let modalsVis = [];
  const currentUser = firebase.auth().currentUser;
  const [uName, setUName] = useState('NONAME');
  const [restData, setRestData] = useState(bizDetails);
  let yelpData = bizDetails;
  const fromYelp = getBusiness(route.params.restId);
  const [commenting, setCommenting] = useState(false);
  const restaurId = route.params.restId;
  //const fromYelp = getBusiness(route.params.restId);
  // const [yelpData, setYelpData] = useState();
  
  if(fromYelp == undefined)
  {
    yelpData = bizDetails;
    //Alert.alert('Alert', 'Yelp not accessible at this time.');
  }
  else
  {
    yelpData = fromYelp;
    console.log("used yelp data", route.params.restId);
  }
  
  let postList = [];
  const [posts, setPosts] = useState();
  const [comments, setComments] = useState([{comment:"nothing here yet", rating:"-"}]);


  
  const getUsername = async() => 
  {
    const userRef = db.collection('users').doc(currentUser.uid);
    const doc = await userRef.get();
    setUName(doc.data().username);
  };
  getUsername();
  console.log("username",uName);

  const getRestaurant = async() => 
  {
      const restRef = db.collection('restaurants').doc(route.params.restId);
      const doc = await restRef.get();
      //console.log(doc.data());
      if (!doc.exists) {
        console.log("No restaurant data")
        addRestaurantDB();
      } else {//found doc
        console.log('Document data found:');
        setRestData(doc.data());
        //console.log(yelpData);
        setComments(doc.data().comments);
          
      }
  }
  const addRestaurantDB = async() =>
  {
    const newRest = await db.collection('restaurants').doc(route.params.restId).set({id:route.params.restId,comments:[{comment:"",rating:'-',id:0}]});
  }
  const getPosts = async() =>
  {
      const postsRef = db.collection('posts');
      const snapshot = await postsRef.where('restId', '==', route.params.restId).get();
      if (snapshot.empty) {
          console.log('No matching documents.');
          return;
      }  

      snapshot.forEach(doc => {
          postList.push(doc.data());
      });
      setPosts(postList);
      
  }
  
  useEffect(() => {
      getRestaurant();
      getPosts();
      
  }, []);
  useEffect(() => {
    console.log("commenting",commenting);
    getRestaurant();
  }, [commenting]);
  useEffect(() => {
    
  }, [restData]);

  const renderItem = ({ item }) => (
    <Item title={item.title} />
  );
  const Item = ({ title }) => (
    <View style={styles.category}>
        <Text style={styles.commentText}>{title}</Text>
    </View>
    );
  
  function dayOfWeek(dayNum) 
  {
    let day = "NONE";
    switch (dayNum) {
      case 0:
        day = "Monday";
        break;
      case 1:
          day = "Tuesday";
        break;
      case 2:
        day = "Wednesday";
        break;
      case 3:
        day = "Thursday";
        break;
      case 4:
        day = "Friday";
        break;
      case 5:
        day = "Saturday";
        break;
      case 6:
        day = "Sunday";
        break;
    }
    return(day);
  };
  // Yelp hours format hours[x].open[x].start 
  // "start": "1730",
  // "end": "2200",
  function getHours(time)
  {
    let hr = time.slice(0,2);
    let ampm = " AM";
    if ( parseInt(hr) > 12)
    {
      hr = (parseInt(hr) - 12).toString();
      ampm = " PM"
    }
    return(hr + ":" + time.slice(2,4)+ampm);
  }
  const Hours = ({ day, start, end }) => (
    <View style={styles.hours}>
        <Text style={styles.title}>{dayOfWeek(day)}: </Text>
        <Text style={styles.commentText}>{getHours(start)} - {getHours(end)} </Text>
    </View>
  );
  
  const PostImage = ({ url, caption}) => {
    const [modalVisible, setModalVisible] = useState(false);
    return(
    <View style={styles.container}>
      <TouchableOpacity style={styles.postPrev}
        onPress={() => setModalVisible(true)}>
        <Image 
            style={{width: 125, height: 125,borderRadius:30}}
            source={{uri: url,}}/>
        <Text style={styles.buttonText}>{caption}</Text>
      </TouchableOpacity>

      <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modal}>
              {/* MDOAL VIEW */}
              {/* BOTTON TO CLOSE MODAL */}
              <Pressable
                style={[styles.buttonHide]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.captionText}>Hide</Text>
              </Pressable>

              <Image 
                style={{width: 350, height: 350, borderRadius:0, marginTop:0,}}
                source={{uri: url,}}
                />
              <Text style={styles.captionText}>{caption}</Text>
              
            </View>
          </View>
        </Modal>  
    </View>
    )};

    const AddComment = () =>
    { const [comment, setComment] = useState('');
      const [rating, setRating] = useState('');
      const [modalVisible, setModalVisible] = useState(false);
      const [image, setImage] = useState(null);
      const [hasGalleryPermission, sethasGalleryPermission] = useState(null);

      let url = "";
      const getPictureBlob = (image) => {
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
      const uploadImage = async () => {
        let blob;
        try {
          blob = await getPictureBlob(image);
          const ref = firebase.storage().ref().child('restaurantImages/'+ route.params.restId +'/commentpic/' + currentUser.uid+comments.length);
          const snapshot = await ref.put(blob);
          return await snapshot.ref.getDownloadURL();
        } catch (e) {
          alert(e.message);
        } finally {
            blob.close();
        }
      }
    
      const addCommentBase = async() =>//must be async to use await
      {   //reference to the specific restaurant doc
          const restComRef = await db.collection('restaurants').doc(route.params.restId);
          const doc = await restComRef.get();
          if(rating <=5 && rating >=0 && rating != '')
          {
            if(comment!= '')
            {
              
              if(image != null)
                {
                 url = await uploadImage();                  
                }
                console.log("url", url);
              if(doc.data().comments[0].comment == "")
              {
                
                const res = await restComRef.set({comments:[{comment:comment,id:doc.data().comments.length, imageUrl:url, user:uName, rating: rating}]});
              }
              else
              {
                const res = await restComRef.update({comments: firebase.firestore.FieldValue.arrayUnion({comment:comment,id:doc.data().comments.length +1, imageUrl:url, user:uName, rating: rating})});
              }
              
              setModalVisible(false); setCommenting(true);setCommenting(false);
            }
            else
            {
              Alert.alert('Alert', 'No comment to add. Please enter a comment?');
            }
          }
          else
          {
            Alert.alert('Alert', 'Please enter a number from 0 - 5');
          }
          
      };
      
      useEffect(() => { 
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
            //aspect: [3, 3],
            quality: 1,
        });
    
        if (!result.cancelled) {
            setImage(result.uri);
        }
      };
      return(        
        <View style={styles.buttonAdd}>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}>
            <Text style={styles.title}>Add Comment</Text>                
          </TouchableOpacity>

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => 
            {
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modal}>
                {/* MDOAL VIEW */}
                {/* BOTTON TO CLOSE MODAL */}
                <Pressable
                  style={[styles.buttonHide]}
                  onPress={() => {setModalVisible(!modalVisible); setCommenting(false);}}
                >
                  <Text style={styles.captionText}>exit</Text>
                </Pressable>

                <TouchableOpacity onPress={() => pickImage()}>
                  <View style={{
                        height: 125,
                        width: 125,
                        borderRadius: 15,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <ImageBackground source={{
                        uri: image ? image : 'https://i.pinimg.com/474x/65/25/a0/6525a08f1df98a2e3a545fe2ace4be47.jpg'
                    }}
                        style={{ height: 125, width: 125 }}
                        // imageStyle={{ borderRadius: 15 }}
                    >
                        
                    </ImageBackground>
                  </View>
                </TouchableOpacity>
                <Text style={styles.captionText}>Comment:</Text>

                <View style={styles.inputCommentContainer}>
                  <TextInput
                    multiline={true}
                    textAlignVertical={'top'}
                    placeholder="Type comment here"
                    placeholderTextColor={'grey'} 
                    value={comment}
                    onChangeText={text => setComment(text)}
                    style={styles.inputComment}
                  />
                </View>
                <Text style={styles.captionText}>Rating:</Text>
                <View style={styles.inputContainer}>
                  <TextInput
      
                    textAlignVertical={'top'}
                    placeholder="Type rating 0-5"
                    placeholderTextColor={'grey'} 
                    value={rating}
                    onChangeText={text => setRating(text)}
                    style={styles.input}
                  />
                </View>
                {/*ADD COMMENT*/}
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    onPress={addCommentBase}                  
                    style={styles.button}>
                    <Text style={styles.buttonText}>Add Comment</Text>
                  </TouchableOpacity>
                </View>
              
              </View>
            </View>
          </Modal>
        </View>
      )
    };


    const Comments = ({ rating, comment, url, user }) => {
      const [modalVisible, setModalVisible] = useState(false);
      let cmnt= "nothing here yet :( Be the first to add a comment!";
      let rtg = '-';      

      if(comment != '' ||comment == undefined)
      {
        rtg = rating;
        cmnt= comment;
      }
      return(
      <View style={styles.comments}>
        <LinearGradient
          // Background Linear Gradient
          colors={['#363636', 'transparent']}
          style={styles.backgroundObj}
        />
        <Text style={styles.userNameText}>{user}  {rtg}/5</Text>
        <Text style={styles.commentText}>{cmnt}</Text>

        <TouchableOpacity
          onPress={() => setModalVisible(true)}>
          <Image 
              style={{width: 80, height: 80,borderRadius:30 , alignItems:'center'}}
              source={{uri: url,}}/>
                
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modal}>
              {/* MDOAL VIEW */}
              {/* BOTTON TO CLOSE MODAL */}
              <Pressable
                style={[styles.buttonHide]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.captionText}>Hide</Text>
              </Pressable>

              <Image 
                style={{width: 350, height: 350, borderRadius:0, marginTop:0, }}
                source={{uri: url,}}/>
              <Text style={styles.userNameText}>{user}  {rtg}/5</Text>
            </View>
          </View>
        </Modal>
          
      </View>
      )
    };
  
  return (
    <View style = {styles.MainContainer}>
      <StatusBar hidden />
      {/* top red banner */}
      <View style={styles.buttonContainerHome}>
        <TouchableOpacity
          onPress={()=>{ navigation.navigate("Activity");}}
          style={styles.buttonHome}>
          <Text style={styles.buttonTextHome}>FOOD FIGHT</Text>
        </TouchableOpacity>
      </View>

      <LinearGradient
          // Background Linear Gradient
          colors={['#000000', 'transparent']}
          style={styles.background}
      />
      <View>
        <ScrollView>
          <View style={styles.container}>
            <Image 
                style={{width: 325, height: 250,borderRadius:30}}
                source={{uri: yelpData.image_url,}}/>
            <Text style={styles.text}>{yelpData.name}</Text>
            <Text style={styles.title}>{yelpData.location.display_address[0]} {yelpData.location.display_address[1]}</Text>
            <Text style={styles.title}>{yelpData.location.display_address[2]}</Text>
            <Text style={styles.title}>{yelpData.display_phone}</Text>
            <Text style={styles.title}>price: {yelpData.price}   rating: {yelpData.rating}</Text>
            
            {/* CATEGORIES */}
            <FlatList nestedScrollEnabled={true}
              horizontal
              data= {yelpData.categories}
              renderItem={renderItem}
              keyExtractor={item =>item.alias} 
              //keyExtractor={(item, index) => index.toString()}
              // extraData={posts}
              />
          </View>

          {/* DISPLAY HOURS */}
          <View style={styles.container}>
            <View style={styles.hoursContainer}>
              <LinearGradient
                // Background Linear Gradient
                colors={['#363636', 'transparent']}
                style={styles.backgroundObj}
                />
                <Text style={styles.title}>Hours:</Text>
              <FlatList nestedScrollEnabled={true}
                      data= {yelpData.hours[0].open}
                      renderItem={({ item }) => (
                          <Hours day={item.day} start={item.start} end={item.end}/>)} 
                      keyExtractor={item => item.day}/>
            </View>
          </View>
          
                
          {/* IMAGES FLATLIST */}
          <View style={{justifyContent:'center',alignItems:'center'}}>
            <Text style={styles.title}>  User Posts</Text>
              
              <ScrollView horizontal={true}>
                  <View>
                    <FlatList nestedScrollEnabled={true}
                        horizontal
                        data= {posts}
                        renderItem={({ item }) => (
                            <PostImage url={item.imageUrl} caption={item.caption}/>
                        )} 
                        keyExtractor={item =>item.docId} 
                        //keyExtractor={(item, index) => index.toString()}
                        // extraData={posts}
                    />
                  </View>
                  
                
                <View style={{justifyContent:'center',alignItems:'center'}}>                  
                  <TouchableOpacity
                      onPress={()=>{ navigation.navigate("CreatePostScreen", {restId:restaurId});}}>
                      <View style={styles.addPost}>
                        <LinearGradient
                            // Background Linear Gradient
                            colors={['#363636', 'transparent', '#303030']}
                            style={styles.backgroundAddPost}
                        />
                        <Text style={styles.buttonText}>add a post</Text>
                      </View>                        
                    </TouchableOpacity>      
                </View>
              </ScrollView>
          </View>

          {/* COMMENTS FLATLIST */}
          <View style={styles.restComments}>
            
            <Text style={styles.title}>  Comments</Text>
            <FlatList nestedScrollEnabled={true}
                data= {comments}
                renderItem={({ item }) => (
                    <Comments comment={item.comment} rating={item.rating} url={item.imageUrl} user={item.user}/>)} 
                keyExtractor={item => item.id}/>
            <AddComment/>
          </View>
          

        </ScrollView>
    </View>
    </View>
  );
    
}

export default RestaurantInfoScreen;