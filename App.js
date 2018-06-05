import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Config from 'react-native-config';
import { StackNavigator } from 'react-navigation'; 
import {
	API_KEY,
	AUTH_DOMAIN,
	DATABASE_URL,
	PROJECT_ID,
	STORAGE_BUCKET,
	MESSAGE_ID
} from 'react-native-dotenv';
import * as firebase from 'firebase';
import SignInForm from './app/SignInForm/SignInForm.js';
import RegisterForm from './app/RegisterForm/RegisterForm.js';
import AdditionalInfo from './app/RegisterForm/AdditionalInfo.js';
import ForgotPassword from './app/SignInForm/ForgotPassword.js';
import Feed from './app/Feed/Feed.js';
import FirstPost from './app/Feed/FirstPost.js'
import Post from './app/Feed/Post.js';
import Map from './app/Map/Map.js';
import NLP from './app/NLP/NLP.js';
//import Navigation from './app/components/Navigation.js';

export default class Abrazame extends React.Component {
	componentWillMount() {
		firebase.initializeApp({
			apiKey: API_KEY,
			authDomain: AUTH_DOMAIN,
			databaseURL: DATABASE_URL,
			projectId: PROJECT_ID,
			storageBucket: STORAGE_BUCKET,
			messagingSenderId: MESSAGE_ID
		});
	}
	render() {
		return (
			<Navigation />
		);
	}
}
    
//AppRegistry.registerComponent('Abrazame', () => Abrazame);

const Navigation = StackNavigator({
	SignIn: {screen: SignInForm},
	Register: {screen: RegisterForm},
	Additional: {screen: AdditionalInfo},
	Forgot: {screen: ForgotPassword},
	Feed: {screen: Feed},
	FirstPost: {screen: FirstPost},
	Post: {screen: Post},
	Map: {screen: Map},
	NLP: {screen: NLP},
});

//export default Navigation;