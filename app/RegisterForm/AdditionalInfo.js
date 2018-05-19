import React, { Component } from 'react';
import { View, Text, Button } from 'react-native'; 
import firebase from 'firebase';
import TextInputField from '../components/TextInputField.js';
import SignInForm from '../SignInForm/SignInForm.js';
import styles from './styles.js';

class AdditionalInfo extends React.Component {
	state = { username: this.props.navigation.state.params.username, password: this.props.navigation.state.params.password, reenterpassword: '', 
		question1: '', question2: '', question3: '', 
		answer1: '', answer2: '', answer3: '', city: '',
		error: '', loading: false, email: this.props.navigation.state.params.username + "@abrazame.com", authSuccess: false };
	static navigationOptions = { title: 'Additional Info'};

	onRegisterPress() {
		this.setState({ error: '', loading: true });
		const { userame, password, question1, question2,
			question3, answer1, answer2, answer3, email, authSuccess, city } = this.state;
		//authSuccess = false;
		firebase.auth().createUserWithEmailAndPassword(email, password)
		.then(() => {
			this.setState({ error: '', loading: false, authSuccess: true });
			//authSuccess = true;
		})
		.catch(() => {
			this.setState({ error: 'Username taken', loading: false });
		})
		if (this.state.error === '') {
			userpath = "users/" + username;
			firebase.database().ref(userpath).set({
				city: city,
				question_1: question1,
				answer_1: answer1,
				question_2: question2,
				answer_2: answer2,
				question_3: question3,
				answer_3: answer3,
				password: password
			})
			.then(() => {
				this.setState({ error: '', loading: false});
			})
			.catch(() => {
				this.setState({ error: 'Database failed.', loading: false });
			})
		}
	}

	renderButtonOrLoading() {
		const { navigate } = this.props.navigation;
		if (this.state.loading) {
			return <Text>Loading...</Text>
		}
		if (this.state.question1 !== '' && this.state.question2 !== '' && this.state.question3 !== '' &&
			this.state.answer1 !== '' && this.state.answer2 !== '' && this.state.answer3 !== '' && this.state.city !== '') {
			return (
				<View>
					<Button onPress={this.onRegisterPress.bind(this)} title="Submit" />
				</View>
			);
		}
		else {
			return (
				<View>
					<Button onPress={this.errorMessage.bind(this)} title="Submit" />
				</View>
			);
		}
	}

	errorMessage() {
		this.setState({ error: 'Please fill out all fields' });
	}

	render() {
		return (
			<View> 
				<TextInputField
					label='Question 1'
					autoCorrect={false}
					placeholder='personal security question'
					value={this.state.question1}
					onChangeText={question1 => this.setState({ question1 })}
				/>

				<TextInputField
					label='Answer 1'
					autoCorrect={false}
					placeholder='answer'
					value={this.state.answer1}
					onChangeText={answer1 => this.setState({ answer1 })}
				/>

				<TextInputField
					label='Question 2'
					autoCorrect={false}
					placeholder='personal security question'
					value={this.state.question2}
					onChangeText={question2 => this.setState({ question2 })}
				/>

				<TextInputField
					label='Answer 2'
					autoCorrect={false}
					placeholder='answer'
					value={this.state.answer2}
					onChangeText={answer2 => this.setState({ answer2 })}
				/>

				<TextInputField
					label='Question 3'
					autoCorrect={false}
					placeholder='personal security question'
					value={this.state.question3}
					onChangeText={question3 => this.setState({ question3 })}
				/>

				<TextInputField
					label='Answer 3'
					autoCorrect={false}
					placeholder='answer'
					value={this.state.answer3}
					onChangeText={answer3 => this.setState({ answer3 })}
				/>

				<TextInputField
					label='City'
					autoCorrect={false}
					placeholder='City'
					value={this.state.city}
					onChangeText={city => this.setState({ city })}
				/>
				
				<Text style={styles.errorTextStyle}>
					{this.state.error}
				</Text>
				
				{this.renderButtonOrLoading()}
			</View>
		);
	}
}

export default AdditionalInfo;