import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import firebase from 'firebase';
import TextInputField from '../components/TextInputField.js';
import RegisterForm from '../RegisterForm/RegisterForm.js';
//import Feed from '../Feed/Feed.js';
import styles from './styles.js';

class ForgotPassword extends React.Component {
	state = {username: '', password: '', error: '', loading: false, question: '', answer: '', dataAnswer: ''};
	static navigationOptions = { title: 'Forgot Password'};

	onForgetPress() {
		this.setState({ error: '', loading: true });
		const { username, password } = this.state;
		data = firebase.database().ref('users/' + username).child('question_1');
		data.on('value', snapshot => {
			this.setState ({question: snapshot.val()})
		});
		this.setState({ loading: false, error: 'did it work?'});
	}

	onAnswer() {
		this.setState({ error: '', loading: true });
		const { username, password } = this.state;
		data = firebase.database().ref('users/' + username).child('answer_1');
		data.on('value', snapshot => {
			this.setState ({dataAnswer: snapshot.val()})
		});
		if (this.state.answer === this.state.dataAnswer) {
			data = firebase.database().ref('users/' + username).child('password');
			data.on('value', snapshot => {
				this.setState({password: "Your password is " + snapshot.val()})
			});
			this.setState({ loading: false, error: ''})
		}
		this.setState({ loading: false, error: 'did it work?'});
	}

	renderButtonOrLoading() {
		const { navigate } = this.props.navigation;
		if (this.state.loading) {
			return <Text>Loading...</Text>
		}
		if (this.state.answer !== '') {
			return (
				<View>
					<Button onPress={this.onAnswer.bind(this)} 
					title="Submit"
					color="#453484"
					 />
					<Button onPress={() => navigate('SignIn', {})} 
					title="Cancel"
					color="#453484" 
					/>
				</View>
			);
		}
		else if (this.state.username !== '') {
			return (
				<View>
					<Button onPress={this.onForgetPress.bind(this)} 
					title="Submit"
					color="#453484"
					 />
					<Button onPress={() => navigate('SignIn', {})} 
					title="Submit"
					color="#453484"
					 />
				</View>
			);
		}
		else {
			return (
				<View>
					<Button onPress={this.errorMessage.bind(this)} 
					title="Submit"
					color="#453484"
					 />
					<Button onPress={() => navigate('SignIn', {})} 
					title="Submit"
					color="#453484"
					 />
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
				
				<TextInputField
					label='Answer'
					placeholder='Answer'
					value={this.state.answer}
					onChangeText={answer => this.setState({ answer })}
					autoCorrect={false}
				/>

				<Text>
					{this.state.password}
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