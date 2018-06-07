import React, { Component } from 'react';
import {Card} from 'react-native-elements';
import { View, Text, Button, TextInput, ListView, TouchableOpacity, Platform, TouchableNativeFeedback, TouchableElement } from 'react-native'; 
import firebase from 'firebase';
import TextInputField from '../components/TextInputField.js';
import SignInForm from '../SignInForm/SignInForm.js';
import styles from './styles.js';

class Feed extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			dataSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2})
		};
		this.itemsRef = firebase.database().ref('posts');
	}
	static navigationOptions = { title: 'Feed', headerLeft: null};


	componentDidMount() {
		this.listenForItems(this.itemsRef);
	}

	_navigateToComments(username, time, post) {
		const { navigate } = this.props.navigation;
		navigate('Comments', {username, time, post});	
	}

	renderItem(item) {
		return (
		<Card>
			<TouchableOpacity onPress={() => {this._navigateToComments(item.username, item.time, item.post)}}>
				<View>
					<Text>{item.username}</Text>
					<Text>{item.time}</Text>
					<Text>{item.post}</Text>
				</View>
			</TouchableOpacity>
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
		const { navigate } = this.props.navigation;


		return (
			<View style={styles.container}>
				<Button onPress={() => navigate('Map', {})} title="Map" />
				<Button onPress={() => navigate('NLP', {})} title="NLP" />
				<Button onPress={() => navigate('Post', {})} title="Make A Post" />
				<ListView
					dataSource={this.state.dataSource}
					renderRow={this.renderItem.bind(this)} />
			</View>
		);
	}
}

export default Feed;