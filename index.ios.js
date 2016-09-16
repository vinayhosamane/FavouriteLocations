/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
var Button = require('react-native-button');
var CalendarPicker = require('react-native-calendar-picker');
import Icon from 'react-native-vector-icons';
//var Firebase = require('firebase');
import * as firebase from 'firebase';
 import MapView from 'react-native-maps'
//import Geocoder from 'react-native-geocoding';
//import geocoding from 'reverse-geocoding';
//import geocoding from 'reverse-geocoding';
import Geocoder from 'react-native-geocoder';
import Share from 'react-native-share';

// var First = require('First');
// var Second = require('Second');
// var CaptureLocationsScreen = require('CaptureLocationsScreen');

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Navigator,
  NavigatorIOS,
  ActivityIndicatorIOS,
  ListView,
  Image,
  Alert,
  DatePickerIOS,
  TouchableOpacity,
  Dimensions
} from 'react-native';

var config = {
apiKey: "AIzaSyAFT0VK-KEMRiaqzlP2m1qpFodP1DNqm-8",
authDomain: "my-favourite-locations.firebaseapp.com",
databaseURL: "https://my-favourite-locations.firebaseio.com",
storageBucket: "my-favourite-locations.appspot.com",
};
const firebaseApp = firebase.initializeApp(config);
 //var database = firebase.database();
 const itemsRef = firebase.database();
// var MyFirebase = new Firebase("https://my-favourite-locations.firebaseio.com");

//Class First.js
class First extends React.Component{
  constructor(props) {
    super(props);

  console.log(this.props);
  this.state = {
   name: 'MaxTech Login-->',
   username:'',
   password:'',
   loading : false,
   loggedIn : false
 };
}

_handleLoginPress(event) {
console.log('Pressed!');

var username = this.state.username;
var password = this.state.password;

console.log(username);
console.log(password);

this._navigate('Login_Screen_Clicked');
// <CaptureLocationsScreen />
}

_handleCreateAccount(event) {
console.log('Pressed!');

var username = this.state.username;
var password = this.state.password;

console.log(username);
console.log(password);

this._navigate('Create_Account_Clicked');
// <CaptureLocationsScreen />
}

_handleForgotPassword(event) {
console.log('Pressed!');

var username = this.state.username;
var password = this.state.password;

console.log(username);
console.log(password);

this._navigate('Forgot_Password_Clicked');
// <CaptureLocationsScreen />
}

_navigate(name, type='Normal') {

  var username = this.state.username;
  var password = this.state.password;

  console.log(username);
  console.log(password);

  var status = false;

if(name == 'Login_Screen_Clicked')
{
  if(username!='' && password!='')
  {
  var user = firebase.auth().signInWithEmailAndPassword(username, password).then((userData) =>
      {
        this.setState({
                loggedIn: true
              });
        console.log("Login successful" + userData);
        console.log("Login successful");

        this.refs.usr.setNativeProps({text: ''});
        this.refs.psw.setNativeProps({text: ''});

        this.setState({
                username: '',
                password: ''
              });
          this.props.navigator.push({
            component: Second,
            passProps: {
              name: name
            },
            type: type
          })
      }).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;

  console.log("Error signing in",error);

 if(error)
 {
   Alert.alert(
          'Login Error',
          errorMessage,
          [
            //{text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
            {text: 'Thank you!', onPress: () => console.log('OK Pressed!')},
          ]
        )
 }
  });

  console.log(user);

//   firebase.auth().onAuthStateChanged(function(user) {
//   if (user) {
//     console.log(user);
//
//      }
//     // User is signed in.
//    else {
//     // No user is signed in.
//   }
// });


}


else {
  Alert.alert(
         'Login Error',
         'Please enter valid Username and Pssword.If you have forgotten the password click Forgot Password Button below.',
         [
           //{text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
           {text: 'Thank you!', onPress: () => console.log('OK Pressed!')},
         ]
       )
}

}

if(name == 'Create_Account_Clicked')
{
  this.props.navigator.push({
    component:CreateAccountScreen ,
    passProps: {
      name: name
    },
    type: type
  })
}

if(name == 'Forgot_Password_Clicked')
{
  this.props.navigator.push({
    component:ForgotPasswordScreen ,
    passProps: {
      name: name
    },
    type: type
  })
}

}

componentWillMount() {
    // get the current user from firebase
    //const userData = this.props.firebaseApp.auth().currentUser;
    this.setState({
      loggedIn : false
    });
  }

  render() {
    return (
      <View style={styles.container1}>
         <View style={styles.halfHeight}>
         <Image source={require('./map.jpg')}  style={styles.backgroundImageToolBar}></Image>
         </View>
         <View style={styles.quarterHeight1}>
         <Text style={styles.bullsWelcome}>
         Welcome to React-Native Favourite Locations
         </Text>
         <TextInput
         ref="usr"
         style={{height: 40, borderColor: 'gray', borderWidth: 1 , marginTop: 6 , padding : 10 , marginLeft : 5 , marginRight : 5 , marginBottom:3}}
         placeholder= "Enter username"
         placeholderTextColor = '#a52a2a'
         returnKeyType = {"next"}
         autoFocus = {false}
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
         style={{height: 40, borderColor: 'gray', borderWidth: 1 , marginTop: 6,marginLeft : 5 ,padding : 10 , marginRight : 5}}
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

         </View>


         <View style={[styles.quarterHeight2, {backgroundColor: '#fffaf0'}]} >

                  <Button
                    style={{borderWidth: 0, borderColor: 'white'}}
                    //onPress={this._handleLoginPress.bind(this)}>
                    onPress={this._handleLoginPress.bind(this)}>
                    {"\n"}
                    Login
                  </Button>
                  <Button
                    style={{borderWidth: 0, borderColor: 'white' , marginTop:20}}
                    onPress={this._handleForgotPassword.bind(this)}>
                    Forgot Password?
                  </Button>
                  <Button
                    style={{borderWidth: 0, borderColor: 'white' , marginTop:20}}
                    onPress={this._handleCreateAccount.bind(this)}>
                    Create Account!
                  </Button>

                  <Text style={styles.instructions}>
                  For any help please contact Vinay Hosamane K N @ <Text style={{color:'white'}}> vinayhosamane07@gmail.com </Text>
                  {"\n"}
                  <Text style ={{color:'white',fontWeight:'normal',backgroundColor: '#FF3366'}}> Powered by HappyCoding.Inc </Text>
                  </Text>

         </View>
      </View>
    );
  }
  }


//End - First.js

//Class Second.js
class Second extends React.Component{

  constructor(props) {
    super(props)
  console.log(this.props);
  this.state = {
    name: 'MaxTech Login-->' ,
    MyAddress: 'Bangalore',
    usr_descrption: '',
    usr_placemark: '',
    // region:{
    //         latitude: 4.21048,
    //         longitude: 101.97577,
    //         latitudeDelta: 10,
    //         longitudeDelta: 5,
    //         title: "Your Address"
    //       }
    position: {
        coords: {}
      }
    // annotations: [{
    //     latitude: this.state.position.coords.latitude,
    //     longitude: this.state.position.coords.longitude,
    //     title: 'My Place',
    //     subtitle: 'you are here'
    //   }]
   };
}

  _handleLogoutPress(event) {
  console.log('Logout Pressed!');

  firebase.auth().signOut().then(function() {
    // Sign-out successful.
    console.log("successfully logged out");
  }, function(error) {
    // An error happened.
  });

 this.props.navigator.pop();
  }

  _handleFavouriteLocationsAction(event) {
  console.log('Pressed!');

  var username = this.state.username;
  var password = this.state.password;

  console.log(username);
  console.log(password);

  this._navigate('Favourite_Locations_Clicked');
  // <CaptureLocationsScreen />
  }

  _handleCaptureLocationAction(event) {
  console.log('Pressed!');

  var username = this.state.username;
  var password = this.state.password;

  console.log(username);
  console.log(password);

  Alert.alert(
         'Add My Location',
         'Are you sure you want to add this to your Favourite locations list?.',
         [
           {text: 'No', onPress: () => console.log('Cancel Pressed!')},
           {text: 'Yes', onPress: () =>
           {
             console.log('OK Pressed!');
           const userData = firebase.auth().currentUser;
           var userid = userData.uid;

           var myAddress = ''

           var NY = {
                  lat: this.state.position.coords.latitude,
                  lng: this.state.position.coords.longitude
                    };

          Geocoder.fallbackToGoogle('AIzaSyCG887OvNRiQxuUoh3UYkKzxjcosHH1lRY');
//{lat:12.985065,lng: 77.560499}
// use the lib as usual
          let ret = Geocoder.geocodePosition(NY).then((res)=>
          {
             console.log(res)
             myAddress = res["0"].formattedAddress
             console.log(myAddress);
             this.setState({
            MyAddress: myAddress
           },function()
            {
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
          })
        }

         },
         ]
       )
  //this._navigate('Capture_Locations_Clicked');
  // <CaptureLocationsScreen />
  }

  // _saveDataToFirebase()
  // {
  //   var dbRef = firebase.database().ref('testing/')
  //           var savedbRef = dbRef.child(userid).push({
  //             Description : 'My Home',
  //             Address: this.state.MyAddress,
  //             latitude: this.state.position.coords.latitude,
  //             longitude: this.state.position.coords.longitude
  //           })
  //           console.log("dbRef "+dbRef)
  //           console.log('savedbRef '+ savedbRef)
  // }

  _handleHowToUseAction(event) {
  console.log('Pressed!');

  var username = this.state.username;
  var password = this.state.password;

  console.log(username);
  console.log(password);

  this._navigate('How_To_Use_clicked');
  // <CaptureLocationsScreen />
  }

_navigate(name, type='Normal') {
  if(name == 'How_To_Use_clicked')
  {
    this.props.navigator.push({
      component:HowToUseScreen,
      passProps: {
        name: name
      },
      type: type
    })
  }

  if(name == 'Favourite_Locations_Clicked')
  {
    this.props.navigator.push({
      component:FavouriteLocationsFromHomeScreen ,
      passProps: {
        name: name
      },
      type: type
    })
  }

//   if(name == 'Capture_Locations_Clicked')
//   {
//     this.props.navigator.push({
//       component:CaptureLocationsScreen ,
//       passProps: {
//         name: name
//       },
//       type: type
//     })
//   }
 }

 render() {
   return (
          <View style={styles.container_Second_2}>
             <View style={styles.halfHeight_Second_2}>
             <Button
               style={{borderWidth: 0, borderColor: 'white',textAlign:'right',marginTop:17 ,color:'white',fontSize: 20 , marginRight:10}}
               //onPress={this._handleLoginPress.bind(this)}>
               onPress={this._handleLogoutPress.bind(this)}>
               Logout 🔐
             </Button>
             </View>
             <View style={styles.quarterHeight1_Second_2}>
             <MapView
                    //  style={{height: 40,width:200, margin: 40}}
                    style={styles.quarterHeight1_Second_2}
                     showsUserLocation={true}
                     followUserLocation={true}
                     mapType='standard'
                     //region={this.state.region}
                     region={{
                            latitude: this.state.position.coords.latitude,
                            latitudeDelta: 0.009,
                            longitude: this.state.position.coords.longitude,
                            longitudeDelta: 0.009,
                             }}
                     zoomEnabled={true}
                     scrollEnabled={true}
                     showsScale={true}
                   >
                   </MapView>
             </View>
             <View style={styles.quarterHeight2_Second_2}>
             <TextInput
             ref="description"
             style={{height: 40, borderColor: 'gray', borderWidth: 1 , marginTop: 6 , padding : 10 , marginLeft : 5 , marginRight : 5 , marginBottom:3}}
             placeholder= "Please describe location EX.My Home,Best Gobi Manchuri"
             placeholderTextColor = 'black'
             returnKeyType = {"next"}
             autoFocus = {false}
             autoCapitalize = "none"
             autoCorrect = {false}
             clearButtonMode = 'while-editing'
             // onChange={(event) => this.updateText(
             //      'onChange text: ' + event.nativeEvent.text
             //    )}
             onChangeText={(text) => {
                 this.setState({usr_descrption:text});
               }}
             onSubmitEditing={(event) => {
            //this.refs.psw.focus();

             }}
             />
             <TextInput
             ref="placemark"
             style={{height: 40, borderColor: 'gray', borderWidth: 1 , marginTop: 6 , padding : 10 , marginLeft : 5 , marginRight : 5 , marginBottom:3}}
             placeholder= "Please give Placemark Ex.Near Vijaya Bank,Behind Bus Stand"
             placeholderTextColor = 'black'
             returnKeyType = {"next"}
             autoFocus = {false}
             autoCapitalize = "none"
             autoCorrect = {false}
             clearButtonMode = 'while-editing'
             // onChange={(event) => this.updateText(
             //      'onChange text: ' + event.nativeEvent.text
             //    )}
             onChangeText={(text) => {
                 this.setState({usr_placemark:text});
               }}
             onSubmitEditing={(event) => {
            //this.refs.psw.focus();

             }}
             />
             <Button
               //style={{borderWidth: 0, borderColor: 'white',marginTop:20,color:'#1e90ff',fontSize: 25}}
               //onPress={this._handleLoginPress.bind(this)}>
               onPress={this._handleCaptureLocationAction.bind(this)}>
                 {"\n"}
               Capture Location
             </Button>
             <Button
               //style={{borderWidth: 0, borderColor: 'white',color:'#1e90ff',fontSize: 25,marginTop:25}}
               //onPress={this._handleLoginPress.bind(this)}>
               onPress={this._handleFavouriteLocationsAction.bind(this)}>
                 {"\n"}
               Favourite Locations
             </Button>
             <Button
              //  style={{borderWidth: 0, borderColor: 'white',color:'#1e90ff',fontSize: 25,marginTop:25}}
               //onPress={this._handleLoginPress.bind(this)}>
               onPress={this._handleHowToUseAction.bind(this)}>
                 {"\n"}
               About App
             </Button>

              </View>
          </View>
   );
 }

 // this function will execute after rendering on the client occurs
 componentDidMount() {

   // navigator is available via the Geolocation polyfill in React Native
   // http://facebook.github.io/react-native/docs/geolocation.html#content
   //
   // navigator is the object through which you interact with the Geolocation interface
   //
   // *** Polyfill definition needs to be verified
   // React Native allows for polyfills--code that provides functionality available in the browser, but
   // that is not currently available in the runtime environment on mobile devices ***
   // Geolocation is enabled by default when you create a project with react-native init.
   //
   // getCurrentPosition() and watchPostion() take a success callback, error callback, and options object
   navigator.geolocation.getCurrentPosition(
     (position) => this.setState({position}),
     (error) => alert(error.message),
     {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
   );
   navigator.geolocation.watchPosition((position) => {
     this.setState({position});
   });
 }

};
//End - Second.js

//How to use? Screen.js

class HowToUseScreen extends React.Component{

  constructor(props) {
    super(props)
  console.log(this.props);
  this.state = { name: 'MaxTech Login-->' }
}

  _handleLogoutPress(event) {
  console.log('Logout Pressed!');

 this.props.navigator.pop();
  }

_navigate(name, type='Normal') {
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
             <Button
               style={{borderWidth: 0, borderColor: 'white',textAlign:'left',marginTop:17 ,color:'white',fontSize: 20,marginLeft:10}}
               //onPress={this._handleLoginPress.bind(this)}>
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

          </View>
   );
 }
};

//End - How to use? screen

//Create Account screen

class CreateAccountScreen extends React.Component{

  constructor(props) {
    super(props)
  console.log(this.props);
  this.state = {
    name: 'MaxTech Login-->',
    newUsername:'',
    newPassword:''
   }
}

  _handleLogoutPress(event) {
  console.log('Logout Pressed!');

 this.props.navigator.pop();
  }

  _handleCreateAccountButtonAction(event) {
  console.log('Create account button pressed!');

  username = this.state.newUsername;
  password = this.state.newPassword;

  console.log(username);
  console.log(password);

  firebase.auth().createUserWithEmailAndPassword(username, password).then((userData) =>
      {
      console.log("Account successfully created");
      Alert.alert(
             'Signup Alert',
             'Your account created successfully.',
             [
               //{text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
               {text: 'OK', onPress: () => this.props.navigator.pop()},
             ]
           )

      }).catch(function(error) {
   // Handle Errors here.
   var errorCode = error.code;
   var errorMessage = error.message;
   Alert.alert(
          'Signup Error',
          errorMessage,
          [
            //{text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
            {text: 'OK', onPress: () => console.log('Enter valid password')},
          ]
        )
   // ...
 });

  }

_navigate(name, type='Normal') {
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
             <Button
               style={{borderWidth: 0, borderColor: 'white',textAlign:'left',marginTop:17 ,color:'white',fontSize: 20,marginLeft:10}}
               //onPress={this._handleLoginPress.bind(this)}>
               onPress={this._handleLogoutPress.bind(this)}>
               ◀️ Back
             </Button>
             </View>
             <View style={styles.quarterHeight1_Second_2}>

          <Text style={styles.bullsWelcome}>
          Please Fill the Form
          </Text>
          <TextInput
          ref="usr"
          style={{height: 40, borderColor: 'gray', borderWidth: 1 , marginTop: 6 , padding : 10 , marginLeft : 5 , marginRight : 5 , marginBottom:3}}
          placeholder= "Username@domain.com"
          placeholderTextColor = '#a52a2a'
          returnKeyType = {"next"}
          autoFocus = {false}
          autoCapitalize = "none"
          autoCorrect = {false}
          clearButtonMode = 'while-editing'
          // onChange={(event) => this.updateText(
          //      'onChange text: ' + event.nativeEvent.text
          //    )}
          onChangeText={(text) => {
              this.setState({newUsername:text});
            }}
          onSubmitEditing={(event) => {
          this.refs.psw1.focus();

          }}
          />

          <TextInput
          ref="psw1"
          style={{height: 40, borderColor: 'gray', borderWidth: 1 , marginTop: 6,marginLeft : 5 ,padding : 10 , marginRight : 5}}
          placeholder= "Password"
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
              this.setState({newPassword:text});
            }}
            onSubmitEditing={(event) => {
            this.refs.psw2.focus();

            }}
          />

          <TextInput
          ref="psw2"
          style={{height: 40, borderColor: 'gray', borderWidth: 1 , marginTop: 6,marginLeft : 5 ,padding : 10 , marginRight : 5}}
          placeholder= "Confirm Password"
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
              this.setState({newPassword:text});
            }}
          />


             <Button
              style={{borderWidth: 0, borderColor: 'white'}}
               //onPress={this._handleLoginPress.bind(this)}>
               onPress={this._handleCreateAccountButtonAction.bind(this)}>
               {"\n"}
               {"\n"}
               Create Account
            </Button>

             </View>
             <View style={styles.quarterHeight2_Second_2}>

              </View>
          </View>

   );
 }
};


//End - Create account screen

//Forgot Password screen

class ForgotPasswordScreen extends React.Component{

  constructor(props) {
    super(props)
  console.log(this.props);
  this.state = { name: 'MaxTech Login-->',
  emailAddress: ''
 }
}

  _handleLogoutPress(event) {
  console.log('Logout Pressed!');

 this.props.navigator.pop();
  }

  _handleProfileValidate(event) {
  console.log('Validation done!');

  var email = this.state.emailAddress

  firebase.auth().sendPasswordResetEmail(email).then(function() {
    // Email sent.
    Alert.alert(
           'Password Reset Alert',
           'Password Reset mail sent to '+email,
           [
             //{text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
             {text: 'OK', onPress: () => console.log('OK Pressed!')/*this.props.navigator.pop()*/},
           ]
         )
  }, function(error) {
    // An error happened.
    var errorCode = error.code;
    var errorMessage = error.message;
    Alert.alert(
           'Password Reset Error',
           errorMessage,
           [
             //{text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
             {text: 'OK', onPress: () => console.log('Password reset error')},
           ]
         )
  });
 // this.props.navigator.pop();
  }

_navigate(name, type='Normal') {
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
               style={{borderWidth: 0, borderColor: 'white',textAlign:'left',marginTop:17 ,color:'white',fontSize: 20,marginLeft:10}}
               //onPress={this._handleLoginPress.bind(this)}>
               onPress={this._handleLogoutPress.bind(this)}>
              ◀️ Back
             </Button>
             </View>
             <View style={styles.quarterHeight1_Second_2}>
             <Text style={styles.instructions}> Enter Your EmailId </Text>
             <Text style={styles.welcome}> Please give your valid email id </Text>
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
               style={{borderWidth: 0, borderColor: 'white',textAlign:'center',marginTop:17 ,color:'grey',fontSize: 20}}
               //onPress={this._handleLoginPress.bind(this)}>
               onPress={this._handleProfileValidate.bind(this)}>
              Reset Password
             </Button>

             </View>
             <View style={styles.quarterHeight2_Second_2}>
              </View>
          </View>
   );
 }
};

//End - Forgot Password Screen

//FavouriteLocationsFromHomeScreen

class FavouriteLocationsFromHomeScreen extends React.Component{

  constructor(props) {
    super(props)
  console.log(this.props);

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

  this.state = {
    name: 'MaxTech Login-->',
    dataArray:[],
     visible: false,
   dataSource: ds.cloneWithRows([{'Description':'My Home','latitude':'-12','longitude':'-122'},{'Description':'My Home','latitude':'-12','longitude':'-122'}])
 };
}

  _handleLogoutPress(event) {
  console.log('Logout Pressed!');

//itemsRef.off()
//   itemsRef.on("value", function(snapshot) {
//   console.log(snapshot.val());
//
//
// }, function (errorObject) {
//   console.log("The read failed: " + errorObject.code);
// });

 this.props.navigator.pop();
  }

_navigate(name, type='Normal') {
  this.props.navigator.push({
    component: First,
    passProps: {
      name: name
    },
    type: type
  })
}

 componentWillMount()
 {
   const userData = firebase.auth().currentUser;
    var userid = userData.uid;

    var newArray = []

   var itemsRef = firebaseApp.database().ref('testing/'+userid);

   itemsRef.orderByChild(userid).on("child_added", function(snapshot) {
   console.log(snapshot.val());

   var data = snapshot.val()

   newArray.push(data)

     console.log(data.Description);
     console.log(data.latitude);
     console.log(data.longitude);
 },
  function (errorObject) {
    console.log("The read failed: " + errorObject.code);
    // Alert.alert(
    //        'Data Fetch Error',
    //        errorObject.message,
    //        [
    //          //{text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
    //          {text: 'OK', onPress: () => itemsRef.off()},
    //        ]
    //      )
  });

 this.setState({
            dataSource: this.state.dataSource.cloneWithRows(newArray),
        });

 }

   onCancel() {
   console.log("CANCEL")
   this.setState({visible:false});
 }
 onOpen() {
   console.log("OPEN")
   this.setState({visible:true});
 }

//  componentWillReceiveProps(nextProps) {
//    this.setState({
//               dataSource: this.state.dataSource.cloneWithRows(newArray),
//           });
// }

 render() {

   let shareOptions = {
       title: "React Native",
       message: "Hola mundo",
       url: "http://facebook.github.io/react-native/",
       subject: "Share Link" //  for email
     };

   return (
          <View style={styles.container_Second_2}>
             <View style={styles.halfHeight_Second_2}>
             <Button
               style={{borderWidth: 0, borderColor: 'white',textAlign:'left',marginTop:17 ,color:'white',fontSize: 20,marginLeft:10}}
               //onPress={this._handleLoginPress.bind(this)}>
               onPress={this._handleLogoutPress.bind(this)}>
              ◀️ Back
             </Button>
             </View>
             <View style={styles.quarterHeight1_Second_3}>
             <ListView
               dataSource={this.state.dataSource}
               renderRow={(data) => <View><Text style={{textAlign: 'center', marginTop:10, fontSize:20,color:'blue',fontWeight: "bold"}}>{data.Description}</Text>
               <Text style={{textAlign: 'center', marginTop:10, fontSize:20,color:'black'}}>Placemark : {data.Placemark}</Text>
               <Text style={{textAlign: 'center', marginTop:10, fontSize:20,color:'black'}}>Latitude : {data.latitude}</Text>
               <Text style={{textAlign: 'center', marginTop:10, fontSize:20,color:'black'}}>Longitude : {data.longitude}</Text>
               <Text style={{textAlign: 'center', marginTop:10, fontSize:20,color:'black'}}>Address : {data.Address}</Text>
               <TouchableOpacity onPress={()=>{
                      Share.open(shareOptions);
                 }}>
                      <View style={styles.instructionsShare}>
                      <Image source={require('./share-button.jpg')}  style={styles.backgroundImageShare}></Image>
                      </View>
                </TouchableOpacity>

               </View>}
               renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
             />
             </View>
          </View>
   );
 }
};

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
    marginTop:34,
    fontWeight: "bold",
    color:'white',
    backgroundColor: '#FF3366'
  },
  button: {
    flex:1,
   textAlign: 'center',
   color: '#008b8b',
   marginTop: 20,
   height: 60,
   fontSize : 30,
  backgroundColor: '#f08080',
 } ,
  container1: {
       flex: 1,
       flexDirection: 'column'
   },
   halfHeight: {
       flex: .5,
       backgroundColor: '#FF3366'
   },
   quarterHeight1: {
       flex: .19,
       backgroundColor: '#fffaf0'
   },
   quarterHeight2: {
       flex: .31,
       backgroundColor: '#fffaf0'
   },
   backgroundImageToolBar: {
     flex: 1,
     marginTop:1,
     width: 420,
     height: 100,
     resizeMode: 'cover',
   alignItems: 'center'
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
  marginLeft:3
},
_secondScreen_topbar:{
  flex:1,
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
     backgroundColor: '#CCC'
 },
 quarterHeight1_Second_3: {
     flex: .93,
     backgroundColor: '#fffaf0'
 },
 forgotScreenLabels: {
   textAlign: 'center',
   marginTop:15,
   fontWeight: "bold",
   color:'white',
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
   marginTop:10,
 },
 instructionsShare: {
    marginTop: 10,
    marginBottom: 10,
  },
  backgroundImageShare: {
    marginTop:1,
    width: 100,
    height: 40,
  marginRight: 10,
  alignItems: 'flex-end'
},
});

AppRegistry.registerComponent('FavouriteLocations', () => FavouriteLocations);
