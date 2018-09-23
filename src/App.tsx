import * as React from 'react'
import { AsyncStorage, Dimensions, StatusBar } from 'react-native'
import styled from 'styled-components/native'
import LinearGradient from 'react-native-linear-gradient'
import DateTimePicker from 'react-native-modal-datetime-picker'
import RNAlarm from 'react-native-alarms'
import Sound from 'react-native-sound'
import dayjs from 'dayjs'

import Time from './components/Time'
import Buttons from './components/Buttons'
import styles from './styles'
import Lifx, { LifxState } from './lifx'
import config from './config'

const lifx = new Lifx(config.token)

Sound.setCategory('Alarm')

const alarmSound = new Sound(
  'sunshower.ogg',
  Sound.MAIN_BUNDLE,
  () => undefined
)

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

const Message = styled.Text`
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
  isStateHydrated: boolean
  bulbState?: LifxState
}

export default class App extends React.Component<{}, State> {
  state = {
    alarm: undefined,
    isAlarmActivated: false,
    isTimePickerVisible: false,
    isStateHydrated: false,
    bulbState: undefined
  }

  constructor(props: {}) {
    super(props)

    this.toggleTimePicker = this.toggleTimePicker.bind(this)
    this.handleAlarmChange = this.handleAlarmChange.bind(this)
    this.handleAlarm = this.handleAlarm.bind(this)
    this.disableAlarm = this.disableAlarm.bind(this)

    RNAlarm.AlarmEmitter.addListener('alarm', this.handleAlarm)
    RNAlarm.AlarmEmitter.addListener('pre-alarm', this.handlePreAlarm)
  }

  async componentWillMount() {
    const item = await AsyncStorage.getItem('state')

    if (item) {
      const state = JSON.parse(item)

      this.setState(state)
    }

    const bulbState = await lifx.getState()

    this.setState({
      isStateHydrated: true,
      bulbState
    })
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

    RNAlarm.alarmSetRTCWakeup(
      'pre-alarm',
      dayjs(alarm)
        .subtract(30, 'minute')
        .toDate()
    )

    this.setState({
      alarm,
      isTimePickerVisible: false
    })
  }

  handleAlarm() {
    RNAlarm.launchMainActivity()

    this.setState({ isAlarmActivated: true })

    alarmSound
      // @ts-ignore
      .setSystemVolume(0.5)
      .setNumberOfLoops(-1)
      .play()
  }

  handlePreAlarm() {
    lifx.setState({
      power: 'on',
      color: 'kelvin:9000 brightness:1.0',
      duration: 1800 // seconds in 30 minutes
    })
  }

  disableAlarm() {
    this.setState({ isAlarmActivated: false })
    alarmSound.stop()
  }

  render() {
    AsyncStorage.setItem('state', JSON.stringify(this.state))

    const {
      alarm,
      isTimePickerVisible,
      isAlarmActivated,
      isStateHydrated
    } = this.state

    const sleepDuration = this.calculateSleepDuration()

    return (
      <>
        <StatusBar backgroundColor={colors.blue} />

        <Container colors={[colors.blue, colors.purple]}>
          {isStateHydrated && (
            <>
              <Contents>
                <Time alarm={alarm} onPress={this.toggleTimePicker} />
                <Message>
                  {isAlarmActivated
                    ? 'Good morning Pav!'
                    : sleepDuration
                      ? `You're going to get ${sleepDuration} hours of sleep`
                      : "Hey Pav, how's it going?"}
                </Message>
              </Contents>

              <Buttons
                isAlarmActivated={isAlarmActivated}
                setAlarm={this.toggleTimePicker}
                onToggleBulb={() => undefined}
                disableAlarm={this.disableAlarm}
              />
            </>
          )}
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
