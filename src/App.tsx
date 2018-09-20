import * as React from 'react'
import { Dimensions, StatusBar } from 'react-native'
import styled from 'styled-components/native'
import LinearGradient from 'react-native-linear-gradient'
import DateTimePicker from 'react-native-modal-datetime-picker'
import dayjs from 'dayjs'

import Time from './components/Time'
import Buttons from './components/Buttons'
import styles from './styles'

const { width } = Dimensions.get('window')
const { colors } = styles

const Container = styled(LinearGradient)`
  flex: 1;
  background-color: ${colors.purple};
  align-items: center;
  justify-content: center;
`

const Contents = styled.View`
  flex: 1;
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
    alarm: 3.6 * Math.pow(10, 6),
    isTimePickerVisible: false
  }

  constructor(props: {}) {
    super(props)

    this.openTimePicker = this.openTimePicker.bind(this)
    this.handleAlarmCancel = this.handleAlarmCancel.bind(this)
    this.handleAlarmChange = this.handleAlarmChange.bind(this)
  }

  calculateSleepDuration() {
    const { alarm } = this.state

    const alarmDate = dayjs().add(alarm, 'millisecond')
    const difference = alarmDate.diff(dayjs(), 'hour', true)

    return Math.abs(parseInt(difference.toFixed(2)))
  }

  openTimePicker() {
    this.setState({ isTimePickerVisible: true })
  }

  handleAlarmCancel() {
    this.setState({ isTimePickerVisible: false })
  }

  handleAlarmChange(date: Date) {
    const alarmDate = dayjs(date)
    const timeDifference = alarmDate.diff(dayjs(), 'millisecond', true)

    // Alarm adjusted so that it's in the future
    const dayInMs = 8.64 * Math.pow(10, 7)
    const alarm = timeDifference < 0 ? timeDifference + dayInMs : timeDifference

    this.setState({
      alarm,
      isTimePickerVisible: false
    })
  }

  render() {
    const { alarm, isTimePickerVisible } = this.state

    const sleepDuration = this.calculateSleepDuration()

    return (
      <>
        <StatusBar backgroundColor={colors.blue} />

        <Container colors={[colors.blue, colors.purple]}>
          <Contents>
            <Time alarm={alarm} onPress={this.openTimePicker} />
            <SleepDuration>
              You're going to get {sleepDuration} hours of sleep
            </SleepDuration>
          </Contents>

          <Buttons
            setAlarm={this.openTimePicker}
            onToggleBulb={() => undefined}
          />
        </Container>

        <DateTimePicker
          mode="time"
          isVisible={isTimePickerVisible}
          onConfirm={this.handleAlarmChange}
          onCancel={this.handleAlarmCancel}
        />
      </>
    )
  }
}
