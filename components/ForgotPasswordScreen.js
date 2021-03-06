
import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Navigator,
  Alert,
  StatusBar
} from 'react-native';

import Button from 'react-native-button';
import * as firebase from 'firebase';

import First from './First.js';
import Spinner from './Spinner.js';

import AdMobManager from './AdMobManager';
var bannerSize="smartBannerPortrait"

if(__DEV__)
  {
    var testDeviceID="EMULATOR"
var adUnitID="ca-app-pub-6988619974528181/2050848152"
  }
else
  {
    var testDeviceID=""
var adUnitID="ca-app-pub-6988619974528181/2050848152"
}

export default class ForgotPasswordScreen extends Component {

  constructor(props) {
      super(props)
      console.log(this.props);
      this.state = {
          name: 'MaxTech Login-->',
          emailAddress: '',
         isLoading: false
      }
  }

  _handleLogoutPress(event) {
     this.setState({isLoading: false});
    this.props.navigator.pop();
  }

  _handleProfileValidate(event) {
      var email = this.state.emailAddress
      
      if(email)
        {
           this.setState({isLoading: true});
      firebase.auth().sendPasswordResetEmail(email).then(()=> {
        // Email sent.
        this.setState({isLoading: false});
        Alert.alert('Password Reset Alert', 'Password Reset mail sent to '+email, [{text: 'OK', onPress: () => this.props.navigator.pop()}])
      }, (error) => {
        this.setState({isLoading: false});
        var errorCode = error.code;
        var errorMessage = error.message;
        Alert.alert('Password Reset Error', errorMessage, [{text: 'OK', onPress: () => console.log('Password reset error')}])
      });
        }
    
    else
      {
         this.setState({isLoading: false});
          Alert.alert('Validation Error', 'Please enter valid email address in input field.', [{text: 'OK', onPress: () => console.log('Password reset error')}])
      }
     
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
         <Spinner visible={this.state.isLoading} size="large" color="white"/>
            <StatusBar backgroundColor="rgb(55,55,55)" barStyle="light-content"/>
             <View style={styles.halfHeight_Second_2}>
               <Button
                 style={styles.backButtonStyle}
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
        backgroundColor: '#FF3366',
        justifyContent: 'center'
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
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        backgroundColor: '#fffaf0',
    },
    backButtonStyle: {
      borderColor: 'white',
      color: 'white',
      alignSelf: 'flex-start'
    },
});
