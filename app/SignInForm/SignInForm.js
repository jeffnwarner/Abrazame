import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import firebase from 'firebase';
import TextInputField from '../components/TextInputField.js';
import RegisterForm from '../RegisterForm/RegisterForm.js';
//import Feed from '../Feed/Feed.js';
import styles from './styles.js';

class SignInForm extends React.Component {
	state = {username: '', password: '', error: '', loading: false};
	static navigationOptions = { title: 'Sign In Form'};

	onSignInPress() {
		this.setState({ error: '', loading: true });
		const { username, password } = this.state;
		email = this.state.username + "@abrazame.com";
		firebase.auth().signInWithEmailAndPassword(email, password)
		.then(() => { 
			this.setState({error: '', loading: false}); 
			})
		.catch(() => {
			this.setState({ error: 'Invalid Username / Password', loading: false });
		})
		//navigate('Feed', {});
	}

	renderButtonOrLoading() {
		const { navigate } = this.props.navigation;
		if (this.state.loading) {
			return <Text>Loading...</Text>
		}
		return (
			<View>
				<Button onPress={this.onSignInPress.bind(this)} title="Log in" />
				<Button onPress={() => navigate('Register', {})} title="Create an account" />
				<Button onPress={() => navigate('Forgot', {})} title="Forgot Password?" />
			</View>
		);
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

				<TextInputField
					label='Password'
					autoCorrect={false}
					placeholder='password'
					secureTextEntry
					value={this.state.password}
					onChangeText={password => this.setState({ password })}
				/>
				
				<Text style={styles.errorTextStyle}>
					{this.state.error}
				</Text>
				{this.renderButtonOrLoading()}
			</View>
		);
	}
}

export default SignInForm;