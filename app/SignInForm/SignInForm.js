import React, { Component } from 'react';
import { View, Text, KeyboardAvoidingView, Buton,Image } from 'react-native';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons';
import firebase from 'firebase';
import TextInputField from '../components/TextInputField.js';
import RegisterForm from '../RegisterForm/RegisterForm.js';
//import Feed from '../Feed/Feed.js';
import styles from './styles.js';

class SignInForm extends React.Component {
	state = {username: '', password: '', error: '', loading: false, logged: false, };
	static navigationOptions = { title: 'Sign In Form'};

	onSignInPress() {
		this.setState({ error: '', loading: true });
		const { username, password } = this.state;
		email = this.state.username + "@abrazame.com";
		firebase.auth().signInWithEmailAndPassword(email, password)
		.then(() => { 
			this.setState({error: '', loading: false, logged: true }); 
			})
		.catch(() => {
			this.setState({ error: 'Invalid Username / Password', loading: false });
		})
	}

	renderButtonOrLoading() {
		const { navigate } = this.props.navigation;
		const { username } = this.state;
		if (this.state.loading) {
			return <Text loading>Loading...</Text>
		}
		if (this.state.logged) {
			navigate('Feed', {username});
		}
		return (
			<View style = {styles.container}>
				<View style = {styles.buttons}>
					<Button onPress={this.onSignInPress.bind(this)} 
					title="Login" 
					titleStyle={{ fontWeight: "700" }}
					buttonStyle={{
						backgroundColor: "#453484",
						width: 250,
						height: 39,
						borderColor: "transparent",
						borderWidth: 0,
						borderRadius: 19,
						paddingBottom: 10
					}}
					containerStyle={{ marginTop: 20 }}
					/>
					<Button onPress={() => navigate('Register', {})} 
					title="Create an Account" 
					titleStyle={{ fontWeight: "700" }}
					buttonStyle={{
						backgroundColor: "#453484",
						width: 250,
						height: 39,
						borderColor: "transparent",
						borderWidth: 0,
						borderRadius: 19
						
					}}
					containerStyle={{ marginTop: 20 }}
					/>
					<Button onPress={() => navigate('Forgot', {})} 
					title="Forgot Password?"
					titleStyle={{ fontWeight: "700" }}
					buttonStyle={{
						backgroundColor: "#453484",
						width: 250,
						height: 39,
						borderColor: "transparent",
						borderWidth: 0,
						borderRadius: 19
					}}
					/>
					</View>
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