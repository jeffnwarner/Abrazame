import React, { Component } from 'react';
import { View, Text, Button } from 'react-native'; 
import firebase from 'firebase';
import TextInputField from '../components/TextInputField.js';
import styles from './styles.js';

class Feed extends React.Component {
	render() {
		return (
			<View> 			
				<Text>
					You Are Now In The News Feed!
				</Text>
			</View>
		);
	}
}

export default RegisterForm;