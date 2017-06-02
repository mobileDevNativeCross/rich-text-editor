import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Platform,
    TouchableOpacity,
    Modal,
    Dimensions,
} from 'react-native';
import RichTextEditor from './RichTextEditor';
import RichTextToolbar from './RichTextToolbar';
import RichTextPanel from './RichTextPanel';
import MathView from './modal_view/MathView';
import KeyboardSpacer from './keyboardSpacer';

const displayWidth = Dimensions.get('window').width;
const displayHeight = Dimensions.get('window').height;

export default class RichTextView extends Component {

  constructor(props) {
    super(props);
    this.getHTML = this.getHTML.bind(this);
    this.setFocusHandlers = this.setFocusHandlers.bind(this);
    this.state = {
      isShowToolbar: false,
      isShowMathView: false,
    }
  }

  hideTextPanel = () => {
    this.setState({ isShowToolbar: !this.state.isShowToolbar });
  }

  hideMathView = () => {
    this.setState({ isShowMathView: !this.state.isShowMathView });
  }

  render() {
    return (
      <View style={styles.container}>
        <RichTextEditor
          ref={(r)=>this.richtext = r}
          style={this.props.styles}
          initialContentHTML={this.props.content}
          editorInitializedCallback={() => this.onEditorInitialized()}
        />
          <RichTextToolbar
            getEditor={() => this.richtext}
            hideTextPanel={this.hideTextPanel}
            hideMathView={this.hideMathView}
          />
          <Modal visible={this.state.isShowToolbar} animationType={'slide'} transparent={true} onRequestClose={() => this.hideTextPanel()}>
            <RichTextPanel
              getEditor={() => this.richtext}
              hideTextPanel={this.hideTextPanel}              
            />
          </Modal>
          <Modal visible={this.state.isShowMathView} animationType={'slide'} transparent={true} onRequestClose={() => this.hideMathView()}>
            <MathView
              getEditor={() => this.richtext}
              hideMathView={this.hideMathView}
            />
          </Modal> 
        {(Platform.OS === 'ios') && <KeyboardSpacer/>}
      </View>
    );
  } 

  onEditorInitialized() {  
    this.setFocusHandlers();
    this.getHTML();
  }

  async getHTML() {
    const titleHtml = await this.richtext.getTitleHtml();
    const contentHtml = await this.richtext.getContentHtml();
  }

  setFocusHandlers() {
    this.richtext.setTitleFocusHandler(() => {
    });
    this.richtext.setContentFocusHandler(() => {
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    // paddingTop: 40,
  },
  richText: {
    alignItems:'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
});
