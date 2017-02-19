import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Navigator,
  ListView,
  Image,
  Alert,
  Linking,
  TouchableOpacity,
  StatusBar
} from 'react-native';

import Button from 'react-native-button';
import Icon from 'react-native-vector-icons';
import * as firebase from 'firebase';

//import {RefresherListView,LoadingBarIndicator} from 'react-native-refresher';

import Spinner from './Spinner.js';

import Share from 'react-native-share';
import First from './First.js';
import AdMobManager from './AdMobManager';
var bannerSize="smartBannerPortrait"

if(__DEV__)
  {
    var testDeviceID="EMULATOR"
var adUnitID="ca-app-pub-6988619974528181/2050848152"
  }
else
  {
    var testDeviceID=""
var adUnitID="ca-app-pub-6988619974528181/2050848152"
}

export default class FavouriteLocationsFromHomeScreen extends Component {


  constructor(props) {
      super(props)
      const ds = new ListView.DataSource({
          rowHasChanged: (r1, r2) => r1 !== r2
      });
      this.state = {
          name: 'MaxTech Login-->',
          dataArray: this.props.name,
          visible: false,
          dataSource: ds.cloneWithRows(this.props.name),
        isLoading: false
      };
  }

  _handleLogoutPress(event) {
    this.props.navigator.pop();
  }

  _navigate(name, type='Normal') {
    this.props.navigator.push({
      component: First,
      passProps: {name: name},
      type: type
    })
  }

 componentDidMount() {
  this.setState({dataSource: this.state.dataSource.cloneWithRows(this.props.name)});
 }

 // componentWillMount()
 // {
 //   const userData = firebase.auth().currentUser;
 //   var userid = userData.uid;
 //   var newArray = []
 //   var itemsRef = firebase.database().ref('testing/'+userid);
 //   itemsRef.orderByChild(userid).on("child_added", (snapshot) => {
 //         console.log(snapshot.val());
 //         //this.setState({isLoading: false});
 //
 //         var data = snapshot.val()
 //         newArray.push(data)
 //
 //         console.log(data.Description);
 //         console.log(data.latitude);
 //         console.log(data.longitude);
 //   }, (errorObject) => {
 //         console.log("The read failed: " + errorObject.code);
 //         //this.setState({isLoading: false});
 //   });
 //
 // }

  onCancel() {
     this.setState({visible:false});
   }

   onOpen() {
     this.setState({visible:true});
   }

   onMapClick() {

   }
  
   onRefresh() 
   {
    // You can either return a promise or a callback
     
     const userData = firebase.auth().currentUser;
   var userid = userData.uid;
   var newUpdatedArray = []
   var itemsRef = firebase.database().ref('testing/'+userid);
   itemsRef.orderByChild(userid).on("child_added", (snapshot) => {
         console.log(snapshot.val());
         //this.setState({isLoading: false});
 
         var data = snapshot.val()
         newUpdatedArray.push(data)
 
         console.log(data.Description);
         console.log(data.latitude);
         console.log(data.longitude);
   }, (errorObject) => {
         console.log("The read failed: " + errorObject.code);
         //this.setState({isLoading: false});
   });
  
     if(newUpdatedArray)
       {
           this.setState({dataSource:this.state.dataSource.cloneWithRows(newUpdatedArray)});
         this.forceUpdate();
     }
  
  }

 onDeleteClick(rowData) {
  console.log(rowData);
   Alert.alert(
          'Delete This Location',
          'Are you sure you want to delete this location from list?.',
          [
            {text: 'No', onPress: () => console.log('Cancel Pressed!')},
            {text: 'Yes', onPress: () => {
                  console.log('OK Pressed!')
                  this.setState({isLoading:true});
                  const userData = firebase.auth().currentUser;
                  var userid = userData.uid;
                  var itemsRef = firebase.database().ref('testing/'+userid);
                                  itemsRef.orderByChild(userid).on("child_added", (snapshot) => {
                                  console.log(snapshot.val());

                                  var newArray = [];
                                  var data = snapshot.val()
                                  newArray.push(data)

                                  var index = 0;

                                  if(snapshot.val().Description == rowData.Description && snapshot.val().Placemark == rowData.Placemark && snapshot.val().latitude == rowData.latitude && snapshot.val().longitude == rowData.longitude && snapshot.val().Address == rowData.Address) {
                                        snapshot.ref.remove();
                                        newArray.pop(data);
                                        Alert.alert('Alert', 'Your Location deleted successfully.Now you can add new locations to your list.',
                                        [
                                          {text: 'OK', onPress: () => {
                                               console.log('OK Pressed!')
                                                 this.setState({isLoading:false});
                                           // this.setState({dataSource:this.state.dataSource.cloneWithRows(newArray)});
//                                            this.setState({
//                                                    dataSource: this.state.dataSource.cloneWithRows(this.props.name),
//                                                     dataArray: this.props.name,
//                                                 });
                                                // this.forceUpdate();
                                            //firebase.database().ref('testing').off();
                                              // this.props.navigator.pop();
                                            
                                              this.onRefresh();
                                               return;
                                             }
                                           }
                                         ]
                        
                                       )
                                  } else {
                                    index++;
                                  }
                                }, (errorObject) => {
                                      this.setState({isLoading:false});
                                      console.log("The read failed: " + errorObject.code);
                                });
                             
                                 this.setState({isLoading:false});
                   }
                }
           ]
       );
   }

 onShareClick() {

 }
  
  

 renderRow = (rowData) => {
    return (
      <View>
           <Text style={{textAlign: 'center', marginTop:10, fontSize:20,color:'blue',fontWeight: "bold"}}>{rowData.Description}</Text>
           <Text style={{textAlign: 'center', marginTop:10, fontSize:20,color:'black'}}>Placemark : {rowData.Placemark}</Text>
           <Text style={{textAlign: 'center', marginTop:10, fontSize:20,color:'black'}}>Latitude : {rowData.latitude}</Text>
           <Text style={{textAlign: 'center', marginTop:10, fontSize:20,color:'black'}}>Longitude : {rowData.longitude}</Text>
           <Text style={{textAlign: 'center', marginTop:10, fontSize:20,color:'black'}}>Address : {rowData.Address}</Text>
           <View style={{flex: 1,flexDirection: 'row', justifyContent: 'space-between'}}>
               <TouchableOpacity onPress={()=> {
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
            </View>
    )
  }

 render() {
    return (
          <View style={styles.container_Second_2}>
         <Spinner visible={this.state.isLoading} size="large" color="white"/>
            <StatusBar backgroundColor="rgb(55,55,55)" barStyle="light-content"/>
             <View style={styles.halfHeight_Second_2}>
               <Button style={styles.backButtonStyle}
                       onPress={this._handleLogoutPress.bind(this)}>
                       ◀️ Back
               </Button>
             </View>

             <View style={styles.quarterHeight1_Second_3}>
               <ListView dataSource={this.state.dataSource}
                         renderRow= {this.renderRow}
                         renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />} />
                         <AdMobManager bannerSize = {bannerSize} testDeviceID = {testDeviceID} adUnitID = {adUnitID}/>
              </View>
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
        backgroundColor: 'blue'
    },
    container_Second_2: {
        flex: 1,
        flexDirection: 'column'
    },
    halfHeight_Second_2: {
        flex: .09,
        justifyContent: 'center',
        backgroundColor: '#FF3366'
    },
    backButtonStyle: {
      borderColor: 'white',
      color: 'white',
      alignSelf: 'flex-start'
    },
    quarterHeight1_Second_2: {
        flex: .50,
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
