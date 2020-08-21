import React from 'react';
import { Keyboard, KeyboardAvoidingView, StyleSheet, Text, TextInput,TouchableWithoutFeedback,
   View } from 'react-native';

import Timer from './Timer.js'
import InputRow from './InputRow.js'

export default class App extends React.Component {
  state = {
    workMin: 0,
    workSec: 50,
    breakMin: 0,
    breakSec: 25,
  }

  changeWorkTime = time => {
    this.setState({workMin: +time.min, workSec: +time.sec})
  }

  changeBreakTime = time => {
    this.setState({breakMin: +time.min, breakSec: +time.sec})
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <KeyboardAvoidingView behavior="position">
            <Timer {...this.state}/>
            <Text style={styles.title}>Modify Timer</Text>
            <InputRow label="Working Time" onSubmit={this.changeWorkTime}/>
            <InputRow label="Break Time" onSubmit={this.changeBreakTime}/>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    padding: 24,
    marginTop: 54,
    textAlign: 'center',
  },
});
