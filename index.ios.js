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
  MapView,
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
          'Please enter valid Username and Pssword.If you have forgotten the password click Forgot Password Button below.',
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
         <Image source={{uri:"/Users/vhosb/Desktop/Personal/bulls.jpg"}}  style={styles.backgroundImageToolBar}></Image>
         </View>
         <View style={styles.quarterHeight1}>
         <Text style={styles.bullsWelcome}>
         Welcome to Bulls Favourite Locations
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


         <View style={[styles.quarterHeight2, {backgroundColor: '#CCC'}]} >

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
                  <Text style ={{color:'white',fontWeight:'normal',backgroundColor: '#FF3366'}}> Powered by Bulls.Inc </Text>
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
// const userData = firebase.auth().currentUser;
// var userid = userData.uid;
//
// var dbRef = firebase.database().ref('testing/')
// var savedbRef = dbRef.child(userid).set({
//   testing : 'Location',
//   latitude: this.state.position.coords.latitude,
//   longitude: this.state.position.coords.longitude
// })

// console.log("dbRef "+dbRef)
// console.log('savedbRef '+ savedbRef)
  // itemsRef.push({
  //    userid,
  //    title: this.state.newItem,
  //    time: new Date().getTime()
  //  })

  Alert.alert(
         'Add My Location',
         'Are you sure you want to add this to your Favourite locations list?.',
         [
           {text: 'No', onPress: () => console.log('Cancel Pressed!')},
           {text: 'Yes', onPress: () =>{console.log('OK Pressed!');
           const userData = firebase.auth().currentUser;
           var userid = userData.uid;

           var dbRef = firebase.database().ref('testing/')
           var savedbRef = dbRef.child(userid).push({
             Description : 'Apple Roadway around the city',
             latitude: this.state.position.coords.latitude,
             longitude: this.state.position.coords.longitude
           })
           console.log("dbRef "+dbRef)
           console.log('savedbRef '+ savedbRef)}
         },
         ]
       )
  //this._navigate('Capture_Locations_Clicked');
  // <CaptureLocationsScreen />
  }

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
               Logout
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
                            latitudeDelta: 0.001,
                            longitude: this.state.position.coords.longitude,
                            longitudeDelta: 0.001,
                             }}
                     zoomEnabled={true}
                     scrollEnabled={true}
                     showsScale={true}
                     annotations={[{latitude: 37.783366,
                         longitude: -122.406831,
                         title: 'Cafe Venue',
                         subtitle: 'quick noshes'}]}
                   />
             </View>
             <View style={styles.quarterHeight2_Second_2}>
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
               How To Use?
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
               Back
             </Button>
             </View>
             <View style={styles.quarterHeight1_Second_2}>
             </View>
             <View style={styles.quarterHeight2_Second_2}>
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
               Back
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
date: new Date()
 }
}

  _handleLogoutPress(event) {
  console.log('Logout Pressed!');

 this.props.navigator.pop();
  }

  _handleProfileValidate(event) {
  console.log('Validation done!');

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
               Back
             </Button>
             </View>
             <View style={styles.quarterHeight1_Second_2}>
             <Text style={styles.instructions}> Enter Your Username </Text>
             <TextInput
             ref="forgot_screen"
             style={{height: 40, borderColor: 'gray', borderWidth: 1 , marginTop: 6,marginLeft : 5 ,padding : 10 , marginRight : 5}}
             placeholder= "Enter username"
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
                 //this.setState({password:text});
               }}
             />
           <Text style={styles.forgotScreenLabels}> Enter Your DOB </Text>

           <CalendarPicker
         selectedDate={this.state.date}
         onDateChange={this.onDateChange.bind(this)}
         screenWidth={Dimensions.get('window').width}
         selectedBackgroundColor={'#5ce600'} />

       <Text style={styles.selectedDate}> Date: { this.state.date.toString() } </Text>

             <Button
               style={{borderWidth: 0, borderColor: 'white',textAlign:'center',marginTop:17 ,color:'#008b8b',fontSize: 20}}
               //onPress={this._handleLoginPress.bind(this)}>
               onPress={this._handleProfileValidate.bind(this)}>
               Validate Profile
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
               Back
             </Button>
             </View>
             <View style={styles.quarterHeight1_Second_2}>
             </View>
             <View style={styles.quarterHeight2_Second_2}>
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
     marginTop:18,
     width: 400,
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
     flex: .72,
     backgroundColor: '#fffaf0'
 },
 quarterHeight2_Second_2: {
     flex: .21,
     backgroundColor: '#CCC'
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
  }
});

AppRegistry.registerComponent('FavouriteLocations', () => FavouriteLocations);
