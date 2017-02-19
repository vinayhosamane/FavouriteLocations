import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Navigator,
  Alert
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

export default class CreateAccountScreen extends Component{

  constructor(props) {
      super(props)
      console.log(this.props);
      this.state = {
          name: 'MaxTech Login-->',
          newUsername: '',
          newPassword: '',
          confirmPassword: '',
          isLoading: false,
      }
  }

  _handleLogoutPress(event) {
     this.setState({isLoading: false});
      this.props.navigator.pop();
  }

  _handleCreateAccountButtonAction(event) {
      this.setState({isLoading: true});
      username = this.state.newUsername;
      password = this.state.newPassword;
      confirmPasswordText = this.state.confirmPassword;
    
    if(password == confirmPasswordText)
      {
         firebase.auth().createUserWithEmailAndPassword(username, password).then((userData) => {
            this.setState({isLoading: false});
            Alert.alert('Signup Alert', 'Your account created successfully.', [{text: 'OK', onPress: () => this.props.navigator.pop()}])
      }).catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            this.setState({isLoading: false});
            Alert.alert('Signup Error', errorMessage, [{text: 'OK', onPress: () => console.log('Enter valid password')}])
      });
      }
    
    else
      {
        this.setState({isLoading: false});
         Alert.alert('Signup Error', 'Texts in Password and Confirm-Password Fields are not same!', [{text: 'OK', onPress: () => console.log('Enter valid password in both the fields')}])
      }
     
  }

 _navigate(name, type='Normal') {
        this.props.navigator.push({
            component: First,
            passProps: {name: name},
            type: type
        })
  }

 render() {
   return (
          <View style={styles.container_Second_2}>
       <Spinner visible={this.state.isLoading} size="large" color="white"/>
            <View style={styles.halfHeight_Second_2}>
              <Button style={{borderWidth: 0, borderColor: 'white',textAlign:'left',color:'white',marginLeft:10,position:'absolute',left:2,top:10}}
                      onPress={this._handleLogoutPress.bind(this)}>
                      ◀️ Back
              </Button>
            </View>

            <View style={styles.quarterHeight1_Second_2}>
                <Text style={styles.bullsWelcome}>
                  Please Fill the Form
                </Text>
                <TextInput ref="usr"
                           style={{height: 40, borderColor: 'gray', borderWidth: 1 , marginTop: 6 , padding : 10 , marginLeft : 5 , marginRight : 5 , marginBottom:3}}
                           placeholder= "Username@domain.com"
                           placeholderTextColor = '#a52a2a'
                           returnKeyType = {"next"}
                           autoFocus = {false}
                           autoCapitalize = "none"
                           autoCorrect = {false}
                           clearButtonMode = 'while-editing'
                           onChangeText={(text) => {
                              this.setState({newUsername:text});
                            }}
                            onSubmitEditing={(event) => {
                              this.refs.psw1.focus();
                            }}
                  />
                  <TextInput ref="psw1"
                             style={{height: 40, borderColor: 'gray', borderWidth: 1 , marginTop: 6,marginLeft : 5 ,padding : 10 , marginRight : 5}}
                             placeholder= "Password"
                             placeholderTextColor = '#a52a2a'
                             autoCapitalize = "none"
                             autoCorrect = {false}
                             returnKeyType = {'done'}
                             secureTextEntry = {true}
                             clearButtonMode = 'while-editing'
                             onChangeText={(text) => {
                                this.setState({newPassword:text});
                              }}
                              onSubmitEditing={(event) => {
                                this.refs.psw2.focus();
                              }}
                  />
                  <TextInput ref="psw2"
                             style={{height: 40, borderColor: 'gray', borderWidth: 1 , marginTop: 6,marginLeft : 5 ,padding : 10 , marginRight : 5}}
                             placeholder= "Confirm Password"
                             placeholderTextColor = '#a52a2a'
                             autoCapitalize = "none"
                             autoCorrect = {false}
                             returnKeyType = {'done'}
                             secureTextEntry = {true}
                             clearButtonMode = 'while-editing'
                             onChangeText={(text) => {
                                this.setState({confirmPassword:text});
                             }}
                   />
                   <Button style={{borderWidth: 0, borderColor: 'white'}}
                           onPress={this._handleCreateAccountButtonAction.bind(this)}>
                           {"\n"}
                           {"\n"}
                           Create Account
                   </Button>
             </View>

             <View style={styles.quarterHeight2_Second_2}>
              
             </View>

               <AdMobManager bannerSize = {bannerSize} testDeviceID = {testDeviceID} adUnitID = {adUnitID}/>
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
      bullsWelcome: {
          textAlign: 'center',
          color: '#333333',
          fontWeight: "bold",
          marginTop: 3,
      },
      quarterHeight2_Second_2: {
          flex: .41,
          alignItems: 'center',
         backgroundColor: '#fffaf0'
      }
});
