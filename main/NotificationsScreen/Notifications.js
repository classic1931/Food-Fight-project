import { StyleSheet, Text, View, FlatList, Image} from 'react-native'
import React from 'react'

import styles from '../BillSplitterScreen/styles'

const Notifications = () => {
    const data=[
        {
            id: '58',
            post_title: 'Dessert',
            postimage: 'https://images-gmi-pmc.edge-generalmills.com/7c1096c7-bfd0-4806-a794-1d3001fe0063.jpg',
            post_city: 'newYork',
            username: 'Tom',
            notification: 'Liked your Post',
            time: '10:00',
        },
        {
          id: '57',
          post_title: 'Dessert',
          postimage: 'https://images-gmi-pmc.edge-generalmills.com/7c1096c7-bfd0-4806-a794-1d3001fe0063.jpg',
          post_city: 'newYork',
          username: 'Sarah',
          notification: 'Liked your Post',
          time: '9:00',
        },
        {
          id: '56',
          post_title: 'Dessert',
          postimage: 'https://images-gmi-pmc.edge-generalmills.com/7c1096c7-bfd0-4806-a794-1d3001fe0063.jpg',
          post_city: 'newYork',
          username: 'Brian',
          notification: 'Liked your Post',
          time: '8:50',
        },
        {
          id: '55',
          post_title: 'Dessert',
          postimage: 'https://images-gmi-pmc.edge-generalmills.com/7c1096c7-bfd0-4806-a794-1d3001fe0063.jpg',
          post_city: 'newYork',
          username: 'Sasha',
          notification: 'Liked your Post',
          time: '8:44',
        },
        {
          id: '54',
          post_title: 'Dessert',
          postimage: 'https://images-gmi-pmc.edge-generalmills.com/7c1096c7-bfd0-4806-a794-1d3001fe0063.jpg',
          post_city: 'newYork',
          username: 'Sierra',
          notification: 'Liked your Post',
          time: '8:43',
        },
        {
          id: '53',
          post_title: 'Dessert',
          postimage: 'https://images-gmi-pmc.edge-generalmills.com/7c1096c7-bfd0-4806-a794-1d3001fe0063.jpg',
          post_city: 'newYork',
          username: 'Zack',
          notification: 'Liked your Post',
          time: '8:40',
        },
        {
          id: '52',
          post_title: 'Dessert',
          postimage: 'https://images-gmi-pmc.edge-generalmills.com/7c1096c7-bfd0-4806-a794-1d3001fe0063.jpg',
          post_city: 'newYork',
          username: 'Drake',
          notification: 'Liked your Post',
          time: '8:37',
        },
        
    ]
  return (
    <View> 
        <FlatList
          data={data}
          keyExtractor={(item, index)=>{
              return index.toString();
            }}
          renderItem={({item})=>{
            return (
                <View style={styles.container} >
                    <View style ={styles.HeaderLeftImageView}>
                        <Image 
                        style = {styles.HeaderLeftImage}
                        source = {{uri: item.postimage}}
                        />
                </View>

                <View style = {{flexDirection: 'row', marginLeft: 10}}>
                <View>
                    <Text style = {{color: '#1B6ADF', fontSize: 15}}>
                        {item.username}
                    </Text>
                    <Text style = {{color: '#64676B'}}>{item.time}</Text>
                  </View>
                  <View>
                    <Text style={{color: '#64676B'}} >{item.notification}</Text>
                  </View>
                </View>
              </View>
            );
          }}
        />
    </View>
  );
};

export default Notifications;
