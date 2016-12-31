/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

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
import MapView from 'react-native-maps'
import Geocoder from 'react-native-geocoder';

import Spinner from './Spinner.js';
import AdMobManager from './AdMobManager';
import HowToUseScreen from './HowToUseScreen'
import FavouriteLocationsFromHomeScreen from './FavouriteLocationsFromHomeScreen'

var bannerSize="smartBannerPortrait"
var testDeviceID="EMULATOR"
var adUnitID="ca-app-pub-3940256099942544/2934735716"

import * as firebase from 'firebase';
var config = {
    apiKey: "AIzaSyAFT0VK-KEMRiaqzlP2m1qpFodP1DNqm-8",
    authDomain: "my-favourite-locations.firebaseapp.com",
    databaseURL: "https://my-favourite-locations.firebaseio.com",
    storageBucket: "my-favourite-locations.appspot.com",
};
const firebaseApp = firebase.initializeApp(config);
const itemsRef = firebase.database();

export default class Second extends React.Component{
  constructor(props) {
      super(props)
      this.state = {
          name: 'MaxTech Login-->',
          MyAddress: 'Bangalore',
          usr_descrption: '',
          usr_placemark: '',
          position: {
              coords: {}
          }
      };
  }

  // this function will execute after rendering on the client occurs
  componentDidMount() {
    /*
        navigator is available via the Geolocation polyfill in React Native
        http://facebook.github.io/react-native/docs/geolocation.html#content

        navigator is the object through which you interact with the Geolocation interface

        *** Polyfill definition needs to be verified
        React Native allows for polyfills--code that provides functionality available in the browser, but
        that is not currently available in the runtime environment on mobile devices ***
        Geolocation is enabled by default when you create a project with react-native init.

        getCurrentPosition() and watchPostion() take a success callback, error callback, and options object
   */
   navigator.geolocation.getCurrentPosition(
       (position) => this.setState({position}),
       (error) => alert(error.message),
       {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
   navigator.geolocation.watchPosition((position) => {
       this.setState({position});
    });
  }

  _handleLogoutPress(event) {
    firebase.auth().signOut().then(function() {
        console.log("successfully logged out");
    }, function(error) {
        console.log(error);
    });
    this.props.navigator.pop();
  }

  _handleFavouriteLocationsAction(event) {
    this.setState({isLoading: true});
    this._navigate('Favourite_Locations_Clicked');
    // <CaptureLocationsScreen />
  }

  _handleCaptureLocationAction(event) {
    var username = this.state.username;
    var password = this.state.password;
    Alert.alert('Add My Location', 'Are you sure you want to add this to your Favourite locations list?.',
         [{text: 'No', onPress: () => console.log('Cancel Pressed!')},
          {text: 'Yes', onPress: () => {
            this.setState({isLoading: true});
            const userData = firebase.auth().currentUser;
            var userid = userData.uid;
            var myAddress = ''
            var NY = {lat: this.state.position.coords.latitude, lng: this.state.position.coords.longitude};
            Geocoder.fallbackToGoogle('AIzaSyCG887OvNRiQxuUoh3UYkKzxjcosHH1lRY');
             //{lat:12.985065,lng: 77.560499}
             // use the lib as usual
             let ret = Geocoder.geocodePosition(NY).then((res)=> {
                          myAddress = res["0"].formattedAddress
                          this.setState({MyAddress: myAddress},
                          function() {
                            console.log(this.state.MyAddress);
                            console.log('I am inside callback');
                          });
                          var dbRef = firebase.database().ref('testing/')
                          var savedbRef = dbRef.child(userid).push({
                                                Description : this.state.usr_descrption,
                                                Placemark : this.state.usr_placemark,
                                                Address: this.state.MyAddress,
                                                latitude: this.state.position.coords.latitude,
                                                longitude: this.state.position.coords.longitude
                                           })
                          console.log("dbRef "+dbRef)
                          console.log('savedbRef '+ savedbRef)
                          this.setState({isLoading: false});
                          Alert.alert('Alert', 'Your Location saved successfully.', [{text: 'Thank you', onPress: () => console.log('OK Pressed!')}])
             })
           }
         }]
       )
  }

  _handleHowToUseAction(event) {
    this._navigate('How_To_Use_clicked');
  }

  _navigate(name, type='Normal') {
      if(name == 'How_To_Use_clicked') {
          this.props.navigator.push({
            component:HowToUseScreen,
            passProps: {name: name},
            type: type
          })
      } //end of if 'How_To_Use_clicked'
      if(name == 'Favourite_Locations_Clicked') {
          const userData = firebase.auth().currentUser;
          var userid = userData.uid;
          var newArray = []
          var itemsRef = firebaseApp.database().ref('testing/'+userid);
          itemsRef.orderByChild(userid).on("child_added", (snapshot) => {
                console.log(snapshot.val());
                this.setState({isLoading: false});

                var data = snapshot.val()
                newArray.push(data)

                console.log(data.Description);
                console.log(data.latitude);
                console.log(data.longitude);
          }, (errorObject) => {
                console.log("The read failed: " + errorObject.code);
                this.setState({isLoading: false});
          });

          if(newArray.length !=0) {
              this.props.navigator.push({
                  component:FavouriteLocationsFromHomeScreen ,
                  passProps: {name: newArray},
                  type: type
              })
          } else {
             this.setState({isLoading: false});
             Alert.alert('Alert!', 'Please wait untill the connection with your cloud databsase is made. Try Again!', [{text: 'Thank you!', onPress: () => console.log('OK Pressed!')}])
          }
        } //eof if 'Favourite_Locations_Clicked'
   }

   render() {
        return (
          <View style={styles.container_Second_2}>
            <Spinner visible={this.state.isLoading} size="large" color="white"/>

             <View style={styles.halfHeight_Second_2}>
                <Button   style={{borderWidth: 0, borderColor: 'white',textAlign:'right',marginTop:17,color:'white',fontSize: 20,position: 'absolute',right:2}}
                          onPress={this._handleLogoutPress.bind(this)}>
                          Logout 🔐
                </Button>
             </View>

             <View style={styles.quarterHeight1_Second_2}>
                <MapView style={styles.quarterHeight1_Second_2}
                         showsUserLocation={true}
                         followUserLocation={true}
                         mapType='standard'
                         region={{latitude: this.state.position.coords.latitude, latitudeDelta: 0.009, longitude: this.state.position.coords.longitude, longitudeDelta: 0.009}}
                         zoomEnabled={true}
                         scrollEnabled={true}
                         showsScale={true}>
                </MapView>
             </View>

             <View style={styles.quarterHeight2_Second_2}>
                <TextInput ref="description"
                           style={{height: 40, borderColor: 'gray', borderWidth: 1 , marginTop: 6 , padding : 10 , marginLeft : 5 , marginRight : 5 , marginBottom:3}}
                           placeholder= "Please describe location EX.My Home,Best Gobi Manchuri"
                           placeholderTextColor = 'black'
                           returnKeyType = {"next"}
                           autoFocus = {false}
                           autoCapitalize = "none"
                           autoCorrect = {false}
                           clearButtonMode = 'while-editing'
                           onChangeText={(text) => {
                             this.setState({usr_descrption:text});
                           }}
                           onSubmitEditing={(event) => {
                             this.refs.placemark.focus();
                           }}
                />
                <TextInput ref="placemark"
                          style={{height: 40, borderColor: 'gray', borderWidth: 1 , marginTop: 6 , padding : 10 , marginLeft : 5 , marginRight : 5 , marginBottom:3}}
                          placeholder= "Please give Placemark Ex.Near Vijaya Bank,Behind Bus Stand"
                          placeholderTextColor = 'black'
                          returnKeyType = {"done"}
                          autoFocus = {false}
                          autoCapitalize = "none"
                          autoCorrect = {false}
                          clearButtonMode = 'while-editing'
                          onChangeText={(text) => {
                            this.setState({usr_placemark:text});
                          }}
                          onSubmitEditing={(event) => {
                          }}
                />
                <Button onPress={this._handleCaptureLocationAction.bind(this)}>
                        {"\n"}
                        Capture Location
                </Button>
                <Button onPress={this._handleFavouriteLocationsAction.bind(this)}>
                        {"\n"}
                        Favourite Locations
                </Button>
                <Button onPress={this._handleHowToUseAction.bind(this)}>
                        {"\n"}
                        About App
                </Button>
                <AdMobManager bannerSize = {bannerSize} testDeviceID = {testDeviceID} adUnitID = {adUnitID}/>
            </View>

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
    quarterHeight1_Second_2: {
        flex: .52,
        backgroundColor: '#fffaf0'
    },
    quarterHeight2_Second_2: {
        flex: .41,
        alignItems: 'center',
        backgroundColor: '#CCC',
    }
});
