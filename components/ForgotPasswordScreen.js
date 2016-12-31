
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
import CreateAccountScreen from './CreateAccountScreen.js';

export default class ForgotPasswordScreen extends React.Component{

  constructor(props) {
    super(props)
  console.log(this.props);
  this.state = { name: 'MaxTech Login-->',
  emailAddress: '',
 }
}

  _handleLogoutPress(event) {
  console.log('Logout Pressed!');

 this.props.navigator.pop();
  }

  _handleProfileValidate(event) {
  console.log('Validation done!');

  var email = this.state.emailAddress

    this.setState({isLoading: false});

  firebase.auth().sendPasswordResetEmail(email).then(()=> {
    // Email sent.
      this.setState({isLoading: false});
    Alert.alert(
           'Password Reset Alert',
           'Password Reset mail sent to '+email,
           [
             //{text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
             {text: 'OK', onPress: () => console.log('OK Pressed!')/*this.props.navigator.pop()*/},
           ]
         )
  }, (error) =>{
    // An error happened.
      this.setState({isLoading: false});
    var errorCode = error.code;
    var errorMessage = error.message;
    Alert.alert(
           'Password Reset Error',
           errorMessage,
           [
             //{text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
             {text: 'OK', onPress: () => console.log('Password reset error')},
           ]
         )
  });
 // this.props.navigator.pop();
  }

_navigate(name, type='Normal') {
  this.props.navigator.push({
    component: First,
    passProps: {
      name: name
    },
    type: type
  })
}

onDateChange(date) {
  this.setState({ date: date });
}

// componentDidMount() {
//    //AdMobInterstitial.setTestDeviceID('EMULATOR');
//    AdMobInterstitial.setAdUnitId('ca-app-pub-6988619974528181/2050848152');
//
//    AdMobInterstitial.addEventListener('interstitialDidLoad',
//      () => console.log('interstitialDidLoad event'));
//    AdMobInterstitial.addEventListener('interstitialDidClose',
//      this.interstitialDidClose);
//    AdMobInterstitial.addEventListener('interstitialDidFailToLoad',
//      () => console.log('interstitialDidFailToLoad event'));
//    AdMobInterstitial.addEventListener('interstitialDidOpen',
//      () => console.log('interstitialDidOpen event'));
//    AdMobInterstitial.addEventListener('interstitialWillLeaveApplication',
//      () => console.log('interstitalWillLeaveApplication event'));
//
//    AdMobInterstitial.requestAd((error) => error && console.log(error));
//  }
//
//  componentWillUnmount() {
//    AdMobInterstitial.removeAllListeners();
//  }
//
//  interstitialDidClose() {
//    console.log('interstitialDidClose event');
//    AdMobInterstitial.requestAd((error) => error && console.log(error));
//  }
//
//  showInterstital() {
//    AdMobInterstitial.showAd((error) => error && console.log(error));
//  }

 render() {
   return (
          <View style={styles.container_Second_2}>
             <View style={styles.halfHeight_Second_2}>
             <Button
               style={{borderWidth: 0, borderColor: 'white',textAlign:'left',marginTop:17 ,color:'white',fontSize: 20,marginLeft:10,position: 'absolute',left:2}}
               //onPress={this._handleLoginPress.bind(this)}>
               onPress={this._handleLogoutPress.bind(this)}>
              ◀️ Back
             </Button>
             </View>
             <View style={styles.quarterHeight1_Second_2}>

             <Text style={styles.welcome}> Please enter your valid email id (username) </Text>
             <TextInput
             ref="forgot_screen"
             style={{height: 40, borderColor: 'gray', borderWidth: 1 , marginTop: 6,marginLeft : 5 ,padding : 10 , marginRight : 5}}
             placeholder= "name@domain.com"
             placeholderTextColor = '#a52a2a'
             autoCapitalize = "none"
             autoCorrect = {false}
             returnKeyType = {'done'}
             secureTextEntry = {false}
             clearButtonMode = 'while-editing'
             // onChange={(event) => this.updateText(
             //      'onChange text: ' + event.nativeEvent.text
             //    )}
             onChangeText={(text) => {
                 this.setState({emailAddress:text});
               }}
             />

             <Button
               //style={{borderWidth: 0, borderColor: 'white',textAlign:'center',marginTop:17 ,color:'grey',fontSize: 20}}
               //onPress={this._handleLoginPress.bind(this)}>
               onPress={this._handleProfileValidate.bind(this)}>
              {"\n"}
              Reset Password
             </Button>

             </View>
             <View style={styles.quarterHeight2_Second_2}>
              <AdMobManager
                 bannerSize = {bannerSize}
                 testDeviceID = {testDeviceID}
                 adUnitID = {adUnitID}
               />
               <Spinner visible={this.state.isLoading} size="large" color="red"/>
              </View>
          </View>
   );
 }
};

const styles = StyleSheet.create({
  container_Second_2: {
      flex: 1,
      flexDirection: 'column'
  },
  halfHeight_Second_2: {
      flex: .07,
      backgroundColor: '#FF3366'
  },
  quarterHeight1_Second_2: {
      flex: .52,
      backgroundColor: '#fffaf0'
  },
  quarterHeight2_Second_2: {
      flex: .41,
      alignItems: 'center',
      backgroundColor: '#CCC',
  },
  welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
  }
});
