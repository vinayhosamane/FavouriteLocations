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

export default class Example extends Component {

  constructor() {
    super();
    this.state = {
      bannerSize: 'smartBannerPortrait',
    };
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

  setBannerSize() {
    this.setState({
      bannerSize: 'smartBannerPortrait',
    });
  }

  render() {
    const { bannerSize } = this.state;
    console.log(bannerSize);

    return (
      <View style={Adstyles.container}>
        <View style={{ flex: 1 }}>

        </View>
        <AdMobBanner
          bannerSize={this.state.bannerSize}
          testDeviceID="EMULATOR"
          adUnitID="ca-app-pub-3940256099942544/2934735716"
        />
      </View>
    );
  }
}

const Adstyles = StyleSheet.create({
  container: {
    marginTop: (Platform.OS === 'ios') ? 30 : 10,
    flex: 1,
    alignItems: 'center',
  },
});

AppRegistry.registerComponent('Example', () => Example);
