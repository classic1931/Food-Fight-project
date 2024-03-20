import React from 'react'
import {
    SafeAreaView,
    StyleSheet
} from 'react-native'
import AddNewPost from './AddNewPost';

const CreatePostScreen = ({
    navigation, route
}) => {
    return ( 
        <SafeAreaView style = { styles.container} >
            <AddNewPost navigation = {navigation} restaurId={route.params.restId}/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1
    }
})

export default CreatePostScreen;