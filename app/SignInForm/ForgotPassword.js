import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import firebase from 'firebase';
import TextInputField from '../components/TextInputField.js';
import RegisterForm from '../RegisterForm/RegisterForm.js';
//import Feed from '../Feed/Feed.js';
import styles from './styles.js';

class ForgotPassword extends React.Component {
	state = {username: '', password: '', error: '', loading: false, question: '', answer: '', dataAnswer: '', rand: 1};
	static navigationOptions = { title: 'Forgot Password', headerLeft: null};

	componentWillMount() {
		this.getRandIndex();
	}

	getRandIndex() {
		this.setState({ rand: Math.floor(Math.random() * (3 - 1 + 1)) + 1 });
	}
	
	onForgetPress() {
		this.setState({ error: '', loading: true });
		const { username, password, rand } = this.state;
		data = firebase.database().ref('users/' + username).child('question_' + rand);
		data.on('value', snapshot => {
			this.setState ({question: snapshot.val()});
		});
		this.setState({ loading: true, error: ''});
		data = firebase.database().ref('users/' + username).child('answer_' + rand);
		data.on('value', snapshot => {
			this.setState ({dataAnswer: snapshot.val()});
		});
		this.setState({ error: '', loading: false });

	}

	onAnswer() {
		this.setState({ error: '', loading: true });
		const { username, password, rand, } = this.state;
		if (this.state.dataAnswer !== '') {
			if (this.state.answer === this.state.dataAnswer) {
				data = firebase.database().ref('users/' + username).child('password');
				data.on('value', snapshot => {
					this.setState({password: "Your password is " + snapshot.val()});
				});
				this.setState({ loading: false, error: ''});
			}
			else {
				this.setState({ loading: false, error: 'Wrong Answer'});
			}
		}
		else {
			this.setState({ error: 'Database Error', loading: false });
		}
	}

	renderAnswerBox() {
		if (this.state.question !== '') {
			return (
				<View>
				<TextInputField
					label='Answer'
					placeholder='Answer'
					value={this.state.answer}
					onChangeText={answer => this.setState({ answer })}
					autoCorrect={false}
				/>
				</View>
			);
		}
	}

	renderButtonOrLoading() {
		const { navigate } = this.props.navigation;
		if (this.state.loading) {
			return <Text>Loading...</Text>
		}
		//this.renderAnswerBox();
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
					title="Cancel"
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
					title="Cancel"
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
				{this.renderAnswerBox()}
				<Text style={styles.errorTextStyle}>
					{this.state.error}
				</Text>
				{this.renderButtonOrLoading()}
				<Text>
					{this.state.password}
				</Text>
			</View>
		);
	}
}

export default ForgotPassword;