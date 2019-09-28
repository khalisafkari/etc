import * as firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'
import { Alert } from 'react-native';


const firebaseConfig = {
    apiKey: "AIzaSyDXV44fau6ezjL4qmewNsqT2x8oafLa9IQ",
    authDomain: "westmanga-d528a.firebaseapp.com",
    databaseURL: "https://westmanga-d528a.firebaseio.com",
    projectId: "westmanga-d528a",
    storageBucket: "westmanga-d528a.appspot.com",
    messagingSenderId: "164641778056",
    appId: "1:164641778056:web:29dcc23d71404645"
};
firebase.initializeApp(firebaseConfig);

interface Login {
    email:string
    password:string
}

class RNFirebase{

    async onChange(cb){
        firebase.auth().onAuthStateChanged((user)=>cb(user));
    }

    async login(data:Login){
        const auth = await firebase.auth().signInWithEmailAndPassword(data.email,data.password)
        if(auth.user.email){
            const accounts = await firebase.firestore().collection('users').doc(auth.user.email).get()
            return accounts.data();
        }else{
            console.log('errors');
            //Alert.alert('Error!!','Email & Password Tidak Valid, Silahkan Cek Kembali / Hubungi Admin')
            return 'errors';
        }
    }

    async register(data:Login){
        firebase.auth()
        .createUserWithEmailAndPassword(data.email,data.password)
        .then((res)=>{
            firebase.firestore()
            .collection('users')
            .doc(res.user.email)
            .set({
                email:res.user.email,
                premium:0,
                status:false
            })
            .then(()=>{
                console.log('Silahkan Login Kembali')
                //Alert.alert('Success','Silahkan Kembali Login & Mohon Simpan Email & Password anda karena jika ingin reset harus menghubungi admin')
                return 'success'
            }).catch(()=>{
                console.log('err')
                //Alert.alert('','Err')
                return 'database erros'
            })
        })
        .catch((err)=>{
            return err;
        })
    }

}

export default new RNFirebase();