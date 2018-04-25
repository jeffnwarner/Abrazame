import React, {Component} from 'react';
import {StyleSheet, View, TextInput, TouchableOpacity, Text, StatusBar, Button, ActivityIndicator} from 'react-native';

export default class LoginForm extends Component {
	state = {
		email: '',
		password: '',
		authenticating: false
	}

	onPressSignIn() {
		this.setState({
			authenticating: true
		});
	}

	renderCurrentState() {
		if (this.state.authenticating) {
			return (
				<View>
					<ActivityIndicator size='large' />
				</View>
			)
		}

		return (
			<View>
				<StatusBar
					barStyle="light-content"/>
			
				<TextInput 
					placeholder="username"
					placeholderTextColor="rgba(255,255,255,0.7)"
					returnKeyType="next"
					onSubmitEditing={() =>this.passwordInput.focus()}
					autoCapitalize="none"
					autoCorrect={false}
					style={styles.input}
					onChangeText={email => this.setState({email})} 
					value={this.state.email} />
			
				<TextInput 
					placeholder="password"
					placeholderTextColor="rgba(255,255,255,0.7)"
					returnKeyType="go"
					secureTextEntry
					style={styles.input} 
					ref={(input) => this.passwordInput = input}
					onChangeText={password => this.setState({password})} 
					value={this.state.password} />

				<TouchableOpacity 
					onPress = {this.onPressSignIn()} 
					style={styles.buttonContainer}>
					<Text style={styles.buttonText}>Log In</Text>
				</TouchableOpacity>
			
				<TouchableOpacity 
					onPress = {this.onPressSignIn()} 
					style={styles.buttonContainer}>
					<Text style={styles.buttonText}>Create an account?</Text>
				</TouchableOpacity>
			</View>
		)
	}

	render() {
		return (
			<View style={styles.container}>
				{this.renderCurrentState()}	
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		padding: 20
	},
	input: {
		height: 40,
		backgroundColor: 'rgba(255,255,255,0.2)',
		marginBottom: 20,
		color: '#FFF',
		paddingHorizontal: 10
	},
	buttonContainer: {
		backgroundColor: '#2980b9',
		paddingVertical: 10,
		marginBottom: 20
	},
	buttonText: {
		textAlign: 'center',
		color: '#FFFFFF',
		fontWeight: '700'
	}
});