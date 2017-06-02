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
import ModalDropdown from '../dropdown';
import {actions} from '../const';
const displayWidth = Dimensions.get('window').width;
const PlatformIOS = Platform.OS === 'ios';
const downArrow = require('../../img/icon_down_arrow.png');

const listActions = [
  actions.alignLeft,
  actions.alignCenter,
  actions.alignRight,
  actions.alignFull
]

function getDefaultListsIcon() {
  const texts = {};
  texts[actions.alignLeft] = require('../../img/icon_left_justify@2x.png');
  texts[actions.alignCenter] = require('../../img/icon_center_justify@2x.png');
  texts[actions.alignRight] = require('../../img/icon_right_justify@2x.png');
  texts[actions.alignFull] = require('../../img/icon_force_justify@2x.png');
  return texts;
}

export default class FontEditRow extends Component {
  constructor() {
    super();
    this.state = {
      selectedFont: 'Arial',
    };
  }

  renderRows = (rowData, rowID,) => {
    return (
      <View style={styles.dropDownCell}>
        <Text>{rowData}</Text>
      </View>
    );
  }

  selectHeading = (idx, value) => {
    this.setState({ selectedFont: value }, () => {
      this.props.onPress(actions.setFontFamily, value);
    });
  }

  render() {
    return (
      <View style={styles.mainRows}>
        <View style={styles.dropDownContainer}>
          <ModalDropdown
            dropdownStyle={styles.dropDownBody}
            style={{ flex: 1,  }}
            options={['Arial', 'Georgia', 'Palatino Linotype','Times New Roman', 'Trebuchet MS', 'Verdana', 'Courier New']}
            renderRow={this.renderRows}
            onSelect={(idx, value) => this.selectHeading(idx, value)}
          >
          <View style={styles.fontContainer}>
            <Text style={{ marginLeft: 15 }}>{this.state.selectedFont}</Text>
              <Image 
                source={downArrow}
                style={styles.downArrow}
                resizeMode={'contain'}
              />
            </View>
          </ModalDropdown>
        </View>
        <View style={styles.rightContainer}>
          {
            listActions.map((action, index) => {
              const icon = (getDefaultListsIcon()[action]);
              return (
                <TouchableOpacity
                  key={action}
                  style={styles.button}
                  onPress={() => this.props.onPress(action)}
                >     
                  <Image source={icon} style={styles.icon}/>     
                </TouchableOpacity>
              );   
            })
          }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  dropDownContainer: { 
    width: displayWidth / 2 + 7,
    height: 49, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
  },
  fontContainer: { 
    width: displayWidth / 2, 
    height: 50, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
  },
  downArrow: {
    width: 30,
    height: 15,
    marginRight: 10,
  },
  dropDownCell: { 
    width: (displayWidth / 2) - 15, 
    height: 30, 
    alignItems: 'flex-start', 
    justifyContent: 'center', 
    paddingLeft: 15 
  },
  dropDownBody: {
    width: displayWidth / 2 + 7,
    height: 95,
    marginTop: (Platform.OS === 'ios') ? 0 : - 30,
  },
  rightContainer: { 
    flex: 1, 
    height: 49, 
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center', 
    borderLeftWidth: 1 
  },
  mainRows: {
    width: displayWidth,
    height: 49,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  verticalSeparator: { 
    width: 1, 
    height: 40, 
    backgroundColor: 'rgb(122, 57, 150)' 
  },
  button: { 
    height: 50 , 
    width: displayWidth / 9, 
    justifyContent: 'center', 
    flexDirection: 'row', 
    alignItems: 'center', 
  },
  icon: { 
    width: 30, 
    height: 30,
  },
});