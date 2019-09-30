import firebase from 'react-native-firebase'
import { Alert } from 'react-native';


interface Login {
    email:string
    password:string
}

class RNFirebase {


    //Login & Register
    async onChange(cb){
        firebase.auth().onAuthStateChanged((user)=>cb(user));
    }

    async login(data:Login){
        const auth = await firebase.auth().signInWithEmailAndPassword(data.email,data.password);
        if(auth.user.email){
            const accounts = await firebase.firestore().collection('users').doc(auth.user.email).get()
            return accounts.data();
        }else{
            Alert.alert('Error!!','Email & Password Tidak Valid, Silahkan Cek Kembali / Hubungi Admin')
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
                Alert.alert('Success','Silahkan Kembali Login & Mohon Simpan Email & Password anda karena jika ingin reset harus menghubungi admin')
                return 'success'
            }).catch(()=>{
                Alert.alert('','Err')
                return 'database erros'
            })
        })
        .catch((err)=>{
            return err;
        })
    }

    //Firestore
    async onPremium(data:string){
        const firestore = await firebase.firestore().collection('users').doc(data).get()
        return firestore.data();
    }

    async onCheck(cb){
        this.onChange((data)=>{
            firebase.firestore().collection('users').doc(data.email).get()
            .then((res)=>{
                cb(res.data())
            }).catch((er)=>{
                Alert.alert('eeror',er);
            })
        })
    }
    
}

export default new RNFirebase()