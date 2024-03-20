import { wrap } from 'lodash';
import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    MainContainer: 
    {
        flex: 1,   
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#EC3624',
    },
    safe: {
        flexDirection: "column",
        // backgroundColor: 'transparent',
        flex: 1,
    },
    container: {
        flex:0.3,
        paddingTop:5,
        alignItems: 'center',
    },
    restComments: {
        paddingTop:5,
        alignItems: 'center',
        marginBottom:80,
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 700,
        marginTop: 100,
    },
    backgroundRes:{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 475,
        borderRadius:30,
    },
    backgroundObj:{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '125%',
        borderRadius:30,
    },
    backgroundAddPost:{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '170%',
        borderRadius:30,
        alignItems:'center',
    },
    buttonContainerHome:{
        flex: .2,
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 30,
    },//UedLLTf7LbAfzu8NyCe
    restaurant:{
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 0,
        backgroundColor: '#635d5c',
        padding: 15,
        borderRadius:30,
        
    },
    comments:{
        width: '99%',
        minWidth:350,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginTop: 5,
        backgroundColor: '#635d5c',
        padding: 15,
        borderRadius:30,
        
    },
    postPrev:{
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 0,
        maxWidth: 155,
        height: 200,
        marginRight:1,
        
        backgroundColor: '#33302f',
        padding: 12,
        borderRadius:30,
        
    },
    addPost:{
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 0,
        maxWidth: 155,
        height: 100,
        marginRight:1,
        backgroundColor: '#544f4e',
        padding: 20,
        borderRadius:30,
        
    },
    modalContainer:{
        marginTop:40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal:{
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 5,
        padding: 15,
        borderRadius:30,
        backgroundColor: '#33302f',
        paddingBottom:35,
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
    catList:
    {
        flex: 0.10,
        //marginTop: 0,
        justifyContent: 'center',
        alignItems:'center',
        //backgroundColor: '#2a332d',
        borderRadius: 10,
        padding: 0,
        flexDirection:"row",   
        justifyContent: 'space-evenly',
        alignItems:'center',

    },
    flatList:
    {
        flex: 0.1,
        marginTop: 1.5,
        justifyContent: 'center',
        alignItems:'center',
        borderRadius: 10,
        padding: 5,
    },
    restaurantFlatlist:
    {
        flex: 0.85,
        marginTop: 0,
        justifyContent: 'center',
        alignItems:'center',
        borderRadius: 20,
        padding: 5,   
    },
    title:
    {
        fontWeight: 'bold',
        fontSize: 13,
        color:'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    userNameText:
    {
        fontWeight: 'bold',
        fontSize: 15,
        color:'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    commentText:
    {
        fontSize: 13,
        color:'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    item:{
        backgroundColor: '#2a332d',
        padding: 12,
        borderRadius:30,
        justifyContent:'center',
        alignItems: 'center',
    },
    category:
    {
        backgroundColor: '#2a332d',
        padding: 10,
        borderRadius:30,
        marginTop:3,
        justifyContent:'center',
        alignItems: 'center',
    },
    hours:{
        flexDirection:"row",
        //backgroundColor: '#2a332d',
        padding: 0,
        borderRadius:30,
        justifyContent:'center',
        alignItems: 'center',
    },
    hoursContainer:{
        width: '65%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
        backgroundColor: '#54504f',
        padding: 10,
        borderRadius:30,
    },
    inputContainer:
    {
        //width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        //marginTop: 5,
    },
    inputCommentContainer:
    {
        minWidth: 250,
        justifyContent: 'center',
        alignItems: 'center',
        padding:10,
        //marginTop: 5,
    },
    input: 
    {
        backgroundColor: '#2b2b2b',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 10,
        color:'white'
    },
    inputComment: 
    {
        flex: 0.2,
        backgroundColor: '#2b2b2b',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 10,
        minWidth:275,
        minHeight:150,
        maxWidth: 320,
        color:'white',
        justifyContent:'flex-start',
        alignItems:'flex-start',
        
    },
    scrollView: {
        backgroundColor: 'pink',
        marginHorizontal: 10,
        width: '100%',
    },
    text:
    {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
        marginTop:5,
        justifyContent:'center',
    },
    button: {
        backgroundColor: '#EC3624',
        marginLeft:5,
        //width: '25%',
        padding: 5,
        marginTop:10,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent:'center',        
      },
      buttonHide: {
        backgroundColor: '#EC3624',
        marginLeft:5,
        //width: '25%',
        padding: 5,
        marginTop:10,
        marginBottom:10,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent:'center',            
      },
    buttonCat: {
        backgroundColor: '#EC3624',
        marginLeft:5,
        //width: '25%',
        padding: 9,
        marginTop:5,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent:'center',        
      },  
      buttonAdd: {
        backgroundColor: '#EC3624',
        marginLeft:5,
        width: '45%',
        padding: 10,
        marginTop:5,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent:'center',        
      },  
      buttonGradient:
      {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 50,
        borderRadius: 30,
      },
      buttonGradientLoc:
      {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '165%',
        borderRadius: 30,
      },
      term: {
        backgroundColor: '#EC3624',
        //width: '60%',
        padding: 10,
        borderRadius: 30,
        alignItems: 'center',
      },
      buttonText:{
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14,
        justifyContent:'center',
        alignItems:'center',
        
    },
    captionText:{
    
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14,
        flexWrap: 'wrap',
        flexShrink: 1,
        justifyContent:'center',
        alignItems:'center',
        padding:3,
    },
});

export default styles;