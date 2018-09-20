import * as React from 'react'
import { AsyncStorage, Dimensions, StatusBar } from 'react-native'
import styled from 'styled-components/native'
import LinearGradient from 'react-native-linear-gradient'
import DateTimePicker from 'react-native-modal-datetime-picker'
import RNAlarm from 'react-native-alarms'
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

interface State {
  alarm?: Date
  isAlarmActivated: boolean
  isTimePickerVisible: boolean
}

export default class App extends React.Component<{}, State> {
  state = {
    alarm: undefined,
    isAlarmActivated: false,
    isTimePickerVisible: false
  }

  constructor(props: {}) {
    super(props)

    this.toggleTimePicker = this.toggleTimePicker.bind(this)
    this.handleAlarmChange = this.handleAlarmChange.bind(this)
    this.handleAlarm = this.handleAlarm.bind(this)

    RNAlarm.AlarmEmitter.addListener('alarm', this.handleAlarm)
  }

  async componentWillMount() {
    const item = await AsyncStorage.getItem('state')

    if (item) {
      const state = JSON.parse(item)
      this.setState(state)
    }
  }

  handleAlarm() {
    RNAlarm.launchMainActivity()

    this.setState({ isAlarmActivated: true })
  }

  calculateSleepDuration() {
    if (!this.state.alarm) {
      return undefined
    }

    const alarm = dayjs(this.state.alarm)
    const difference = alarm.diff(dayjs(), 'hour', true)

    return Math.abs(parseFloat(difference.toFixed(2)))
  }

  toggleTimePicker() {
    const isTimePickerVisible = !this.state.isTimePickerVisible
    this.setState({ isTimePickerVisible })
  }

  handleAlarmChange(jsDate: Date) {
    // Adjust alarm so that it's in the future
    const date = dayjs(jsDate)
    const alarm =
      date.diff(dayjs(), 'millisecond') <= 0
        ? date.add(1, 'day').toDate()
        : date.toDate()

    RNAlarm.alarmSetRTCWakeup('alarm', alarm)

    this.setState({
      alarm,
      isTimePickerVisible: false
    })
  }

  render() {
    AsyncStorage.setItem('state', JSON.stringify(this.state))

    const { alarm, isTimePickerVisible } = this.state

    const sleepDuration = this.calculateSleepDuration()

    return (
      <>
        <StatusBar backgroundColor={colors.blue} />

        <Container colors={[colors.blue, colors.purple]}>
          <Contents>
            <Time alarm={alarm} onPress={this.toggleTimePicker} />
            <SleepDuration>
              You're going to get {sleepDuration} hours of sleep
            </SleepDuration>
          </Contents>

          <Buttons
            setAlarm={this.toggleTimePicker}
            onToggleBulb={() => undefined}
          />
        </Container>

        <DateTimePicker
          mode="time"
          isVisible={isTimePickerVisible}
          onConfirm={this.handleAlarmChange}
          onCancel={this.toggleTimePicker}
        />
      </>
    )
  }
}
