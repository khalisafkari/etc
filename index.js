import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import firebase from 'react-native-firebase'
import OneSignal from 'react-native-onesignal'; 

firebase.admob().initialize('ca-app-pub-8637010206853096~2004193803');
OneSignal.init('afed054c-0e68-4952-8e00-4f51e982e83a');

AppRegistry.registerComponent(appName, () => App);
