import React, { Component } from 'react';
import { View, Text, Button, TextInput, ListView } from 'react-native'; 
import {Card} from 'react-native-elements';
import firebase from 'firebase';
import TextInputField from '../components/TextInputField.js';
import SignInForm from '../SignInForm/SignInForm.js';
import styles from './styles.js';

class Comments extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2})
		};
		this.itemsRef = firebase.database().ref('posts/' + this.props.navigation.state.params.time + "/comments/");
	}
	state = { post: '', error: '', loading: false, username: '', submit: false };
	static navigationOptions = { title: 'Comments'};

	componentWillMount() {
		this.getUsername();
	}
	
	componentDidMount() {
		this.listenForItems(this.itemsRef);
	}

	getUsername() {
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				this.setState({username: user.email.substring(0, email.length - 13)});
			}
		});
	}
	
	onPostPress() {
		this.setState({ error: '', loading: true });
		const { post, username } = this.state;
		
		time = new Date();
		filepath = "posts/" + this.props.navigation.state.params.time + "/comments/" + time.toString();
		firebase.database().ref(filepath).set({
			post: post,
			username: username,
			time: time.toString()
		})
		.then(() => {
			this.setState({ error: '', loading: false, post: '' });
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
				this.setState({ error: '', loading: false, post: '' });
			})
			.catch(() => {
				this.setState({ error: 'Database failed.', loading: false });
			})
		}
	}

	renderButtonOrLoading() {
		const { navigate } = this.props.navigation;
		const { username, post } = this.state;
		if (this.state.loading) {
			return <Text>Loading...</Text>
		}
		if (this.state.post != '') {
			return (
				<View>
					<Button onPress={this.onPostPress.bind(this)} title="Comment" />
				</View>
			);
		}
		else {
			return (
				<View>
					<Button onPress={this.errorMessage.bind(this)} title="Comment" />
				</View>
			);
		}
	}

	errorMessage() {
		if (this.state.post === '') {
			this.setState({ error: 'Cannot write empty comment' });
		}
	}

	renderItem(item) {
		return (
		<Card>
			<View>
				<Text>{item.username}</Text>
				<Text>{item.time}</Text>
				<Text>{item.post}</Text>
			</View>
		</Card>
		)
	}

	listenForItems(itemsRef) {
		itemsRef.on('value', snap => {
			var items = [];
			snap.forEach((child) => {
				items.push({
					post: child.val().post,
					username: child.val().username,
					time: child.val().time,
					_key: child.key
				});
			});

			this.setState({
				dataSource: this.state.dataSource.cloneWithRows(items)
			});
		});
	}

	render() {
		return (
			<View> 			
				<TextInput
					editable = {true}
					maxLength = {1000}
					placeholder='Write a comment'
					value={this.state.post}
					onChangeText={post => this.setState({ post })}
				/>
				<Text style={styles.errorTextStyle}>
					{this.state.error}
				</Text>
				{this.renderButtonOrLoading()}
				<Card>
					<View>
						<Text>{this.props.navigation.state.params.username}</Text>
						<Text>{this.props.navigation.state.params.time}</Text>
						<Text>{this.props.navigation.state.params.post}</Text>
						<ListView
							dataSource={this.state.dataSource}
							renderRow={this.renderItem} />
					</View>
				</Card>
			</View>
		);
	}
}

export default Comments;