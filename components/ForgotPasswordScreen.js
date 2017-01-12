
import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Navigator,
  Alert
} from 'react-native';

import Button from 'react-native-button';
import * as firebase from 'firebase';

import First from './First.js';
import Spinner from './Spinner.js';

import AdMobManager from './AdMobManager';
var bannerSize="smartBannerPortrait"
var testDeviceID="EMULATOR"
var adUnitID="ca-app-pub-3940256099942544/2934735716"

export default class ForgotPasswordScreen extends Component {

  constructor(props) {
      super(props)
      console.log(this.props);
      this.state = {
          name: 'MaxTech Login-->',
          emailAddress: '',
      }
  }

  _handleLogoutPress(event) {
    this.props.navigator.pop();
  }

  _handleProfileValidate(event) {
      var email = this.state.emailAddress
      this.setState({isLoading: false});
      firebase.auth().sendPasswordResetEmail(email).then(()=> {
        // Email sent.
        this.setState({isLoading: false});
        Alert.alert('Password Reset Alert', 'Password Reset mail sent to '+email, [{text: 'OK', onPress: () => console.log('OK Pressed!')/*this.props.navigator.pop()*/}])
      }, (error) => {
        this.setState({isLoading: false});
        var errorCode = error.code;
        var errorMessage = error.message;
        Alert.alert('Password Reset Error', errorMessage, [{text: 'OK', onPress: () => console.log('Password reset error')}])
      });
    }

  _navigate(name, type = 'Normal') {
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

 render() {
   return (
          <View style={styles.container_Second_2}>

             <View style={styles.halfHeight_Second_2}>
             <Button
               style={{borderWidth: 0, borderColor: 'white',textAlign:'left',color:'white',marginLeft:10,position: 'absolute',left:2,top:10}}
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
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    quarterHeight2_Second_2: {
        flex: .41,
        alignItems: 'center',
        backgroundColor: '#CCC',
    }
});
