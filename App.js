import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Config from 'react-native-config';
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

export default class App extends Component {
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
			<View>
				<SignInForm />
			</View>
		);
	}
}
    
AppRegistry.registerComponent('App', () => App);