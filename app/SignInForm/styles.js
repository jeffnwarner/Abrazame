'use strict';
import React, { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	errorTextStyle: {
		color: '#E64A19',
		alignSelf: 'center',
		paddingTop: 10,
		paddingBottom: 10
	},
	container:{
		flex:1,
		backgroundColor: 'rgb(89, 199, 255)',
		flexDirection: 'column',
	},
	logoContainer:{
		//alignItems: 'center',
		//justifyContent: 'center',
		flex: 1,
		height: 30,
		width: -60,
		//position: 'absolute',
		alignSelf: 'center'
	},
	logo:{
		width: 160,
		height:130,
	},
	infoContainer:{
		position: 'absolute',
		left: 0,
		right: 0,
		bottom: 0,
		padding: 50,
	},
 	input:{
		height: 40,
		backgroundColor: 'rgba(255,255,255,0.2)',
		color: '#fff',
		marginBottom:15,
		paddingHorizontal: 10,
		fontSize:19
	}
});

export default styles;