import React from 'react';
import {View, Text, SafeAreaView, StatusBar} from 'react-native';
// import {Button} from 'native-base';
import {styles} from './styles';
import LottieView from 'lottie-react-native';
import {Button, Divider} from '../components';
import {secondaryColor, primaryColor, darkStatusColor} from '../utils';

export default (props) => {
  const {navigation} = props;
  return (
    <>
      <SafeAreaView />
      <StatusBar backgroundColor={darkStatusColor} />
      <View style={styles.mainView}>
        <View style={styles.centerElement}>
          <Text style={[styles.bigText, {color: secondaryColor}]}>
            Snake Master
          </Text>

          <View style={styles.animationBox}>
            <LottieView
              source={require('../assets/animations/snake.json')}
              autoPlay
              loop
              style={styles.animation}
            />
          </View>

          {/* <Text style={styles.smallText}>
          Play wit
        </Text> */}

          <Divider big />
          <Divider big />

          <Button onPress={() => navigation.navigate('GameScreen')}>
            Start Now
          </Button>
        </View>
      </View>
    </>
  );
};
