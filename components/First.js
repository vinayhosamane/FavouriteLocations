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
  StatusBar,
  TouchableWithoutFeedback
} from 'react-native';

import Button from 'react-native-button';
import Icon from 'react-native-vector-icons';
import Spinner from './Spinner.js';
import DismissKeyBoard from 'react-native-dismiss-keyboard'

import AdMobManager from './AdMobManager';
var bannerSize="smartBannerPortrait"
var testDeviceID="EMULATOR"
var adUnitID="ca-app-pub-3940256099942544/2934735716"

import * as firebase from 'firebase';
import Second from './Second.js';
import ForgotPasswordScreen from './ForgotPasswordScreen.js'
import CreateAccountScreen from './CreateAccountScreen.js';

// var config = {
//     apiKey: "AIzaSyAFT0VK-KEMRiaqzlP2m1qpFodP1DNqm-8",
//     authDomain: "my-favourite-locations.firebaseapp.com",
//     databaseURL: "https://my-favourite-locations.firebaseio.com",
//     storageBucket: "my-favourite-locations.appspot.com",
// };
// const firebaseApp = firebase.initializeApp(config);
// const itemsRef = firebase.database();

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
      // if(username!='' && password!='') {
        this.setState({isLoading: true});
        var user = firebase.auth().signInWithEmailAndPassword(this.state.username, this.state.password).then((userData) => {
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
    // }
    // else {
    //   Alert.alert('Login Error', 'Please enter valid Username and Pssword.If you have forgotten the password click Forgot Password Button below.', [{text: 'Thank you!', onPress: () => console.log('OK Pressed!')}])
    // }
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
      <TouchableWithoutFeedback onPress={() => DismissKeyBoard()}>
      <View style={styles.container1}>
          <Spinner visible={this.state.isLoading} size="large" color="white"/>
          <StatusBar backgroundColor="rgb(55,55,55)" barStyle="light-content"/>
         <View style={styles.halfHeight}>
           <Image source={require('../images/map.jpg')}  style={styles.backgroundImageToolBar}></Image>
         </View>

         <View style={styles.quarterHeight1}>
           <Text style={styles.bullsWelcome}>
             Welcome to Favourite Locations 
           </Text>
           <TextInput ref="usr"
                    style={styles.usernameFieldStyle}
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
                    style={styles.passwordFieldStyle}
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

         <View style={styles.quarterHeight2}>
           <Button style={{borderWidth: 0, borderColor: 'blue' }} onPress={this._handleLoginPress.bind(this)}>
                   Login
            </Button>
            <Button style={{borderWidth: 0, borderColor: 'white', marginTop:20}} onPress={this._handleForgotPassword.bind(this)}>
                    Forgot Password?
            </Button>
            <Button style={{borderWidth: 0, borderColor: 'white', marginTop:20}} onPress={this._handleCreateAccount.bind(this)}>
                    Create Account!
            </Button>
         </View>
         <View style={styles.quarterHeight3}>
         <AdMobManager bannerSize = {bannerSize} testDeviceID = {testDeviceID} adUnitID = {adUnitID}/>
         </View>
      </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
    container1: {
        flex: 1,
    },
    halfHeight: {
        flex: .45,
    },
    quarterHeight1: {
        flex: .19,
        justifyContent: 'center',
        backgroundColor: '#fffaf0'
    },
    quarterHeight2: {
        flex: .27,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fffaf0'
    },
    quarterHeight3: {
        flex: 0.09,
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    backgroundImageToolBar: {
        flex: 1,
        marginTop: 1,
        width: 420,
        height: 100,
        resizeMode: 'cover',
        alignItems: 'center'
    },
    bullsWelcome: {
        textAlign: 'center',
        color: '#333333',
        fontWeight: "bold",
        marginBottom: 10
    },
    usernameFieldStyle: {
        height: 35,
        borderColor: 'gray',
        borderWidth: 1,
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 10,
        paddingLeft: 5
    },
    passwordFieldStyle: {
        height: 35,
        borderColor: 'gray',
        borderWidth: 1,
        marginLeft: 5,
        marginRight: 5,
        paddingLeft: 5
    }
});
