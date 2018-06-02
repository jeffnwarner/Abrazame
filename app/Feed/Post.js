import React, { Component } from 'react';
import { View, Text, Button, TextInput } from 'react-native'; 
import firebase from 'firebase';
import TextInputField from '../components/TextInputField.js';
import SignInForm from '../SignInForm/SignInForm.js';
import Feed from './Feed.js';
import styles from './styles.js';

class Post extends React.Component {
	state = { post: '', error: '', loading: false, username: '', submit: false, postMade: false, shortEmail: '', email: '' };
	static navigationOptions = { title: 'Post'};

	componentWillMount() {
		this.getUsername();
		this.getPostMade();
	}

	componentDidMount() {
		this.getUsername();
		this.getPostMade();
	}

	getUsername() {
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				this.setState({username: user.email.substring(0, email.length - 13)});
			}
		});
	}

	getPostMade() {
		data = firebase.database().ref('users/' + this.state.username).child('postMade');
		data.on('value', snapshot => {
			this.setState ({postMade: snapshot.val()})
		});
	}
	
	onPostPress() {
		this.setState({ error: '', loading: true });
		const { post, username } = this.state;
		
		time = new Date();
		filepath = "posts/" + time.toISOString();
		firebase.database().ref(filepath).set({
			post: post,
			username: username,
			time: time.toISOString()
		})
		.then(() => {
			this.setState({ error: '', loading: false, submit: true });
		})
		.catch(() => {
			this.setState({ error: 'Database failed.', loading: false });
		})

		userpath = "users/" + username;
		if (this.state.error === '') {
			firebase.database().ref(userpath).update({
				postMade: true
			})
			.then(() => {
				this.setState({ error: '', loading: false, submit: true });
			})
			.catch(() => {
				this.setState({ error: 'Database failed.', loading: false });
			})
		}
	}

	renderButtonOrLoading() {
		const { navigate } = this.props.navigation;
		const { username } = this.state;
		if (this.state.loading) {
			return <Text>Loading...</Text>
		}
		if (this.state.submit) {
			navigate('Feed', {username});
		}
		if (this.state.post != '') {
			return (
				<View>
					<Button onPress={this.onPostPress.bind(this)} title="Post" />
				</View>
			);
		}
		else {
			return (
				<View>
					<Button onPress={this.errorMessage.bind(this)} title="Post" />
				</View>
			);
		}
	}

	errorMessage() {
		if (this.state.post === '') {
			this.setState({ error: 'Please Write Your Story' });
		}
	}

	renderFirstPost() {
		if (!this.state.postMade) {
			return (
				<View> 			
					<Text>
						Make Your First Post!
					</Text>
				</View>
			);
		}
	}

	render() {
		return (
			<View> 			
				{this.renderFirstPost()}
				<TextInput
					editable = {true}
					maxLength = {1000}
					placeholder='Write your story'
					value={this.state.post}
					onChangeText={post => this.setState({ post })}
				/>
				<Text style={styles.errorTextStyle}>
					{this.state.error}
				</Text>
				{this.renderButtonOrLoading()}
			</View>
		);
	}
}

export default Post;