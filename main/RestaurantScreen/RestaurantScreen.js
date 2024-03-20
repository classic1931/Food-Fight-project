
import React, { useState ,useEffect} from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, Image, TextInput, View, TouchableOpacity, Pressable,Modal, SafeAreaView, FlatList, StatusBar, ScrollView, ActivityIndicator} from 'react-native'
//import { useBusinessSearch } from '../../yelp-api/useBusinessSearch';
import { useNavigation } from '@react-navigation/core';
import styles from './styles';
import { LinearGradient } from 'expo-linear-gradient';
import { db } from '../../firestore';
import { useBusinessSearch } from '../../yelp-api/useBusinessSearch';

//flatlist of yelp categories or restaurants?
const DATA = [
    {
        id: 1,
        category:"burgers",
    },
    {
        id: 2,
        category:"tacos",
    },
    {
        id: 3,
        category:"pizza",
    },
    {
        id: 4,
        category:"ice cream",
    },
    {
        id: 5,
        category:"steak",
    },
    {
        id: 6,
        category:"soup",
    },
    {
        id: 7,
        category:"chicken",
    },
    {
        id: 8,
        category:"chinese",
    },
    {
        id: 9,
        category:"bbq",
    },
    {
        id: 10,
        category:"italian",
    },
    {
        id: 11,
        category:"japanese",
    },
]
//businesses[] format
const businesses =  [
    //GET https://api.yelp.com/v3/businesses/search?term=delis&latitude=37.786882&longitude=-122.399972
    {
    "rating": 4.5,
    "price": "$$",
    "phone": "+14154212337",
    "id": "molinari-delicatessen-san-francisco",
    "categories": [
        {
        "alias": "delis",
        "title": "Delis"
        }
    ],
    "review_count": 910,
    "name": "Molinari Delicatessen",
    "url": "https://www.yelp.com/biz/molinari-delicatessen-san-francisco",
    "coordinates": {
        "latitude": 37.7983818054199,
        "longitude": -122.407821655273
    },
    "image_url": "http://s3-media4.fl.yelpcdn.com/bphoto/6He-NlZrAv2mDV-yg6jW3g/o.jpg",
    "location": {
        "city": "San Francisco",
        "country": "US",
        "address2": "",
        "address3": "",
        "state": "CA",
        "address1": "373 Columbus Ave",
        "zip_code": "94133"
    }
    },
    // ...
]

const RestaurantScreen = () => {
    const navigation = useNavigation();
    const [term, setTerm] = useState('');
    const [terms, setTerms] = useState([]);
    const [catSelect, setCatSelect] = useState([]);
    const [termText, setTermText] = useState('');
    const [locationParam, setLocParam]= useState('Los Angeles'); //LATER get user location
    const [businesses, amountResults, searchParams, setSearchParams] = useBusinessSearch(termText,locationParam);
    
    const ChangeLocation = ({ }) => {
        const [location, setLoc]= useState('');
        const [modalVisible, setModalVisible] = useState(false);
        return(
            <View>
                <View style={{flexDirection:'row', alignItems:'center',justifyContent:'space-evenly'}}>
                    <View style={{alignItems:'center', paddingHorizontal:10, marginTop:10}}>
                        <Text style={styles.commentText}>Location:  {locationParam}</Text>
                    </View>
                    
                    <TouchableOpacity
                        onPress={()=>{setModalVisible(true)}}                  
                        style={styles.button}>
                        {/* <LinearGradient
                            // Background Linear Gradient
                            colors={['#a8271b', 'transparent', '#942318']}
                            style={styles.buttonGradientLoc}
                        /> */}
                        <Text style={styles.buttonText}>Change Location</Text>
                    </TouchableOpacity>
                </View>
                
                            

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
                                onPress={() => {setModalVisible(!modalVisible);}}
                                >
                                <Text style={styles.captionText}>exit</Text>
                            </Pressable>

                                <TextInput
                                    placeholder="Enter location name or zipcode"
                                    placeholderTextColor={'grey'} 
                                    value={location}
                                    onChangeText={text => setLoc(text)}
                                    style={styles.input}
                                    />
                                    
                                <TouchableOpacity
                                    onPress={()=>{setLocParam(location)}}                  
                                    style={styles.button}>
                                    {/* <LinearGradient
                                        // Background Linear Gradient
                                        colors={['#a8271b', 'transparent', '#942318']}
                                        style={styles.buttonGradientLoc}
                                    /> */}
                                    <Text style={styles.buttonText}>Change Location</Text>
                                </TouchableOpacity>
                                
                            </View>
                        </View>
                </Modal>

            </View>
            
            

        )
    };
    
    // const writeBusiness = async() =>//must be async to use await
    // {   //add the new group to database
    //     let arr = [];
    //     for(let i = 0; i< 15; i++)
    //     {
    //         arr.push(0);
    //     }
    //     const writeBusinesses = await db.collection('group').doc('095SlJl72qVP4DcaD16f').update({total: 15, businessList: businesses.slice(0,15), votes: arr});
    //     //get the firebase generated doc name(id) for the created group reference (since doc name was not specified it has a unique name generated) so using as the group id
    // }
    const Restaurant = ({ title, location, image_url, rating, price, categories, id}) => (
        <View style={styles.restaurant}>
            <LinearGradient
                        // Background Linear Gradient
                        colors={['#363636', 'transparent', '#303030']}
                        style={styles.backgroundRes}
                    />
            <TouchableOpacity
                onPress={()=>{ navigation.navigate("RestaurantInfo",{restId: id});}}>
                <Image 
                    style={{width: 325, height: 325,borderRadius:30}}
                    source={{uri: image_url,}}/>
                
                <Text style={styles.text}>{title}</Text>
                <Text style={styles.title}>{categories[0].title}</Text>
                <Text style={styles.title}>{location.address1}</Text>
                <Text style={styles.title}>{location.city}</Text>
                <Text style={styles.title}>{location.zip_code}</Text>
                <Text style={styles.title}>price: {price}   rating: {rating}</Text>
            </TouchableOpacity>
            
        </View>
    );
    const SelectedItem = ({ title }) => (
        <View style={styles.buttonCat}>
            <TouchableOpacity
                onPress={()=>{removeCat(title)}}>
                <Text style={styles.title}>{title}</Text>
            </TouchableOpacity>
          
        </View>
    );
    async function removeCat(cat)
    {
        console.log("remove term");
        if (terms.length == 1)
        {
            console.log("terms.length: ",terms.length);
            setTerms([]);
            //formatSelectCats();
            console.log("terms is []",terms);
            //refreshBusinesses();
        }
        else
        {
            //let index = terms.index(where: {$0["category"] as! String == cat});
            let index = terms.findIndex(obj => obj.category === cat); 
            index = catSelect.findIndex(obj => obj.category === cat);//find index for category
            console.log("Index: ",cat, index);
            if (index != -1)
            {
                //terms.splice(index,1);
                //console.log("before splice",terms) ;
                console.log("spliced",terms.splice(index,1));
                setTerms(terms);
                
                formatSelectCats();
                console.log("Remove Cat", cat);
                console.log(terms) ;
                //refreshBusinesses();
            }
            
        }
        
    }
    const Item = ({ title }) => (
        <View style={styles.item}>
            <TouchableOpacity
                onPress={()=>{
                    setTerm(title)
                    //addTerm;
                    }}>
                <Text style={styles.title}>{title}</Text>
            </TouchableOpacity>
          
        </View>
      );
     
    //ADD a new term to the list of terms (does not directly affect category buttons, see formatSelectCats)  
    const addTerm = async() => {
        
        if(term != '')
        {//search term is not ''
            if(terms.length != 0)
            {//not the first term added
                let index = catSelect.findIndex(obj => obj.category === term);
                console.log(term, index);
                if(index == -1 )
                {//the term is not in array yet
                    setTerms(terms => [...terms, term]);
                    //formatSelectCats();
                    setTerm('');
                    //refreshBusinesses();
                }
            }    
            else
            {//if this is the first term to be added to the list
                setTerms([term]);
                //console.log("term",term);
                //formatSelectCats();
                //console.log(terms);
                setTerm('');
                //refreshBusinesses();
                
            }
        }
        else
        {
            setSearchParams({term:termText, location:locationParam} );
        }   
    };
    async function refreshBusinesses()
    {
        let text ='';
        if(terms.length > 0)
        {
            for(let i = 0; i < terms.length; i++)
            {
                if(terms[i] != '' && terms[i] != null)
                {
                    if(i != 0)
                    {
                        text += ",";
                    }
                    text += terms[i].replace(/ /g, '');
                }
            }
        }
        setTermText(text);
        console.log("term text:", termText);
        setSearchParams( {term:termText, location:locationParam} );
        //setSearchParams(termText);
        console.log("searchparams:",searchParams);
        //console.log("terms:",terms);
        //console.log("Businesses:",businesses);
        //console.log(businesses[0]);
    }

    async function formatSelectCats()
    {
        console.log("terms before format", terms);
        let cats = [];
        for(let i = 0; i<terms.length; i++)
        {
            cats.push({id: i, category: terms[i]});
        }
        //console.log("Cats:",cats);
        setCatSelect(cats);        
    };

    const renderItem = ({ item }) => (
        <Item title={item.category} />
    );
        
    
    useEffect(() => {
        console.log("terms",terms);
        formatSelectCats();
        //console.log("Catselect:",catSelect);        
    }, [terms]);

    useEffect(() => {
        refreshBusinesses();
    }, [catSelect]);
    useEffect(() => {
        setSearchParams({term:termText, location:locationParam} );
    }, [termText]);
    
    useEffect(()=>{
        console.log("Location changed to ", locationParam);
        setSearchParams({term:termText, location:locationParam} );
    },[locationParam]);
    useEffect(() => {
        //console.log("terms",terms);
        //formatSelectCats();
    }, [businesses]);

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
            
            {/* <ScrollView style={styles.scrollView}> */}
            <View style={{flexDirection:"row"}}> 
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="What type of food would you like?"
                        placeholderTextColor={'grey'} 
                        value={term}
                        onChangeText={text => setTerm(text)}
                        style={styles.input}
                    />
                </View>
                <TouchableOpacity
                        onPress={addTerm}
                        style={styles.button}>
                    {/* <LinearGradient
                        // Background Linear Gradient
                        colors={['#a8271b', 'transparent', '#942318']}
                        style={styles.buttonGradient}
                    /> */}
                    <Text style={styles.buttonText}>Add to Search</Text>
                </TouchableOpacity>
            </View>
            <ChangeLocation/>
             {/* <View style={styles.button}>
                    <Text style={styles.buttonText}>{termText}</Text>
                </View> */}
                {/* for chosen categories buttons */}
                <View style={styles.catList}>
                    <View style={{justifyContent:'center', alignItems:'center', marginLeft:15}}> 
                        <Text style={styles.title}>Selected:</Text>
                    </View>
                    <FlatList nestedScrollEnabled={true}
                        horizontal
                        data= {catSelect}
                        renderItem={({ item }) => (
                            <SelectedItem title={item.category}/>
                        )} 
                        keyExtractor={item =>item.id} 
                        //keyExtractor={(item, index) => index.toString()}
                        extraData={catSelect}
                        />
                </View>
                {/*Selectable categories  */}
            <View style={styles.flatList}>
                <FlatList nestedScrollEnabled={true}
                    numColumns={4} 
                    data= {DATA}
                    renderItem={renderItem} 
                    keyExtractor={item =>item.id} 
                    extraData={DATA}
                    />
            </View>

            <View style={styles.restaurantFlatlist}>
                <FlatList nestedScrollEnabled                                                                                                                                                            
                        numColumns={1} 
                        data= {businesses}
                        renderItem={({ item }) => (
                            <Restaurant title={item.name} location={item.location} image_url = {item.image_url}
                                rating={item.rating} price={item.price} categories={item.categories} id ={item.id}/>
                            )} 
                        keyExtractor={item => item.id} 
                        extraData={businesses}
                />
            </View>
                  
            
            {/* </ScrollView> */}
            

        </View>
  );
    
}

export default RestaurantScreen;

