import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import firebase from 'firebase';
import TextInputField from '../components/TextInputField.js';
import styles from './styles.js';

class SignInForm extends Component {
	state = {email: '', password: '', error: '', loading: false};
	onSignInPress() {
		this.setState({ error: '', loading: true });
		const { email, password } = this.state;
		firebase.auth().signInWithEmailAndPassword(email, password)
		.then(() => { 
			this.setState({error: '', loading: false}); 
			})
		.catch(() => {
			firebase.auth().createUserWithEmailAndPassword(email, password)
			.then(() => {
				this.setState({ error: '', loading: false});
			})
			.catch(() => {
				this.setState({ error: 'Authentication failed.', loading: false });
			})
		})
	}

	renderButtonOrLoading() {
		if (this.state.loading) {
			return <Text>Loading...</Text>
		}
		return <Button onPress={this.onSignInPress.bind(this)} title="Log in" />;
	}

	render() {
		return (
			<View> 
				<TextInputField
					label='Email Address'
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
				
				<Text style={styles.errorTextStyle}>
					{this.state.error}
				</Text>
				{this.renderButtonOrLoading()}
			</View>
		);
	}
}

export default SignInForm;