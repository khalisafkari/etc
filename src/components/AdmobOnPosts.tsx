import React from 'react'
import firebase from 'react-native-firebase'
import { View } from 'react-native';

//@ts-ignore
const Banner = firebase.admob.Banner;
//@ts-ignore
const AdRequest = firebase.admob.AdRequest;
const request = new AdRequest();
request.addKeyword('bussines');
import { useSelector } from 'react-redux'

const AdmobOnPosts = () => {

    //@ts-ignore
    const state = useSelector(state => state.accounts);

    if (state.premium) {
        return null
    } else {
        return (
            <View style={{ backgroundColor: '#fff', paddingBottom: 15 }}>
                <Banner
                    unitId={"ca-app-pub-8637010206853096/1985801253"}
                    size={"SMART_BANNER"}
                    request={request.build()}
                />
            </View>
        )
    }
    //return null;
}

const AdmobOnSearch = () => {
    //@ts-ignore
    const state = useSelector(state => state.accounts);
    if (state.premium) {
        return null
    } else {
        return (
            <Banner
                unitId={"ca-app-pub-8637010206853096/7619247790"}
                size={"SMART_BANNER"}
                request={request.build()}
            />
        )
    }

    //return null;
}


export {
    AdmobOnPosts,
    AdmobOnSearch
};

// export const AdmobOnPosts = () => {
//     return null
// }

// export const AdmobOnSearch = () => {
//     return null
// }