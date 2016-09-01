/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
var Button = require('react-native-button');
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight
} from 'react-native';

class FavouriteLocations extends Component {
  constructor(props)
  {
    super(props);

    this.state = {
      // username : "Please enter the text",
      // password : "Please enter the Password"
    };
  }

  _handlePress(event) {
console.log('Pressed!');

 var username = this.state.username;
 var password = this.state.password;

 console.log(username);
 console.log(password);
}

  render() {
    return (
      <View style={styles.container}>

      <TextInput
      ref="usr"
      style={{height: 40, borderColor: 'gray', borderWidth: 1 , marginTop: 10 , padding : 10 , marginLeft : 5 , marginRight : 5 }}
      placeHolder= "Enter username "
      placeholderTextColor = '#a52a2a'

      returnKeyType = {"next"}
      autoFocus = {true}
      autoCapitalize = "none"
      autoCorrect = {false}
      clearButtonMode = 'while-editing'
      // onChange={(event) => this.updateText(
      //      'onChange text: ' + event.nativeEvent.text
      //    )}
      onChangeText={(text) => {
          this.setState({username:text});
        }}
      onSubmitEditing={(event) => {
     this.refs.psw.focus();

      }}
      />

      <TextInput
      ref="psw"
      style={{height: 40, borderColor: 'gray', borderWidth: 1 , marginTop: 10,marginLeft : 5 , marginRight : 5}}
      placeholder= "Enter password"
      placeholderTextColor = '#a52a2a'
      autoCapitalize = "none"
      autoCorrect = {false}
      returnKeyType = {'done'}
      secureTextEntry = {true}
      clearButtonMode = 'while-editing'
      // onChange={(event) => this.updateText(
      //      'onChange text: ' + event.nativeEvent.text
      //    )}
      onChangeText={(text) => {
          this.setState({password:text});
        }}
      />

      <Button
        style={{borderWidth: 1, borderColor: 'blue'}}
        onPress={this._handlePress.bind(this)}>
        Login
      </Button>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  button: {
   textAlign: 'center',
   color: '#ffffff',
   marginBottom: 7
 }
});

AppRegistry.registerComponent('FavouriteLocations', () => FavouriteLocations);
