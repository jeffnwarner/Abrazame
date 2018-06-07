import React, { Component } from 'react';
import {Card, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons';
import { View, Text, TextInput, ListView, TouchableHighlight, Platform, TouchableNativeFeedback, TouchableElement } from 'react-native'; 
import firebase from 'firebase';
import TextInputField from '../components/TextInputField.js';
import FeedList from './FeedList.js';
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

	componentDidMount() {
		this.listenForItems(this.itemsRef);
	}

	renderItem(item) {
		return (
		<Card style = {styles.cardcontainer}>
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
		const { navigate } = this.props.navigation;
		var TouchableElement = TouchableHighlight;
		if (Platform.OS === 'android') {
			TouchableElement = TouchableNativeFeedback;
		}

		return (
			<View style={styles.buttoncontainer}>
				<Button onPress={() => navigate('Map', {})} 
				title="Map"
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
				<Button onPress={() => navigate('NLP', {})} 
				title="NLP"
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
				<Button onPress={() => navigate('Post', {})} 
				title="Make A Post"
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
				<ListView
					dataSource={this.state.dataSource}
					renderRow={this.renderItem.bind(this)} />
			</View>
		);
	}
}

export default Feed;