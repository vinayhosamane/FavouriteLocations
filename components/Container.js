/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  StatusBar
} from 'react-native';

import FavouriteLocations from './FavouriteLocations.js';

import {Scene, Reducer, Router, Switch, TabBar, Modal, Actions} from 'react-native-router-flux'

class Container extends Component {

  render() {
    return (
      <Router navigationBarStyle={containerStyles.navBar} titleStyle={containerStyles.navBarTitle} barButtonTextStyle={containerStyles.barButtonTextStyle} barButtonIconStyle={containerStyles.barButtonIconStyle}>
         <Scene key="modal" component={Modal} >
           <Scene key="root">
             <Scene key="FavouriteLocations" component={FavouriteLocations} title="FavouriteLocations" hideNavBar={true} initial>

             </Scene>
           </Scene>
        </Scene>
      </Router>
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
  }
});

const containerStyles = StyleSheet.create({
  navBar: {
    backgroundColor:'rgb(55,55,55)',
  },
  navBarTitle:{
    color:'#ffffff',
  },
  barButtonTextStyle:{
    color:'#FFFFFF'
  },
  barButtonIconStyle:{
    tintColor:'#FFFFFF'
  }
});

module.exports = Container
