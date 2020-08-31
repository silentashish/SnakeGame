/* eslint-disable no-undef */
import {Dimensions} from 'react-native';

export default Constants = {
  MAX_WIDTH: Dimensions.get('screen').width,
  MAX_HEIGHT: Dimensions.get('screen').height,
  GRID_SIZE: (Dimensions.get('screen').width - 20) / 20,
  CELL_SIZE: 20,
};
