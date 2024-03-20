import { LinearGradient } from 'expo-linear-gradient';
import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    safe: {
        flexDirection: "column",
        // backgroundColor: 'transparent',
        flex: 1,
    },
    GroupOfRest:{
        margin: 20,
    },
    Restaurants: {
        borderRadius: 3,
        borderWidth: 15,
        borderColor: '#EFEFEF',
        // alignSelf: "center",
        flex: 0,
        backgroundColor: '#EFEFEF',
        margin: 15,
    },
    RestaurantsText: {
        fontSize: 18,
        textTransform: 'uppercase',
        color: '#565656',
        fontWeight: 'bold',
        alignSelf: 'baseline',
    },
    firstOption: {
        fontSize: 18,
        color: '#FC0000',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        alignSelf: 'baseline',
    },
    buttonContainerHome: {
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 0,
        flex: 0,
    },
    roomId: {
        borderRadius: 30,
        borderWidth: 5,
        borderColor: '#EC3624',
        alignSelf: "flex-end",
        flex: 0,
        backgroundColor: '#EC3624',
    },
    roomIdText: {
        fontSize: 14,
        fontWeight: 'bold',
        alignSelf: 'baseline',
    },
    cards: {
        flex: 1,
        margin: -40,
        marginLeft: 2,
        marginRight: 2
    },
    cardstyle: {
        backgroundColor: '#EC3624',
        height: '55%',
        borderRadius: 30,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 1,
        shadowRadius: 3,
    },
    swipe: {
        backgroundColor: 'yellow',
    },
    functionList: {
        flexDirection: 'row',
        flex: 0,
        alignItems:'center',
        justifyContent: 'center',
    },
    functionButton: {
        margin: 20,
    },
    MainContainer: {
        flex: 1,   
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'white',   
    },
    roomId: {
        borderRadius: 30,
        borderWidth: 5,
        borderColor: '#EC3624',
        padding: 10,
        margin: 15,
        alignSelf: "flex-end",
        backgroundColor: '#EC3624',
    },
    roomIdText:{
        fontSize: 14,
        fontWeight: 'bold',
        alignSelf: 'baseline',
        color: 'white'
    },
    resturantNameText:{
        color: 'white',
        fontSize: 36,
        fontWeight: 'bold',
        alignSelf: 'baseline',
    },
    preferences: {
        alignItems: 'center',
        borderRadius: 10,
        borderColor: 'black',
    },
    buttonHome: {
        backgroundColor: '#EC3624',
        width: '100%',
        padding: 10,
        alignItems: 'center',
    },
    buttonTextHome:{
        color: 'white',
        fontWeight: 'bold',
        fontSize: 40,
    },
    buttonContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    button: {
        backgroundColor: '#EC3624',
        width: '60%',
        padding: 15,
        borderRadius: 30,
        alignItems: 'center',
    },
      buttonText:{
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    MostLiked: {
        fontWeight: 'bold',
        fontSize: 31,
        height: 39,
        color: 'white', 
    },
    endButtons: {
        alignItems: 'center',
        flexDirection: 'row',
    }
});

export default styles;