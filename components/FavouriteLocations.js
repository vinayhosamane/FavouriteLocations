import React, { Component } from 'react';

import {
  Navigator,
} from 'react-native';

import First from './First.js';
import Second from './Second.js';
import fetchNotes from "../AsyncManager/AsyncManager.js";
import * as firebase from 'firebase';

export default class FavouriteLocations extends Component {

  constructor(props) {
      super(props)
      this.state = {
       Email : '',
       Password: '',
       persistant:false
      };
  }

  componentWillMount(){

    var email = '';
    var psw = '';
    fetchNotes.getNote("userEmail",function(response){
        this.setState({Email:response});
    });
    fetchNotes.getNote("userPassword",function(response){
        this.setState({Password:response});
    });

    if (this.state.Email && this.state.Password) {
      var user = firebase.auth().signInWithEmailAndPassword(this.state.newUsername, this.state.newPassword).then((userData) => {

      this.setState({persistant:true});

     }).catch((error)=> {
        var errorCode = error.code;
        var errorMessage = error.message;
      this.setState({persistant:false});
        if(error) {
          Alert.alert('Login Error', errorMessage, [{text: 'Thank you!', onPress: () => console.log('OK Pressed!')}])
        }
    });
  }else {
    this.setState({persistant:false});
  }

  }

  renderScene(route, navigator) {
      return <route.component navigator={navigator} {...route.passProps} />
  }

  configureScene(route, routeStack) {
      if(route.type == 'Modal') {
        return Navigator.SceneConfigs.FloatFromBottom
      }
      return Navigator.SceneConfigs.PushFromRight
  }

  render() {

    if(this.state.persistant){
      return (
        <Navigator configureScene={ this.configureScene }
                   style={{ flex:1 }}
                   initialRoute={{ component: Second }}
                   renderScene={ this.renderScene } />
      );

    }
    return (
      <Navigator configureScene={ this.configureScene }
                 style={{ flex:1 }}
                 initialRoute={{ component: First }}
                 renderScene={ this.renderScene } />
    );


  }
}
