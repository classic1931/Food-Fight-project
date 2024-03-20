import React from 'react';
import {
    StyleSheet,
    SafeAreaView,
} from 'react-native';
import Header from './Header';
import AnotherScreen from './AnotherScreen';

const HomeScreen = ({navigation}) => {
    return (
    <SafeAreaView style = {styles.container}>
            <Header navigation = {navigation}/>
            <AnotherScreen navigation = {navigation}/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    }
})

export default HomeScreen;