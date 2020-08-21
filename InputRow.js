import React from 'react'
import { Button, Keyboard, StyleSheet, Text, TextInput, TouchableWithoutFeedback,
  View } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  label: {
    fontSize: 16,
    padding: 8,
  },
  input: {
    padding: 8,
    fontSize: 16,
    width: 45,
  }
})

export default class InputRow extends React.Component {
  state = {
    min: '',
    sec: '',
    isValid: false,
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.min !== prevState.min || this.state.sec !== prevState.sec) {
      this.validate()
    }
  }

  handleMinChange = min => {
    this.setState({min})
  }

  handleSecChange = sec => {
    this.setState({sec})
  }

  validate = () => {
    if (+this.state.min >= 0 && +this.state.min < 60
    && +this.state.sec >= 0 && +this.state.sec < 60 && this.state.min && this.state.sec) {
      this.setState({isValid: true})
    } else {
        this.setState({isValid: false})
    }
  }

  handleSubmit = () => {
    this.props.onSubmit(this.state)
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>{this.props.label}</Text>
        <TextInput style={styles.input} placeholder='Min' keyboardType="numeric"
        maxLength={2} onChangeText={this.handleMinChange} />
        <TextInput style={styles.input} placeholder='Sec' keyboardType="numeric"
        maxLength={2} onChangeText={this.handleSecChange} />
        <Button title="Change" onPress={this.handleSubmit} disabled={!this.state.isValid}/>
      </View>
    )
  }
}
