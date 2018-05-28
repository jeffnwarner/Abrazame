import React, { Component } from 'react';
import { View, Text, Button } from 'react-native'; 
import firebase from 'firebase';
import TextInputField from '../components/TextInputField.js';
import SignInForm from '../SignInForm/SignInForm.js';
import AdditionalInfo from './AdditionalInfo.js';
import styles from './styles.js';

class RegisterForm extends React.Component {
	state = {email: '', password: '', reenterpassword: '', 
		question1: '', question2: '', question3: '', 
		answer1: '', answer2: '', answer3: '', error: '', loading: false};
	static navigationOptions = { title: 'Register Form'};

	renderButtonOrLoading() {
		const { navigate } = this.props.navigation;
		const { email, password } = this.state;
		if (this.state.loading) {
			return <Text>Loading...</Text>
		} //<Button onPress={this.onRegisterPress.bind(this)} title="Create Account" />
		if (this.state.password === this.state.reenterpassword && this.state.email !== '' && this.state.password !== '') {
			return (
				<View>
					<Button onPress={() => navigate('Additional', {email, password})} title="Create Account" />
					<Button onPress={() => navigate('SignIn', {})} title="Already registered?" />
				</View>
			);
		}
		else {
			return (
				<View>
					<Button onPress={this.errorMessage.bind(this)} title="Create Account" />
					<Button onPress={() => navigate('SignIn', {})} title="Already registered?" />
				</View>
			);
		}
	}

	errorMessage() {
		if (this.state.email === '' || this.state.password === '' || this.state.reenterpassword === '') {
			this.setState({ error: 'Please fill out all fields' });
		}
		else if (this.state.password !== this.state.reenterpassword) {
			this.setState({ error: 'Passwords do not match' });
		}
	}

	render() {
		return (
			<View style ={styles.container}> 
				<TextInputField
					label='Username'
					placeholder='username'
					value={this.state.email}
					onChangeText={email => this.setState({ email })}
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

				<TextInputField
					label='Confirm Password'
					autoCorrect={false}
					placeholder='confirm password'
					secureTextEntry
					value={this.state.reenterpassword}
					onChangeText={reenterpassword => this.setState({ reenterpassword })}
				/>
				
				<Text style={styles.errorTextStyle}>
					{this.state.error}
				</Text>
				{this.renderButtonOrLoading()}
			</View>
		);
	}
}

export default RegisterForm;