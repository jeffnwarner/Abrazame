import React, { Component } from 'react';
import { View, Text} from 'react-native';
import{Button} from 'react-native-elements'; 
import firebase from 'firebase';
import TextInputField from '../components/TextInputField.js';
import SignInForm from '../SignInForm/SignInForm.js';
import AdditionalInfo from './AdditionalInfo.js';
import styles from './styles.js';

class RegisterForm extends React.Component {
	state = {username: '', password: '', reenterpassword: '', 
		question1: '', question2: '', question3: '', 
		answer1: '', answer2: '', answer3: '', error: '', loading: false};
	static navigationOptions = { title: 'Register Form', headerLeft: null};

	renderButtonOrLoading() {
		const { navigate } = this.props.navigation;
		const { username, password } = this.state;
		if (this.state.loading) {
			return <Text>Loading...</Text>
		} //<Button onPress={this.onRegisterPress.bind(this)} title="Create Account" />
		if (this.state.password.length < 8) {
			return (
				<View style = {styles.buttoncontainer}>
					<Button onPress={this.errorMessage.bind(this)} 
					title="Create Account"
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
					<Button onPress={() => navigate('SignIn', {})} 
					title="Already registered?" 
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
				</View>
			);
		}

		else if (this.state.password === this.state.reenterpassword && this.state.username !== '' && this.state.password !== '') {
			return (
				<View>
					<Button onPress={() => navigate('Additional', {username, password})} 
					title="Create Account"
					color="#453484" 
					/>
					<Button onPress={() => navigate('SignIn', {})} 
					title="Create Account"
					color="#453484" 
					/>
				</View>
			);
		}
		
		else {
			return (
				<View>
					<Button onPress={this.errorMessage.bind(this)} 
					title="Create Account"
					color="#453484" 
					/>
					<Button onPress={() => navigate('SignIn', {})} 
					title="Already registered?"
					color="#453484" 
					/>
				</View>
			);
		}
	}

	errorMessage() {
		if (this.state.username === '' || this.state.password === '' || this.state.reenterpassword === '') {
			this.setState({ error: 'Please fill out all fields' });
		}
		else if (this.state.password !== this.state.reenterpassword) {
			this.setState({ error: 'Passwords do not match' });
		}
		else if (this.state.password.length < 8) {
			this.setState({ error: 'Password must be at least 8 characters'})
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