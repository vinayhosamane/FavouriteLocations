
import React, { Component } from 'react';

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


class Second extends React.Component{

    constructor(props) {
         super(props);
         this.state = {
             isLoading: true,
             dataSource: new ListView.DataSource({
                 rowHasChanged: (row1, row2) => row1 !== row2
             })
         };
     }

     componentDidMount() {
     this.fetchData();
 }

 fetchData() {
   var REQUEST_URL = 'https://www.googleapis.com/books/v1/volumes?q=subject:fiction';
     fetch(REQUEST_URL)
     .then((response) => response.json())
     .then((responseData) => {
         this.setState({
             dataSource: this.state.dataSource.cloneWithRows(responseData.items),
             isLoading: false
         });
     })
     .done();
 }

    _onPressLike()
    {
      alert("Like button Pressed")
    }
    renderBook(book) {
       return (
            <TouchableHighlight>
                <View>
                    <View style={styles.Listcontainer}>
                        <Image
                            source={{uri: book.volumeInfo.imageLinks.thumbnail}}
                            style={styles.thumbnail} />
                        <View style={styles.rightContainer}>
                            <Text style={styles.title}>{book.volumeInfo.title}</Text>
                            <Text style={styles.author}>{book.volumeInfo.authors}</Text>
                        </View>
                    </View>
                    <View style={styles.separator} />
                </View>
            </TouchableHighlight>
       );
   }

   renderLoadingView() {
       return (
           <View style={styles.loading}>
               <ActivityIndicatorIOS
                   size='large'/>
               <Text>
                   Loading books...
               </Text>
           </View>
       );
   }

  render() {

    if (this.state.isLoading) {
    return this.renderLoadingView();
    }

    return (
      // <View style={styles.toolbar}>
      //                 <TouchableHighlight onPress={() => this.props.navigator.pop()} underlayColor='blue'>
      //               <Text style={styles.toolbarButton}>Back</Text>
      //                 </TouchableHighlight>
      //               <Text style={styles.toolbarTitle}>MaxTech News Feed</Text>
      //               <TouchableHighlight onPress={this._onPressLike} underlayColor='blue'>
      //               <Image source={{uri:"/Users/vhosb/HelloWorld/ios/HelloWorld/Images.xcassets/like.png.imageset/like.png"}}  style={styles.backgroundImageToolBar}></Image>
      //               </TouchableHighlight>
// <View>
// <TouchableHighlight onPress={() => this.props.navigator.pop()} underlayColor='blue'>
//              <Text style={styles.toolbar}>  Back</Text>
//                 </TouchableHighlight>
                <ScrollView>
              <ListView
                  dataSource={this.state.dataSource}
                  renderRow={this.renderBook.bind(this)}
                  style={styles.listView}
                  />
                  </ScrollView>
      // </View>
    );
  }
};

  module.exports =Second;
