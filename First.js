
import React, { Component } from 'react';

var Second = require('Second');
var CaptureLocationsScreen = require('CaptureLocationsScreen');

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NavigatorIOS,
  Image,
  TouchableHighlight,
  Navigator,
  ListView,
  ActivityIndicatorIOS,
  ScrollView
} from 'react-native';


class First extends React.Component{
  constructor(props) {
    super(props)
  console.log(this.props);
  this.state = { name: 'MaxTech Login-->' }
}

_navigate(name, type='Normal') {
  this.props.navigator.push({
    component: Second,
    passProps: {
      name: name
    },
    type: type
  })
}

_onPressLike()
{
  alert("Like button presses")
}

_onPressQuickGuide()
{
  alert("Quick guide Pressed")
}

  render() {
    return (
      <View style = {styles.mainContainer}>
      <View style={styles.container}>

      <View style={styles.toolbar}>
                      <TouchableHighlight onPress={this._onPressQuickGuide} underlayColor='blue'>
                    <Text style={styles.toolbarButton}>Quick guide</Text>
                      </TouchableHighlight>
                    <Text style={styles.toolbarTitle}>Welcome to MaxTech</Text>
                    <TouchableHighlight onPress={this._onPressLike} underlayColor='blue'>
                    <Image source={{uri:"/Users/vhosb/HelloWorld/ios/HelloWorld/Images.xcassets/like.png.imageset/like.png"}}  style={styles.backgroundImageToolBar}></Image>
                    </TouchableHighlight>
      </View>

  <Image source={{uri:"/Users/vhosb/HelloWorld/ios/HelloWorld/Images.xcassets/MaxTech.jpg.imageset/MaxTech.jpg"}}  style={styles.backgroundImage}>

    <View>
    <TouchableHighlight onPress={() => this._navigate('Presssssed')} underlayColor='blue'>
     <Text style = {styles.welcome}>
     MaxTech Login
     </Text>
     </TouchableHighlight>
     </View>

    </Image>
      </View>
      </View>
    );
  }
  }

  module.exports =First;
