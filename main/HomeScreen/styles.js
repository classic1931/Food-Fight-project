import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginHorizontal: 20
    },
    iconsContainer: {
        flexDirection: 'row',
        color: 'white',
        left: 260
    },
    logo: {
        width: 100,
        height: 80,
        resizeMode: 'contain'
    },
    icon: {
        width: 30,
        height: 30,
        marginLeft: 10
    },
    unreadBadge: {
        position: 'absolute',
        backgroundColor: '#FF3250',
        right: -5,
        top: -5,
        borderRadius: 25,
        width: 25,
        height: 18,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100
    },
    unreadBadgetext: {
        color: 'white',
        fontWeight: '600',
    },
    story: {
        width: 35,
        height: 35,
        marginLeft: 6,
        borderWidth: 1.6,
        borderColor: '#ff8501',
        borderRadius: 35,
    },
    postIcon: {
        width: 20,
        height: 20,
        marginLeft: 10,
    },
    shareicon: {
        transform: [{
            rotate: '320deg'
        }],
        marginTop: -3,
    }
});

export default styles;