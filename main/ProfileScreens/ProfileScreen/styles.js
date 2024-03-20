import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    userImg: {
        height: 200,
        width: 200,
        borderRadius: 75,
        marginTop: 10,
        alignSelf: 'center'
    },
    userName: {
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10,
        textAlign: 'center',
    },
    userBio: {
        fontSize: 18,
        fontWeight: '600',
        color: '#666',
        textAlign: 'left',
        marginBottom: 10,
    },
    buttonOutlined: {
        padding: 8,
        color: 'white',
        borderWidth: 1,
        borderColor: 'lightgrey',
        borderRadius: 8,
        textAlign: 'center',
    },
    margin15Right: {
        marginRight: 15,
    },
    bold: {
        fontWeight: '700',
    },
    center: {
        textAlign: 'center',
    },
    userInterests: {
        fontSize: 18,
        fontWeight: '600',
        color: '#666',
        textAlign: 'left',
        marginBottom: 10,
    },
    userAllergies: {
        fontSize: 18,
        fontWeight: '600',
        color: '#666',
        textAlign: 'left',
        marginBottom: 10,
    },
    searchBar: {
        backgroundColor: '#FF0000',
        color: 'white',
        paddingLeft: 10,
        borderRadius: 8,
        height: 40,
        fontSize: 20,
        marginTop: 40
    },
    title: {
        fontSize: 30, 
        color: '#EC3624', 
        paddingLeft: 10,
        marginTop: 5, 
        marginBottom: 5,
        fontWeight: 'bold'
    },
    titles: {
        fontSize: 23,
        fontWeight: '600',
        color: 'red',
        textAlign: 'left',
        marginBottom: 10,
    },
    userBtnWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        marginBottom: 10,
    },
    userBtn: {
        borderColor: 'rgba(158, 150, 150, 0)',
        borderWidth: 2,
        borderRadius: 3,
        paddingVertical: 8,
        paddingHorizontal: 12,
        marginHorizontal: 5,
    },
    userBtnTxt: {
        color: '#2e64e5',
    },
    userInfoWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginVertical: 20,
    },
    userInfoItem: {
        justifyContent: 'center',
    },
    userInfoTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
        textAlign: 'center',
    },
    userInfoSubTitle: {
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
    },
    button:{
        backgroundColor: 'red',
        width: '100%',
        padding: 10,
        borderRadius: 30,
        alignItems: 'center',
    },
    buttonText:{
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
    buttonContainer:{
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
});

export default styles;