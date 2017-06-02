import React, {Component, PropTypes} from 'react';
import {
  ListView, 
  View, 
  TouchableOpacity, 
  Image, 
  StyleSheet,
  Dimensions,
  Keyboard,
  Platform,
  Text
} from 'react-native';
import {actions} from '../const';
const displayWidth = Dimensions.get('window').width;
const PlatformIOS = Platform.OS === 'ios';

const defaultActions = [
  actions.setBold,
  actions.setItalic,
  actions.setUnderline,
  actions.setStrikethrough,
  actions.setSubscript,
  actions.setSuperscript,
];

function getDefaultIcon() {
  const texts = {};
  texts[actions.setBold] = require('../../img/icon_format_bold.png');
  texts[actions.setItalic] = require('../../img/icon_format_italic.png');  
  texts[actions.setUnderline] = require('../../img/icon_underline@2x.png');
  texts[actions.setStrikethrough] = require('../../img/icon_strikethrough@2x.png');  
  texts[actions.setSubscript] = require('../../img/icon_subscript@2x.png');
  texts[actions.setSuperscript] = require('../../img/icon_superscript@2x.png');
  return texts;
}

export default class TextEditRow extends Component {
  render() {
    return (
      <View style={styles.mainRows}>
      {
        defaultActions.map((action, index) => {
          const icon = (getDefaultIcon()[action]);
          return (
            <TouchableOpacity
              key={action}
              style={styles.button}
              onPress={() => this.props.onPress(action)}
            >
              <Image 
                style={{ width: (index > 1) ? 25 : 40, height: (index > 1) ? 25 : 40 }}
                source={icon}
              />
            </TouchableOpacity>
          );
        })
      }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainRows: {
    width: displayWidth,
    height: 49,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
  },
  button: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  icon: {
    width: 40, 
    height: 40,
  }
});