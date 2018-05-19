import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Config from 'react-native-config';
import { StackNavigator } from 'react-navigation'; 
import SignInForm from '../SignInForm/SignInForm.js';
import RegisterForm from '../RegisterForm/RegisterForm.js';

const Navigation = StackNavigator({
	SignIn: {screen: SignInForm},
	Register: {screen: RegisterForm},
});

export default Navigation;
