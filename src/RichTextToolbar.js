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
  Alert
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {actions} from './const';

const displayWidth = Dimensions.get('window').width;
const PlatformIOS = Platform.OS === 'ios';

const defaultActions = [
  actions.setBold,
  actions.setItalic,
  actions.setUnderline,
  actions.setStrikethrough,
  actions.setSubscript,
  actions.setSuperscript,
  actions.insertBulletsList,
  actions.insertOrderedList,
  actions.insertImage,
  actions.insertData,
  actions.insertData,
];

function getDefaultIcon() {
  const texts = {};
  texts[actions.setBold] = require('../img/icon_format_bold.png');
  texts[actions.setItalic] = require('../img/icon_format_italic.png');  
  texts[actions.setUnderline] = require('../img/icon_underline@2x.png');
  texts[actions.setStrikethrough] = require('../img/icon_strikethrough@2x.png');  
  texts[actions.setSubscript] = require('../img/icon_subscript@2x.png');
  texts[actions.setSuperscript] = require('../img/icon_superscript@2x.png');
  texts[actions.insertBulletsList] = require('../img/icon_format_ul.png');
  texts[actions.insertOrderedList] = require('../img/icon_format_ol.png');
  texts[actions.insertImage] = require('../img/icon_format_media.png');
  texts[actions.insertData] = require('../img/icon_format_media.png');
  texts[actions.insertData] = require('../img/icon_format_media.png');
  return texts;
}

export default class RichTextToolbar extends Component {

  static propTypes = {
    getEditor: PropTypes.func.isRequired,
    actions: PropTypes.array,
    onPressAddLink: PropTypes.func,
    onPressAddImage: PropTypes.func,
    selectedButtonStyle: PropTypes.object,
    iconTint: PropTypes.any,
    selectedIconTint: PropTypes.any,
    unselectedButtonStyle: PropTypes.object,
    renderAction: PropTypes.func,
    iconMap: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this._onKeyboardDidHide = this._onKeyboardDidHide.bind(this);
    const actions = this.props.actions ? this.props.actions : defaultActions;
    this.state = {
      editor: undefined,  
      actions,
      ds: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows(this.getRows(actions, []))
    };
  }

  componentDidReceiveProps(newProps) {
    const actions = newProps.actions ? newProps.actions : defaultActions;
    this.setState({
      actions,
      ds: this.state.ds.cloneWithRows(this.getRows(actions, this.state.selectedItems))
    });
  }

  getRows(actions, selectedItems) {
    return actions.map((action) => {return {action, selected: selectedItems.includes(action)};});
  }

  componentWillMount() {
    if(PlatformIOS) {
      this.keyboardEventListeners = [
        Keyboard.addListener('keyboardDidHide', this._onKeyboardDidHide)
      ];
    } else {
      this.keyboardEventListeners = [
        Keyboard.addListener('keyboardDidHide', this._onKeyboardDidHide)
      ];
    }
  }

  _onKeyboardDidHide(event) {
    // this.props.showTextPanel();
  }

  componentDidMount() {
    const editor = this.props.getEditor();
    if (!editor) {
      throw new Error('Toolbar has no editor!');
    } else {
      this.setState({editor});
    }
  }

  componentWillUnmount() {
    this.keyboardEventListeners.forEach((eventListener) => eventListener.remove());
  }

  setSelectedItems(selectedItems) {
    if (selectedItems !== this.state.selectedItems) {
      this.setState({
        selectedItems,
        ds: this.state.ds.cloneWithRows(this.getRows(this.state.actions, selectedItems))
      });
    }
  }

  _getButtonIcon(action) {
    if (this.props.iconMap && this.props.iconMap[action]) {
      return this.props.iconMap[action];
    } else if (getDefaultIcon()[action]){
      return getDefaultIcon()[action];
    } else {
      return undefined;
    }
  }

  pressButton = (action, rowSection) => {
    if (rowSection == defaultActions.length - 1) { 
      this.props.hideTextPanel();
    } else if (defaultActions.length - 2 == rowSection) {
      this.props.hideMathView();
    } else if (defaultActions.length - 3 == rowSection) {
      this.getPhotoFromDevice();
    } else {
        this._onPress(action);
    }
  }

  _defaultRenderAction(action, selected, rowSection) {
    const icon = this._getButtonIcon(action);
    return (
      <TouchableOpacity
          key={action}
          style={[
            { height: 50 , width: displayWidth / 9, justifyContent: 'center', flexDirection: 'row', alignItems: 'center',},
          ]}
          onPress={() => this.pressButton(action, rowSection)}
      >
      {(action === 'unorderedList') &&  <View style={styles.verticalSeparator} />}
        <Image source={icon} style={{ width: (rowSection > 1 && rowSection < 6) ? 25 : 40, height: (rowSection > 1 && rowSection < 6) ? 25 : 40, }}/>
      {(action === 'orderedList') && <View style={styles.verticalSeparator} />}
      </TouchableOpacity>
    );
  }

  _renderAction(action, selected, rowSection) {
    return this.props.renderAction ?
      this.props.renderAction(action, selected) :
      this._defaultRenderAction(action, selected, rowSection);
  }

  render() {
    return (
      <View
          style={[styles.toolbarContainer, this.props.style]}
      >
        <ListView          
          horizontal
          contentContainerStyle={{flexDirection: 'row'}}
          dataSource={this.state.ds}
          renderRow= {(row, rowID, rowSection) => this._renderAction(row.action, row.selected, rowSection)}
        />
      </View>
    );
  }

  getPhotoFromDevice() {
    const options = {
      storageOptions: {
        skipBackup: true,
      },
      quality: Platform.OS === 'ios' ? 5 : 1,
      maxWidth: 500,
      maxHeight: 500,
    };
    ImagePicker.showImagePicker(options, (response) => {
      if (!response.didCancel && !response.error && !response.customButton) {
        const source = { uri: '' + response.data, isStatic: true };
        const images = [source].map((image) => {
          let imageBase64String = image.uri;
          const alt = '';
          this.state.editor._sendAction(actions.focusEditor, 'zss_editor_content'); 
          this._onPress(actions.insertImageBase64String, {imageBase64String, alt});
          this.state.editor._sendAction(actions.focusEditor, 'zss_editor_content');         
        });
      }
    });
  }

  _onPress(action, data) {
    switch(action) {
      case actions.setBold:
      case actions.setItalic:
      case actions.insertBulletsList:
      case actions.insertOrderedList:
      case actions.setUnderline:
      case actions.heading1:
      case actions.heading2:
      case actions.heading3:
      case actions.heading4:
      case actions.heading5:
      case actions.heading6:
      case actions.setParagraph:
      case actions.removeFormat:
      case actions.alignLeft:
      case actions.alignCenter:
      case actions.alignRight:
      case actions.alignFull:
      case actions.setSubscript:
      case actions.setSuperscript:
      case actions.setStrikethrough:
      case actions.setHR:
      case actions.setIndent:
      case actions.setOutdent: 
      case actions.setHR:    
        this.state.editor._sendAction(action);
        break;
      case actions.insertLink:
        this.state.editor.prepareInsert();
        if(this.props.onPressAddLink) {
          this.props.onPressAddLink();
        } else {
          this.state.editor.getSelectedText().then(selectedText => {
            this.state.editor.showLinkDialog(selectedText);
          });
        }
        break;
      case actions.insertImage:
        this.state.editor.prepareInsert();
        if(this.props.onPressAddImage) {
          this.props.onPressAddImage();
        }
        break;
      case actions.insertHTML:
        this.state.editor._sendAction(action, data);
        break;
      case actions.insertImageBase64String:
        this.state.editor._sendAction(action, data);
        break;
        break;
    }
  }
}

const styles = StyleSheet.create({
  toolbarContainer: {
    height: 50, 
    alignItems: 'center', 
    borderTopWidth: 1, 
    borderBottomWidth: 1,    
    borderColor: 'rgb(122, 57, 150)'
  },
  verticalSeparator: { 
    width: 1, 
    height: 40, 
    backgroundColor: 'rgb(122, 57, 150)' 
  },
  defaultSelectedButton: {
    backgroundColor: 'red'
  },
  defaultUnselectedButton: {}
});