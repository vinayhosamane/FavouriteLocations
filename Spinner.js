import React from 'react';
import SpinnerComp from 'react-native-loading-spinner-overlay';

export default class  Spinner extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return(
            <SpinnerComp visible={this.props.visible} color="white"/>
        )
    }
}
