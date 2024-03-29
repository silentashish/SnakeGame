import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {secondaryColor} from '../utils';

class Head extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const x = this.props.position[0];
    const y = this.props.position[1];
    return (
      <View
        style={[
          styles.finger,
          {
            width: this.props.size,
            height: this.props.size,
            left: x * this.props.size,
            top: y * this.props.size,
            borderRadius: this.props.size / 2,
          },
        ]}
      />
    );
  }
}

const styles = StyleSheet.create({
  finger: {
    backgroundColor: secondaryColor,
    position: 'absolute',
  },
});

export {Head};
