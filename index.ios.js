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
  TextInput,
  TouchableHighlight,
  Navigator,
  NavigatorIOS,
  ActivityIndicator,
  ListView,
  Image,
  Alert,
  DatePickerIOS,
  TouchableOpacity,
  Dimensions,
  Linking
} from 'react-native';

import Button from 'react-native-button';
import Icon from 'react-native-vector-icons';
import * as firebase from 'firebase';
import MapView from 'react-native-maps'
import Geocoder from 'react-native-geocoder';
import Share from 'react-native-share';

import First from './components/First.js';
import Spinner from './components/Spinner.js';
import AdMobManager from './components/AdMobManager';

var bannerSize="smartBannerPortrait"
var testDeviceID="EMULATOR"
var adUnitID="ca-app-pub-3940256099942544/2934735716"

//Forgot Password screen

//End - Forgot Password Screen

//FavouriteLocationsFromHomeScreen

//End - FavouriteLocationsFromHomeScreen

class FavouriteLocations extends Component {

  constructor(props)
  {
    super(props);

    this.state = {
      // username : "Please enter the text",
      // password : "Please enter the Password"
    };
  }

 renderScene(route, navigator) {
   return <route.component navigator={navigator} {...route.passProps} />
  }

  configureScene(route, routeStack){
   if(route.type == 'Modal') {
     return Navigator.SceneConfigs.FloatFromBottom
   }
   return Navigator.SceneConfigs.PushFromRight
  }

  render() {
    return (
      <Navigator
        configureScene={ this.configureScene }
        style={{ flex:1 }}
        initialRoute={{ component: First }}
        renderScene={ this.renderScene } />
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
        marginTop: 10,
        fontWeight: "bold",
        color: 'white',
        backgroundColor: '#FF3366'
    },
    button: {
        flex: 1,
        textAlign: 'center',
        color: '#008b8b',
        marginTop: 20,
        height: 60,
        fontSize: 30,
        backgroundColor: '#f08080',
    },
    bullsWelcome: {
        textAlign: 'center',
        color: '#333333',
        fontWeight: "bold",
        marginTop: 3,
    },
    HelpScreen: {
        textAlign: 'left',
        color: '#333333',
        marginTop: 3,
        marginLeft: 3
    },
    _secondScreen_topbar: {
        flex: 1,
        backgroundColor: '#FF3366'
    },
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
    quarterHeight1_Second_3: {
        flex: .93,
        backgroundColor: '#fffaf0'
    },
    forgotScreenLabels: {
        textAlign: 'center',
        marginTop: 15,
        fontWeight: "bold",
        color: 'white',
        backgroundColor: '#FF3366'
    },
    selectedDate: {
        backgroundColor: 'rgba(0,0,0,0)',
        color: '#000',
    },
    separator: {
        flex: 1,
        height: 4,
        backgroundColor: '#8E8E8E',
        marginTop: 10,
    },
    instructionsShare: {
        marginTop: 10,
        marginBottom: 10,
        flexDirection: 'row'
    },
    backgroundImageShare: {
        marginTop: 1,
        width: 40,
        height: 30,
        marginRight: 50,
        alignItems: 'flex-end'
    },
    backgroundImageMap: {
        marginTop: 1,
        width: 40,
        height: 30,
        marginRight: 100,
        alignItems: 'flex-end'
    },
    backgroundImageDelete: {
        marginTop: 1,
        width: 40,
        height: 30,
        marginRight: 140,
        alignItems: 'flex-end'
    },
    spinner: {
        marginBottom: 50
    },
    centering: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});

AppRegistry.registerComponent('FavouriteLocations', () => FavouriteLocations);
