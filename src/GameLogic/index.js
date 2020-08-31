/* eslint-disable eslint-comments/no-unused-disable */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  StatusBar,
  Text,
  View,
  Alert,
  BackHandler,
  TouchableOpacity,
  Modal,
  TextInput,
  SafeAreaView,
} from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import {GameEngine, dispatch} from 'react-native-game-engine';
import {Head} from './head';
import {Food} from './food';
import {Tail} from './tail';
import {GameLoop} from './systems';
import Constants from './Constants';
import {primaryColor, secondaryColor, darkStatusColor} from '../utils';
import Icon from 'react-native-vector-icons/AntDesign';

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.boardSize = Constants.GRID_SIZE * Constants.CELL_SIZE;
    this.engine = null;
    this.state = {
      running: true,
      score: 0,
      visible: false,
      onFocused: true,
      name: '',
    };
  }

  exitApp = () => {
    this.setState({running: false});

    Alert.alert('Hold on!', 'Are you sure you want to Exit?', [
      {
        text: 'Cancel',
        onPress: () => this.setState({running: false, visible: true}),
        style: 'cancel',
      },
      {text: 'YES', onPress: () => this.props.navigation.goBack()},
    ]);
    return true;
  };
  backAction = () => {
    this.setState({running: false});

    Alert.alert('Hold on!', 'Are you sure you want to Exit?', [
      {
        text: 'Cancel',
        onPress: () => this.setState({running: true}),
        style: 'cancel',
      },
      {text: 'YES', onPress: () => this.props.navigation.goBack()},
    ]);
    return true;
  };

  componentDidMount() {
    this.setState({
      visible: false,
      running: true,
    });
  }

  componentWillUnmount() {
    // this.backHandler.remove();
  }
  modal = (obj, namee) => {
    if (obj === false && namee === '') {
      Alert.alert('Please Enter Username!');
      this.setState({
        visible: true,
        running: false,
      });
    } else if (obj === false && namee != '') {
      this.setState({
        visible: false,
        running: true,
      });
    } else if (obj === true && namee === '') {
      this.setState({
        visible: true,
        running: false,
      });
    }
  };
  stdModalVisible = (show) => {
    this.setState({visible: show});
  };
  randomBetween = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  onEvent = (e) => {
    const {score} = this.state;
    if (e.type === 'game-over') {
      this.setState({
        running: false,
      });
      Alert.alert('Oops!', 'Game End?', [
        {
          text: 'Exit',
          onPress: () => this.props.navigation.goBack(),
        },
        {text: 'Replay', onPress: () => this.reset()},
      ]);
    } else if (e.type === 'score+') {
      var s = score + 1;
      this.setState({
        score: s,
      });
    }
  };

  reset = () => {
    this.engine.swap({
      head: {
        position: [0, 0],
        xspeed: 1,
        yspeed: 0,
        nextMove: 10,
        updateFrequency: 10,
        size: 20,
        renderer: <Head />,
      },
      food: {
        position: [
          this.randomBetween(0, Constants.GRID_SIZE - 1),
          this.randomBetween(0, Constants.GRID_SIZE - 1),
        ],
        size: 20,
        renderer: <Food />,
      },
      tail: {size: 20, elements: [], renderer: <Tail />},
    });
    this.setState({
      running: true,
      score: 0,
    });
  };
  handleFocuse = () => {
    this.setState({onFocused: true});
  };
  handleBlur = () => {
    this.setState({onFocused: false});
  };

  render() {
    const {score, name} = this.state;
    return (
      <>
        <SafeAreaView backgroundColor={darkStatusColor} />
        <View style={styles.Header}>
          <Text style={styles.heading}>Snake Master</Text>
        </View>
        <View style={styles.container}>
          <GameEngine
            ref={(ref) => {
              this.engine = ref;
            }}
            style={[
              {
                width: this.boardSize,
                height: this.boardSize,
                backgroundColor: '#f5f5f5',
                flex: null,
                marginTop: 20,
              },
            ]}
            systems={[GameLoop]}
            entities={{
              head: {
                position: [0, 0],
                xspeed: 1,
                yspeed: 0,
                nextMove: 10,
                updateFrequency: 10,
                size: 20,
                renderer: <Head />,
              },
              food: {
                position: [
                  this.randomBetween(0, Constants.GRID_SIZE - 1),
                  this.randomBetween(0, Constants.GRID_SIZE - 1),
                ],
                size: 20,
                renderer: <Food />,
              },
              tail: {size: 20, elements: [], renderer: <Tail />},
            }}
            running={this.state.running}
            onEvent={this.onEvent}>
          </GameEngine>
          
          <View style={styles.scoreView}>
            <Text style={styles.scoreTxt}>Score : </Text>
            <Text style={styles.scoreTxt}>{score}</Text>
          </View>

          <View style={styles.controls}>
            <View style={styles.controlRow}>
              <TouchableOpacity
                style={styles.control}
                onPress={() => {
                  this.engine.dispatch({type: 'move-up'});
                }}>
                <Icon name="upcircle" size={50} color={secondaryColor} />
              </TouchableOpacity>
            </View>
            <View style={styles.controlRow}>
              <TouchableOpacity
                style={styles.control}
                onPress={() => {
                  this.engine.dispatch({type: 'move-left'});
                }}>
                <Icon name="leftcircle" size={50} color={secondaryColor} />
              </TouchableOpacity>
              <View style={[styles.control, {backgroundColor: null}]} />
              <TouchableOpacity
                style={styles.control}
                onPress={() => {
                  this.engine.dispatch({type: 'move-right'});
                }}>
                <Icon name="rightcircle" size={50} color={secondaryColor} />
              </TouchableOpacity>
            </View>
            <View style={styles.controlRow}>
              <TouchableOpacity
                style={styles.control}
                onPress={() => {
                  this.engine.dispatch({type: 'move-down'});
                }}>
                <Icon name="downcircle" size={50} color={secondaryColor} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </>
    );
  }
}

const styles = ScaledSheet.create({
  container: {
    //flex: 1,
    backgroundColor: primaryColor,
    // alignItems: 'center',
    // justifyContent: 'center',
    flex: 1,
  },
  Header: {
    backgroundColor: darkStatusColor,
    justifyContent: 'center',
    alignItems: 'center',
    height: '50@ms',
  },
  heading: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: '20@ms',
  },
  controls: {
    // width: 400,
    // height: 400,
    flexDirection: 'column',
    marginTop: '10@ms',
    alignSelf: 'center',
    position: 'absolute',
    bottom: '30@ms'
  },
  controlRow: {
    height: '50@ms',
    width: '300@ms',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  control: {
    width: '50@ms',
    height: '50@ms',
    justifyContent: 'center',
    alignItems: 'center',
    // margin: 10,
  },
  scoreView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: darkStatusColor,
    padding: '10@ms',
    width: '50%',
    alignSelf: 'center',
    borderRadius: '10@ms',
    // paddingHorizontal: '20@ms',
    marginTop: '10@ms',
  },
  scoreTxt: {
    fontSize: '20@ms',
    fontWeight: 'bold',
    color: '#fff',
  },
  stdModalMainView: {
    height: '320@ms',
    width: '360@ms',
    backgroundColor: '#455A64',
    bottom: 0,
    position: 'absolute',
    borderTopLeftRadius: '40@ms',
    borderTopRightRadius: '40@ms',
    alignItems: 'center',
  },
  nameInput: {
    fontSize: '25@ms',
    fontWeight: 'bold',
    height: '50@ms',
    width: '250@ms',
    marginTop: '40@ms',
    textAlign: 'center',
  },
  modalHaderTxt: {
    textAlign: 'center',
    fontSize: '25@ms',
    color: 'white',
    fontWeight: 'bold',
    marginTop: '10@ms',
  },
  stdModalBtn: {
    height: '50@ms',
    width: '200@ms',
    backgroundColor: 'blue',
    marginTop: '40@ms',
    justifyContent: 'center',
    borderRadius: '40@ms',
  },
  stdTxt: {
    textAlign: 'center',
    fontSize: '25@ms',
    color: 'white',
  },
});
