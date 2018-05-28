import React, { Component } from 'react';
import { View, Text, Button, SafeAreaView, Image, KeyboardAvoidingView } from 'react-native';
import firebase from 'firebase';
import TextInputField from '../components/TextInputField.js';
import RegisterForm from '../RegisterForm/RegisterForm.js';
//import Feed from '../Feed/Feed.js';
import styles from './styles.js';

class SignInForm extends React.Component {
	state = {username: '', password: '', error: '', loading: false};
	static navigationOptions = { title: 'Sign In'};

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
				<Button onPress={this.onSignInPress.bind(this)} 
				title="Log in" 
				/>
				<Button onPress={() => navigate('Register', {})} 
				title="Create an account" 
				/>
				<Button onPress={() => navigate('Forgot', {})} 
				title="Forgot Password?" 
				/>
				
			</View>
		);
	}

	render() {
		return (
			<KeyboardAvoidingView style ={styles.container}>
				<View style = {styles.logoContainer}>
					<Image style = {styles.logo}
						source ={require('../images/logo.png')}>
					</Image>
				</View>
				<View style ={styles.infoContainer}> 
					<TextInputField style ={styles.input}
						label='Username'
						placeholder='username'
						placeholderTextColor='#000000'
						value={this.state.username}
						onChangeText={username => this.setState({ username })}
						autoCorrect={false}
						underlineColorAndroid={'transparent'}
					/>

					<TextInputField style ={styles.input}
						label='Password'
						placeholder='password'
						placeholderTextColor='#000000'
						value={this.state.password}
						onChangeText={password => this.setState({ password })}
						autoCorrect={false}
						secureTextEntry
						underlineColorAndroid={'transparent'}
					/>
					
					<Text style={styles.errorTextStyle}>
						{this.state.error}
					</Text>
					{this.renderButtonOrLoading()}
				</View>
			</KeyboardAvoidingView>
		);
	}
}

export default SignInForm;