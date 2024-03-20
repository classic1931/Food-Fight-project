import * as React from 'react';
import {StyleSheet} from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator } from '@react-navigation/native-stack';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import FontAwesome from 'react-native-vector-icons/FontAwesome';

// Login Screens
import LoginScreen from './main/LoginScreens/LoginScreen';
import CreateProfileScreen from './main/LoginScreens/CreateProfileScreen';
import SignUpScreen from './main/LoginScreens/SignUpScreen';
import ForgotPasswordScreen from './main/LoginScreens/ForgotPasswordScreen';
// Group Screens
import GroupStart from './main/GroupScreens/GroupStart';
import GroupWaiting from './main/GroupScreens/GroupWaiting';
import JoinGroupScreen from './main/GroupScreens/JoinGroupScreen';
import GroupSwipe from './main/GroupScreens/GroupSwipe';
import Results from './main/GroupScreens/Results';

// Home Screens
import HomeScreen from './main/HomeScreen/HomeScreen';
import CreatePostScreen from './main/HomeScreen/CreatePostScreen';

// Profile Screens
import ProfileScreen from './main/ProfileScreens/ProfileScreen/ProfileScreen';
import OtherProfileScreen from './main/ProfileScreens/ProfileScreen/OtherProfileScreen';
import EditProfileScreen from './main/ProfileScreens/EditProfileScreen/EditProfileScreen';
import FollowingScreen from './main/ProfileScreens/ProfileScreen/FollowingScreen';
import FollowersScreen from './main/ProfileScreens/ProfileScreen/FollowersScreen';
import Search from './main/ProfileScreens/ProfileScreen/Search';

import BillSplitterScreen from './main/BillSplitterScreen/BillSplitterScreen';
import RestaurantScreen from './main/RestaurantScreen/RestaurantScreen';
import RestaurantInfoScreen from './main/RestaurantScreen/RestaurantInfoScreen';
import AnotherScreen from './main/HomeScreen/AnotherScreen';
import Notifications from './main/NotificationsScreen/Notifications';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function UserTabs() {
  return (
    <Tab.Navigator screenOptions={{tabBarActiveTintColor: "#302f90", tabBarLabelStyle: {fontSize: 11, fontWeight: "bold"}}}>
        <Tab.Screen name="Restaurant" component={RestaurantStack} options={{ headerShown: false, tabBarIcon: () => (
            <FontAwesome name="building" color="#333333" size={25}/>),}}/>
        <Tab.Screen name="Activity" component={HomeStack} options={{headerShown: false, tabBarIcon: () => (
            <FontAwesome name="home" color="#333333" size={25}/>),}}/>
        <Tab.Screen name="Profile" component={ProfileStack} options={{headerShown: false, tabBarIcon: () => (
            <FontAwesome name="user" color="#333333" size={25}/>),}}/>
        <Tab.Screen name="Food Fight" component={GroupStack} options={{headerShown: false, tabBarIcon: () => (
            <FontAwesome name="apple" color="#333333" size={25}/>),}}/>
        <Tab.Screen name="Bill Splitter" component={BillSplitterScreen} options={{ tabBarIcon: () => (
            <FontAwesome name="calculator" color="#333333" size={25}/>),}}/>
    </Tab.Navigator>
  );
}

function HomeStack() {
  return (
    <Stack.Navigator initialRouteName="HomeScreen" screenOptions={{headerShown: false}}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown: false, gestureEnabled: false}}/>
      <Stack.Screen name="PostScreen" component={CreatePostScreen} options={{headerShown: false, gestureEnabled: false}}/>
      <Stack.Screen name="Notifications" component={Notifications} options={{headerShown: false}} /> 
    </Stack.Navigator>
  )
}

function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Main Profile" component={ProfileScreen} options={{headerShown: false}} />
      <Stack.Screen name="Other Profile" component={OtherProfileScreen} options={{headerShown: false}} />
      <Stack.Screen name="Edit Profile" component={EditProfileScreen} options={{headerShown: false}} /> 
      <Stack.Screen name="Following" component={FollowingScreen} options={{headerShown: false}} /> 
      <Stack.Screen name="Followers" component={FollowersScreen} options={{headerShown: false}} /> 
      <Stack.Screen name="Search" component={Search} options={{headerShown: false}} /> 
    </Stack.Navigator>
  );
}

function GroupStack() {
  return (
    <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false}} name= "GroupStart" component={GroupStart}/>
        <Stack.Screen options={{ headerShown: false}} name= "JoinGroup" component= {JoinGroupScreen}/>
        <Stack.Screen options={{ headerShown: false}} name= "GroupWait" component={GroupWaiting}/>
        <Stack.Screen options={{ headerShown: false}} name= "GroupSwipe" component={GroupSwipe}/>
        <Stack.Screen options={{ headerShown: false}} name= "Results" component={Results}/>
    </Stack.Navigator>
  );
}

function RestaurantStack(){
  return(
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false}} name = "RestaurantScreen" component={RestaurantScreen}/>
      <Stack.Screen options={{ headerShown: false}} name = "RestaurantInfo" component={RestaurantInfoScreen}/> 
      <Stack.Screen name="CreatePostScreen" component={CreatePostScreen} options={{headerShown: false, gestureEnabled: false}}/>     
    </Stack.Navigator>
  )
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Sign Up" component={SignUpScreen} />
        <Stack.Screen name="Create Profile" component={CreateProfileScreen}/>
        <Stack.Screen name="Forgot Password" component={ForgotPasswordScreen} />
        <Stack.Screen name="UserTabs" component={UserTabs} options={{headerShown: false}}/>  
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
