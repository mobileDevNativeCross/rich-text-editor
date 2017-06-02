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
  Text,
  TextInput,
} from 'react-native';
import {actions} from '../const';

const displayWidth = Dimensions.get('window').width;
const displayHeight = Dimensions.get('window').height;
const PlatformIOS = Platform.OS === 'ios';

const listActions = [
  actions.insertData,
]

export default class MathView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editor: undefined,
      mathEquation: 'x = {-b \\pm \\sqrt{b^2-4ac} \\over 2a}',
    };
  }

  componentDidMount() {
    const editor = this.props.getEditor();
    if (!editor) {
      throw new Error('Toolbar has no editor!');
    } else {
      this.setState({editor: editor});
    }
  }

  sendMath = () => {
    this.props.hideMathView();    
    this.state.editor._sendAction(listActions[0], `<span class="math-tex">\\(${this.state.mathEquation}\\)</span>`);
    this.state.editor._sendAction(actions.focusEditor, 'zss_editor_content');
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View style={styles.container}>
          <TextInput
            value={this.state.mathEquation}
            style={styles.input}
            onChangeText={(text) => this.setState({ mathEquation: text })}
            underlineColorAndroid={'transparent'}
          />
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.props.hideMathView()}
            >
              <Text>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.sendMath()}
            >
              <Text>Ok</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({  
  container: {
    backgroundColor: 'white',
    borderWidth: 1,
    width: displayWidth - 50,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',    
  },
  buttonsContainer: {
    width: displayWidth - 50,
    height: 50, 
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    flex: 1,
    height: 50,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  input: {
    width: displayWidth - 90,
    height: 50,
    marginLeft: 20,
    borderWidth: 1,
    paddingLeft: 15,
    fontSize: 14,
  },
});
