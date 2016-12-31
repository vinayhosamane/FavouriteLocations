import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Navigator,
} from 'react-native';

import First from './First.js';
import AdMobManager from './AdMobManager';
import Button from 'react-native-button';
var bannerSize="smartBannerPortrait"
var testDeviceID="EMULATOR"
var adUnitID="ca-app-pub-3940256099942544/2934735716"

export default class HowToUseScreen extends Component {
  constructor(props) {
      super(props)
      this.state = {
          name: 'MaxTech Login-->'
      }
  }

  _handleLogoutPress(event) {
      this.props.navigator.pop();
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

 render() {
   return (
          <View style={styles.container_Second_2}>

             <View style={styles.halfHeight_Second_2}>
                <Button style={{borderWidth: 0, borderColor: 'white',textAlign:'left',marginTop:17 ,color:'white',fontSize: 20,marginLeft:10,position: 'absolute',left:2}}
                        onPress={this._handleLogoutPress.bind(this)}>
                        ◀️ Back
                </Button>
             </View>

             <View style={styles.quarterHeight1_Second_3}>
                <Text style={styles.HelpScreen}>
                      This App is written using React-Native provided by Facebook.{"\n"}
                </Text>
                <Text style={styles.HelpScreen}>
                    The Authentication is cloud ,which uses Firebase OAuth feature provided by Google.{"\n"}
                </Text>
                <Text style={styles.HelpScreen}>
                    Locations are saved in Cloud database hosted in Firebase Real time database and you can retrieve your data at anytime if you uninstall or re-install the app also.{"\n"}
                </Text>
                <Text style={styles.HelpScreen}>
                    This App helps you to Capture your Favourite location and give a tag line for it , we will store its complete address like lat,long,address and with your tagline in cloud database.{"\n"}
                </Text>
                <Text style={styles.HelpScreen}>
                  Next Version will have Enhancements like Signon using Google,Facebook..etc. and share the location and Navigate to the location.{"\n"}
                </Text>
                <Text style={styles.HelpScreen}>
                  This app is created with the special interest and I wish to make it open source so that many react-native learners could refer it before they create their own dream apps.{"\n"}
                </Text>
                <Text style={styles.HelpScreen}>
                  Github link to the app code is https://github.com/vinayhosamane/FavouriteLocations
                </Text>
                <Text style={styles.HelpScreen}>
                  For any information you can reach out me at vinayhosamane07@gmail.com
                </Text>
                <Text style={styles.HelpScreen}>
                  {"\n"} Thank you 😊 Have a great day !
                </Text>
                <Text style={{color:'red',textAlign:'center'}}>
                  NOTE -- *You will find many bugs in this app please bear with them till the next release .If possible please drop a mail to me on that issue so that i can make a note of it and also i can mention your name for helping me in making this app better for the users.
                </Text>
             </View>

             <AdMobManager bannerSize = {bannerSize} testDeviceID = {testDeviceID} adUnitID = {adUnitID}/>
          </View>
        );
    }
}

const styles = StyleSheet.create({
  container_Second_2: {
      flex: 1,
      flexDirection: 'column'
  },
  halfHeight_Second_2: {
      flex: .07,
      backgroundColor: '#FF3366'
  },
  quarterHeight1_Second_3: {
      flex: .93,
      backgroundColor: '#fffaf0'
  },
  HelpScreen: {
      textAlign: 'left',
      color: '#333333',
      marginTop: 3,
      marginLeft: 3
  }
});
