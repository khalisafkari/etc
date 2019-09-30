import React from 'react'
import firebase from 'react-native-firebase'

//@ts-ignore
const Banner = firebase.admob.Banner;
//@ts-ignore
const AdRequest = firebase.admob.AdRequest;
const request = new AdRequest();
request.addKeyword('bussines');

import { useSelector } from 'react-redux'

const AdmobBanner = () => {

    //@ts-ignore
    const state = useSelector(state => state.accounts);

    if (state.premium) {
        return null;
    } else {
        return (
            <Banner
                unitId={"ca-app-pub-8637010206853096/4438785456"}
                size={"SMART_BANNER"}
                request={request.build()}
            />
        )
    }
    // return null
} 

export default AdmobBanner;

// import React from 'react'
// export default function AdmobBanner(){
//     return null;
// }