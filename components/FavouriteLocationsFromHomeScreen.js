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
import Icon from 'react-native-vector-icons';
import Spinner from './Spinner.js';

import AdMobManager from './AdMobManager';
var bannerSize="smartBannerPortrait"
var testDeviceID="EMULATOR"
var adUnitID="ca-app-pub-3940256099942544/2934735716"

import * as firebase from 'firebase';
import Second from './First.js';
import CreateAccountScreen from './CreateAccountScreen.js';


class FavouriteLocationsFromHomeScreen extends React.Component{

  constructor(props) {
    super(props)
  console.log(this.props.name);

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

  this.state = {
    name: 'MaxTech Login-->',
    dataArray:[],
     visible: false,
   dataSource: ds.cloneWithRows(this.props.name)
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

// listen()
// {
//   const userData = firebase.auth().currentUser;
//    var userid = userData.uid;
//
//    var newArray = []
//
//   var itemsRef = firebaseApp.database().ref('testing/'+userid);
//
//   itemsRef.orderByChild(userid).on("child_added", function(snapshot) {
//   console.log(snapshot.val());
//
//   var data = snapshot.val()
//
//   newArray.push(data)
//
//     console.log(data.Description);
//     console.log(data.latitude);
//     console.log(data.longitude);
//     // this.setState({
//     //            dataSource: this.state.dataSource.cloneWithRows(newArray),
//     //        });
//     //this.updateDatasource(newArray);
// },
//  function (errorObject) {
//    console.log("The read failed: " + errorObject.code);
//    // Alert.alert(
//    //        'Data Fetch Error',
//    //        errorObject.message,
//    //        [
//    //          //{text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
//    //          {text: 'OK', onPress: () => itemsRef.off()},
//    //        ]
//    //      )
//  });
//  this.setState({
//             dataSource: this.state.dataSource.cloneWithRows(newArray),
//         });
//
// }


 componentDidMount()
 {
 //   const userData = firebase.auth().currentUser;
 //    var userid = userData.uid;
 //
 //    var newArray = []
 //
 //   var itemsRef = firebaseApp.database().ref('testing/'+userid);
 //
 //   itemsRef.orderByChild(userid).on("child_added", function(snapshot) {
 //   console.log(snapshot.val());
 //
 //   var data = snapshot.val()
 //
 //   newArray.push(data)
 //
 //     console.log(data.Description);
 //     console.log(data.latitude);
 //     console.log(data.longitude);
 //
 //     //this.updateDatasource(newArray);
 // },
 //  function (errorObject) {
 //    console.log("The read failed: " + errorObject.code);
 //    // Alert.alert(
 //    //        'Data Fetch Error',
 //    //        errorObject.message,
 //    //        [
 //    //          //{text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
 //    //          {text: 'OK', onPress: () => itemsRef.off()},
 //    //        ]
 //    //      )
 //  });
  this.setState({
             dataSource: this.state.dataSource.cloneWithRows(this.props.name),
         });

 //this.listen();
 }

   onCancel() {
   console.log("CANCEL")
   this.setState({visible:false});
 }
 onOpen() {
   console.log("OPEN")
   this.setState({visible:true});
 }

 onMapClick()
 {

 }

 onDeleteClick(rowData)
 {
  console.log(rowData);
   Alert.alert(
          'Delete This Location',
          'Are you sure you want to delete this location from list?.',
          [
            {text: 'No', onPress: () => console.log('Cancel Pressed!')},
            {text: 'Yes', onPress: () =>
            {
               console.log('OK Pressed!')
              const userData = firebase.auth().currentUser;
              var userid = userData.uid;

               var itemsRef = firebaseApp.database().ref('testing/'+userid);
              //         var savedbRef = dbRef.child(rowData).remove();
              // this.itemsRef.child(rowData.id).remove();
              itemsRef.orderByChild(userid).on("child_added", (snapshot) =>{
     console.log(snapshot.val());


   var newArray = [];
     var data = snapshot.val()

     newArray.push(data)

     var index = 0;

     if(snapshot.val().Description == rowData.Description && snapshot.val().Placemark == rowData.Placemark && snapshot.val().latitude == rowData.latitude && snapshot.val().longitude == rowData.longitude && snapshot.val().Address == rowData.Address){
            snapshot.ref.remove();
            Alert.alert(
                   'Alert',
                   'Your Location deleted successfully.Now you can add new locations to your list.',
                   [
                     //{text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
                     {text: 'OK', onPress: () =>
                     {
                       console.log('OK Pressed!')
                       this.props.navigator.pop();
                       return;
                     }},
                   ]
                 )


        }

        else {

        index++;
        }

      //newArray.splice(index,1);

// update the DataSource in the component state
// this.setState({
//   dataSource : ds.cloneWithRows(newArray),
// });

   },
     (errorObject) =>{
      console.log("The read failed: " + errorObject.code);
    });

            }
          }
        ]
      );
 }

 onShareClick()
{

}

 render() {

   return (
          <View style={styles.container_Second_2}>
             <View style={styles.halfHeight_Second_2}>
               <Button
               style={{borderWidth: 0, borderColor: 'white',textAlign:'left',marginTop:17 ,color:'white',fontSize: 20,marginLeft:10,position: 'absolute',left:2}}
               //onPress={this._handleLoginPress.bind(this)}>
               onPress={this._handleLogoutPress.bind(this)}>
              ◀️ Back
              </Button>
             </View>
             <View style={styles.quarterHeight1_Second_3}>
               <ListView
               dataSource={this.state.dataSource}
               renderRow={(rowData,rowId,sectionId) => <View><Text style={{textAlign: 'center', marginTop:10, fontSize:20,color:'blue',fontWeight: "bold"}}>{rowData.Description}</Text>
               <Text style={{textAlign: 'center', marginTop:10, fontSize:20,color:'black'}}>Placemark : {rowData.Placemark}</Text>
               <Text style={{textAlign: 'center', marginTop:10, fontSize:20,color:'black'}}>Latitude : {rowData.latitude}</Text>
               <Text style={{textAlign: 'center', marginTop:10, fontSize:20,color:'black'}}>Longitude : {rowData.longitude}</Text>
               <Text style={{textAlign: 'center', marginTop:10, fontSize:20,color:'black'}}>Address : {rowData.Address}</Text>
               <View style={{
                       flex: 1,
                       flexDirection: 'row',
                       justifyContent: 'space-between'
                     }}>

               <TouchableOpacity onPress={()=>{

                  var msg = "Description:\n"+rowData.Description+"\nPlacemark:\n"+rowData.Placemark+"\nLatitude:\n"+rowData.latitude+"\nLongitude:\n"+rowData.longitude+"\nAddress:\n"+rowData.Address;
                   var mapString = 'http://maps.google.com/maps?z=12&t=m&q=loc:';
                   var a = rowData.latitude;
                   var c = '+';
                   var b = rowData.longitude;
                    var mapurl = mapString + a + c + b;

                 let shareOptions = {
                     title: "Favourite Locations",
                     message: msg,
                     url: mapurl,
                     subject: "Share Favourite Location" //  for email
                   };

                      Share.open(shareOptions);
                 }}>
                      <View style={{width: 50, height: 30}}>
                      <Image source={require('../images/share-icon.png')}  style={styles.backgroundImageShare}></Image>
                      </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>{
                       //Share.open(shareOptions);
                       var mystring = 'http://maps.google.com/maps?z=12&t=m&q=loc:';
                      //  var mystring= 'http://maps.apple.com/?l1=';
                       console.log(rowData);

                      var a = rowData.latitude;
                      var c = '+';
                      var b = rowData.longitude;
                       var url = mystring + a + c + b;

                       Linking.canOpenURL(url).then(supported => {
                      if (supported) {
                      Linking.openURL(url);
                       } else {
                      console.log('Don\'t know how to go');
                      }
                      }).catch(err => console.error('An error occurred', err));
                   }}>
                       <View style={{width: 50, height: 30}}>
                       <Image source={require('../images/mapMe.png')}  style={styles.backgroundImageMap}></Image>
                       </View>
                 </TouchableOpacity>

                 <TouchableOpacity onPress={()=>{
                        //Share.open(shareOptions);
                        this.onDeleteClick(rowData);

                   }}>
                        <View style={{width: 50, height: 30}}>
                        <Image source={require('../images/deleteMe.png')}  style={styles.backgroundImageDelete}></Image>
                        </View>
                  </TouchableOpacity>

                 </View>

               </View>}
               renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
               />
               <AdMobManager
                 bannerSize = {bannerSize}
                 testDeviceID = {testDeviceID}
                 adUnitID = {adUnitID}
               />
             </View>
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
  }
});
