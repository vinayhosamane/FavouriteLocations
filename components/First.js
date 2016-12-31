import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Navigator,
  NavigatorIOS,
  Image,
  Alert,
} from 'react-native';

import Button from 'react-native-button';
import Icon from 'react-native-vector-icons';
import Spinner from './Spinner.js';

import AdMobManager from './AdMobManager';
var bannerSize="smartBannerPortrait"
var testDeviceID="EMULATOR"
var adUnitID="ca-app-pub-3940256099942544/2934735716"

import * as firebase from 'firebase';
import Second from './Second.js';
import ForgotPasswordScreen from './ForgotPasswordScreen'
import CreateAccountScreen from './CreateAccountScreen.js';

export default class First extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
        name: 'MaxTech Login-->',
        username: '',
        password: '',
        loading: false,
        loggedIn: false,
        index: 0,
        types: ['CircleFlip', 'Bounce', 'Wave', 'WanderingCubes', 'Pulse', 'ChasingDots', 'ThreeBounce', 'Circle', '9CubeGrid', 'WordPress', 'FadingCircle', 'FadingCircleAlt', 'Arc', 'ArcAlt'],
        size: 100,
        color: "#FFFFFF",
        isLoading: false,
    };
    console.disableYellowbox = true;
}

_handleLoginPress(event) {
    this._navigate('Login_Screen_Clicked');
    // <CaptureLocationsScreen />
}

_handleCreateAccount(event) {
    this._navigate('Create_Account_Clicked');
    // <CaptureLocationsScreen />
}

_handleForgotPassword(event) {
    this._navigate('Forgot_Password_Clicked');
    // <CaptureLocationsScreen />
}

_navigate(name, type='Normal') {
  var username = this.state.username;
  var password = this.state.password;
  var status = false;

  if(name == 'Login_Screen_Clicked') {
      if(username!='' && password!='') {
        this.setState({isLoading: true});
        var user = firebase.auth().signInWithEmailAndPassword(username, password).then((userData) => {
          this.setState({loggedIn: true});
          this.setState({isLoading:false})
          this.refs.usr.setNativeProps({text: ''});
          this.refs.psw.setNativeProps({text: ''});
          this.setState({username: '', password: ''});
          this.props.navigator.push({
              component: Second,
              passProps: {name: name},
              type: type
          })
       }).catch((error)=> {
          var errorCode = error.code;
          var errorMessage = error.message;
          this.setState({isLoading: false});
          if(error) {
            Alert.alert('Login Error', errorMessage, [{text: 'Thank you!', onPress: () => console.log('OK Pressed!')}])
          }
      });
    }
    else {
      Alert.alert('Login Error', 'Please enter valid Username and Pssword.If you have forgotten the password click Forgot Password Button below.', [{text: 'Thank you!', onPress: () => console.log('OK Pressed!')}])
    }
  }
  if(name == 'Create_Account_Clicked') {
      this.props.navigator.push({
          component: CreateAccountScreen ,
          passProps: {name: name},
          type: type
      })
  }
  if(name == 'Forgot_Password_Clicked') {
      this.props.navigator.push({
          component:ForgotPasswordScreen ,
          passProps: {name: name},
          type: type
        })
  }
}

componentWillMount() {
    this.setState({loggedIn : false});
  }

  render() {
    return (
      <View style={styles.container1}>
          <Spinner visible={this.state.isLoading} size="large" color="white"/>
         <View style={styles.halfHeight}>
           <Image source={require('../images/map.jpg')}  style={styles.backgroundImageToolBar}></Image>
         </View>

         <View style={styles.quarterHeight1}>
           <Text style={styles.bullsWelcome}>
             Welcome to React-Native Favourite Locations
           </Text>
           <TextInput ref="usr"
                    style={{height: 40, borderColor: 'gray', borderWidth: 1 , marginTop: 6 , padding : 10 , marginLeft : 5 , marginRight : 5 , marginBottom:3}}
                    placeholder= "Enter username"
                    placeholderTextColor = '#a52a2a'
                    returnKeyType = {"next"}
                    autoFocus = {false}
                    autoCapitalize = "none"
                    autoCorrect = {false}
                    clearButtonMode = 'while-editing'
                    onChangeText={(text) => {
                      this.setState({username:text});
                    }}
                    onSubmitEditing={(event) => {
                      this.refs.psw.focus();
                    }}
            />
            <TextInput
                    ref="psw"
                    style={{height: 40, borderColor: 'gray', borderWidth: 1 , marginTop: 6,marginLeft : 5 ,padding : 10 , marginRight : 5}}
                    placeholder= "Enter password"
                    placeholderTextColor = '#a52a2a'
                    autoCapitalize = "none"
                    autoCorrect = {false}
                    returnKeyType = {'done'}
                    secureTextEntry = {true}
                    clearButtonMode = 'while-editing'
                    onChangeText={(text) => {
                      this.setState({password:text});
                    }}
            />
         </View>

         <View style={[styles.quarterHeight2, {backgroundColor: '#fffaf0', alignItems: 'center'}]}>
           <Button style={{borderWidth: 0, borderColor: 'blue' }} onPress={this._handleLoginPress.bind(this)}>
                   Login
            </Button>
            <Button style={{borderWidth: 0, borderColor: 'white', marginTop:20}} onPress={this._handleForgotPassword.bind(this)}>
                    Forgot Password?
            </Button>
            <Button style={{borderWidth: 0, borderColor: 'white', marginTop:20}} onPress={this._handleCreateAccount.bind(this)}>
                    Create Account!
            </Button>
            <AdMobManager bannerSize = {bannerSize} testDeviceID = {testDeviceID} adUnitID = {adUnitID}/>
         </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container1: {
        flex: 1,
        flexDirection: 'column'
    },
    halfHeight: {
        flex: .5,
        backgroundColor: '#FF3366'
    },
    backgroundImageToolBar: {
        flex: 1,
        marginTop: 1,
        width: 420,
        height: 100,
        resizeMode: 'cover',
        alignItems: 'center'
    },
    quarterHeight1: {
        flex: .19,
        backgroundColor: '#fffaf0'
    },
    bullsWelcome: {
        textAlign: 'center',
        color: '#333333',
        fontWeight: "bold",
        marginTop: 3,
    },
    quarterHeight2: {
        flex: .31,
        backgroundColor: '#fffaf0'
    }
});
