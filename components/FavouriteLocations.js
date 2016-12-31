import React, { Component } from 'react';

import {
  Navigator,
} from 'react-native';

import First from './First.js';

export default class FavouriteLocations extends Component {

  constructor(props) {
      super(props);
      this.state = {
      };
  }

  renderScene(route, navigator) {
      return <route.component navigator={navigator} {...route.passProps} />
  }

  configureScene(route, routeStack) {
      if(route.type == 'Modal') {
        return Navigator.SceneConfigs.FloatFromBottom
      }
      return Navigator.SceneConfigs.PushFromRight
  }

  render() {
    return (
      <Navigator configureScene={ this.configureScene }
                 style={{ flex:1 }}
                 initialRoute={{ component: First }}
                 renderScene={ this.renderScene } />
    );
  }
}
