import React from 'react'
import { Dimensions, StatusBar } from 'react-native'
import styled from 'styled-components'
import LinearGradient from 'react-native-linear-gradient'
import DateTimePicker from 'react-native-modal-datetime-picker'
import dayjs from 'dayjs'

import Time from './components/Time'
import config from './config.json'
import styles from './styles'

const { width } = Dimensions.get('window')

const { colors } = styles

const Container = styled(LinearGradient)`
  flex: 1;
  background-color: ${colors.purple};
  align-items: center;
  justify-content: center;
`

const Header = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`

const Contents = styled.View`
  flex: 2;
  align-items: center;
  justify-content: center;
`

const SleepDuration = styled.Text`
  font-size: 18px;
  line-height: 24px;
  color: ${colors.white};
  text-align: center;
  max-width: ${width - 64}px;
`

export default class App extends React.Component {
  state = {
    date: dayjs().toString(),
    isTimePickerVisible: false
  }

  constructor(props) {
    super(props)

    this.openTimePicker = this.openTimePicker.bind(this)
    this.handleAlarmCancel = this.handleAlarmCancel.bind(this)
    this.handleAlarmChange = this.handleAlarmChange.bind(this)
  }

  calculateSleepDuration() {
    const currentDate = dayjs()
    const alarmDate = dayjs(this.state.date)
    const difference = currentDate.diff(alarmDate, 'hours', true)

    return Math.abs(difference.toFixed(2))
  }

  openTimePicker() {
    this.setState({ isTimePickerVisible: true })
  }

  handleAlarmCancel() {
    this.setState({ isTimePickerVisible: false })
  }

  handleAlarmChange(date) {
    this.setState({
      date: dayjs(date).toString(),
      isTimePickerVisible: false
    })
  }

  render() {
    const { date, isTimePickerVisible } = this.state

    const sleepDuration = this.calculateSleepDuration()

    return (
      <>
        <StatusBar backgroundColor={colors.blue} />
        <Container colors={[colors.blue, colors.purple]}>
          <Contents>
            <Time onPress={this.openTimePicker} date={date} />
            <SleepDuration>
              You're going to get {sleepDuration} hours of sleep
            </SleepDuration>
            <DateTimePicker
              mode="time"
              isVisible={isTimePickerVisible}
              onCancel={this.handleAlarmCancel}
              onConfirm={this.handleAlarmChange}
            />
          </Contents>
        </Container>
      </>
    )
  }
}
