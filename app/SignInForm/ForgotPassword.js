import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import firebase from 'firebase';
import TextInputField from '../components/TextInputField.js';
import RegisterForm from '../RegisterForm/RegisterForm.js';
//import Feed from '../Feed/Feed.js';
import styles from './styles.js';

class ForgotPassword extends React.Component {
	state = {username: '', password: '', error: '', loading: false, question: '', answer: ''};
	static navigationOptions = { title: 'Forgot Password'};

	onForgetPress() {
		this.setState({ error: '', loading: true });
		const { username, password } = this.state;
		this.setState({ question: firebase.database().ref("users/" + username + "/question1")});
	}

	onAnswer() {
		this.setState({ error: '', loading: true });
		const { username, password } = this.state;
		firebase.database().ref("users/" + email).once('answer1', function(snapshot) {
			if (this.state.answer === snapshot.val()) {
				this.setState({ password: firebase.database().ref("users/" + username + "/password")});
				return (
					<View>
						<Text>Your Password is</Text>
						<Text>{this.state.password}</Text>
					</View>
				);
			}
		});
	}

	renderButtonOrLoading() {
		const { navigate } = this.props.navigation;
		if (this.state.loading) {
			return <Text>Loading...</Text>
		}
		if (this.state.answer !== '') {
			return (
				<View>
					<Button onPress={this.onAnswer.bind(this)} title="Submit" />
					<Button onPress={() => navigate('SignIn', {})} title="Cancel" />
				</View>
			);
		}
		else if (this.state.username !== '') {
			return (
				<View>
					<Button onPress={this.onForgetPress.bind(this)} title="Submit" />
					<Button onPress={() => navigate('SignIn', {})} title="Cancel" />
				</View>
			);
		}
		else {
			return (
				<View>
					<Button onPress={this.errorMessage.bind(this)} title="Submit" />
					<Button onPress={() => navigate('SignIn', {})} title="Cancel" />
				</View>
			);
		}
	}
	
	errorMessage() {
		if (this.state.username === '') {
			this.setState({ error: 'Please Enter Username' });
		}
		else if (this.state.answer === '') {
			this.setState({ error: 'Please Answer Question' });
		}
	}

	render() {
		return (
			<View> 
				<TextInputField
					label='Username'
					placeholder='username'
					value={this.state.username}
					onChangeText={username => this.setState({ username })}
					autoCorrect={false}
				/>

				<Text style={styles.errorTextStyle}>
					{this.state.question}
				</Text>
				
				<Text style={styles.errorTextStyle}>
					{this.state.error}
				</Text>
				{this.renderButtonOrLoading()}
			</View>
		);
	}
}

export default ForgotPassword;