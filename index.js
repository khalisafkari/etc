import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import firebase from 'react-native-firebase'

firebase.admob().initialize('ca-app-pub-8637010206853096~2004193803');

AppRegistry.registerComponent(appName, () => App);
