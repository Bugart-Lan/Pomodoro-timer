import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import { vibrate } from './utils'


function display(x) {
  if (Math.floor(x / 10) === 0) {
    return "0" + x
  } else {
    return x
  }
}

export default class Timer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      minute: props.workMin,
      second: props.workSec,
      pause: true,
      work: true,
    }
  }

  componentDidMount() {
    this.interval = setInterval(this.oneSecondPass, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  switchTask = () => {
    if (this.state.work) {
      this.setState({
        minute: this.props.breakMin,
        second: this.props.breakSec,
      })
    } else {
      this.setState({
        minute: this.props.workMin,
        second: this.props.workSec,
      })
    }
    this.setState(prevState => ({pause: true, work: !prevState.work}), vibrate)
  }

  oneSecondPass = () => {
    if (this.state.pause) return false
    if (this.state.second === 0 && this.state.minute === 0) {
      this.switchTask()
    } else if (this.state.second > 0) {
      this.setState({second: this.state.second - 1})
    } else {
      this.setState({minute: this.state.minute - 1, second: 59})
    }
  }

  start = () => {
    this.setState({pause: false})
  }

  stop = () => {
    this.setState({pause: true})
  }

  reset = () => {
    this.setState({
      minute: this.props.workMin,
      second: this.props.workSec,
      pause: true,
      work: true,
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={[styles.title, styles.h1]}>{this.state.work ? 'Work' : 'Break'} </Text>
        <Text style={styles.h1}>{display(this.state.minute)}:{display(this.state.second)}</Text>
        <View style={styles.row}>
          <Button title="Start" onPress={this.start}/>
          <Button title="Pause" onPress={this.stop}/>
        </View>
        <Button title='Reset' onPress={this.reset}/>
        <View style={styles.container}>
          <Text style={[styles.h2, styles.title2]}>Current Timer</Text>
          <View style={styles.row}>
            <Text style={[styles.h3, styles.label]}>Working time</Text>
            <Text style={styles.h3}>{display(this.props.workMin)}:{display(this.props.workSec)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={[styles.h3, styles.label]}>Break time</Text>
            <Text style={styles.h3}>{display(this.props.breakMin)}:{display(this.props.breakSec)}</Text>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  h1: {
    fontSize: 48
  },
  h2: {
    fontSize: 24,
  },
  h3: {
    fontSize: 16,
  },
  title: {
    marginBottom: 48,
  },
  title2: {
    marginTop: 24,
    padding: 24,
  },
  row: {
    paddingTop: 12,
    flexDirection: 'row',
  },
  label: {
    width: 125,
  }
})
