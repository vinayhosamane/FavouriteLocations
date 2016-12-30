import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableHighlight,
} from 'react-native';
import { AdMobInterstitial, AdMobBanner } from 'react-native-admob';

class adMobManager extends Component {

 constructor(props) {
    super(props);
    this.state = {
      bannerSize: "",
      testDeviceID: "",
      adUnitID: "",
    };
    this.state.bannerSize = this.props.bannerSize
    this.state.testDeviceID = this.props.testDeviceID
    this.state.adUnitID = this.props.adUnitID
    this.setBannerSize = this.setBannerSize.bind(this);
  }

  componentDidMount() {
    AdMobInterstitial.setTestDeviceID('EMULATOR');
    AdMobInterstitial.setAdUnitId('ca-app-pub-3940256099942544/1033173712');

    AdMobInterstitial.addEventListener('interstitialDidLoad',
      () => console.log('interstitialDidLoad event'));
    AdMobInterstitial.addEventListener('interstitialDidClose',
      this.interstitialDidClose);
    AdMobInterstitial.addEventListener('interstitialDidFailToLoad',
      () => console.log('interstitialDidFailToLoad event'));
    AdMobInterstitial.addEventListener('interstitialDidOpen',
      () => console.log('interstitialDidOpen event'));
    AdMobInterstitial.addEventListener('interstitialWillLeaveApplication',
      () => console.log('interstitalWillLeaveApplication event'));

    AdMobInterstitial.requestAd((error) => error && console.log(error));
  }

  componentWillUnmount() {
    AdMobInterstitial.removeAllListeners();
  }

  interstitialDidClose() {
    console.log('interstitialDidClose event');
    AdMobInterstitial.requestAd((error) => error && console.log(error));
  }

  showInterstital() {
    AdMobInterstitial.showAd((error) => error && console.log(error));
  }

  setBannerSize() {
    const { bannerSize } = this.state;
    this.setState({
      bannerSize: bannerSize === 'smartBannerPortrait' ?
        'mediumRectangle' : 'smartBannerPortrait',
    });
  }

  render() {
    const { bannerSize } = this.state;
    console.log(bannerSize);

    return (
        <AdMobBanner
          bannerSize={this.state.bannerSize}
          testDeviceID={this.state.testDeviceID}
          adUnitID={this.state.adUnitID}
        />
    );
  }
}

module.exports = adMobManager
