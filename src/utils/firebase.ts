import * as Fire from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDXV44fau6ezjL4qmewNsqT2x8oafLa9IQ",
    authDomain: "westmanga-d528a.firebaseapp.com",
    databaseURL: "https://westmanga-d528a.firebaseio.com",
    projectId: "westmanga-d528a",
    storageBucket: "westmanga-d528a.appspot.com",
    messagingSenderId: "164641778056",
    appId: "1:164641778056:web:29dcc23d71404645"
};
Fire.initializeApp(firebaseConfig);


class Firebase {
   
    
    public Auth  = {
        async Fetch(email){
            const data = await Fire.auth().fetchSignInMethodsForEmail(email)
            return data;
        },
        async login(email,password){
            const data = await Fire.auth().signInWithEmailAndPassword(email,password);
            return data
        },
        async Register(email,password){
            const data = await Fire.auth().createUserWithEmailAndPassword(email,password);
            return data;
        },
        async Phone(phone){

        }
    }
    

}

export default new Firebase()