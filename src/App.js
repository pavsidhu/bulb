import React from 'react'
import { StatusBar, Text, TouchableWithoutFeedback } from 'react-native'
import styled from 'styled-components'
import DateTimePicker from 'react-native-modal-datetime-picker'
import styles from './styles'

const { colors } = styles

const Container = styled.View`
  flex: 1;
  background-color: ${colors.primary};
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

const TimeContainer = styled.View`
  flex-direction: row;
  align-items: flex-end;
  margin-bottom: 8px;
`

const Time = styled.Text`
  font-size: 48px;
  line-height: 56px;
  color: ${colors.secondary};
`

const TimeSuffix = styled.Text`
  font-size: 20px;
  line-height: 42px;
  color: ${colors.secondary};
  margin-left: 4px;
`

const SleepDuration = styled.Text`
  font-size: 18px;
  line-height: 24px;
  color: ${colors.secondary};
`

export default class App extends React.Component {
  state = {
    time: {
      hours: 8,
      minutes: 0
    },
    isTimePickerVisible: false
  }

  constructor(props) {
    super(props)

    this.openTimePicker = this.openTimePicker.bind(this)
    this.handleAlarmCancel = this.handleAlarmCancel.bind(this)
    this.handleAlarmChange = this.handleAlarmChange.bind(this)
  }

  openTimePicker() {
    this.setState({ isTimePickerVisible: true })
  }

  handleAlarmCancel() {
    this.setState({ isTimePickerVisible: false })
  }

  handleAlarmChange(date) {
    const hours = date.getHours()
    const minutes = date.getMinutes()

    this.setState({
      time: { hours, minutes },
      isTimePickerVisible: false
    })
  }

  render() {
    const { time, isTimePickerVisible } = this.state

    const hours = time.hours.toString().padStart(2, '0')
    const minutes = time.minutes.toString().padStart(2, '0')

    const sleepDuration = 5

    return (
      <>
        <StatusBar backgroundColor={colors.primary} />
        <Container>
          <Header>
            <Text> </Text>
          </Header>

          <Contents>
            <TimeContainer>
              <TouchableWithoutFeedback onPress={this.openTimePicker}>
                <Time>{hours + ':' + minutes}</Time>
              </TouchableWithoutFeedback>
              <TimeSuffix>am</TimeSuffix>
            </TimeContainer>

            <SleepDuration>
              You're going to get {sleepDuration} hours sleep
            </SleepDuration>

            <DateTimePicker
              mode="time"
              isVisible={isTimePickerVisible}
              backgroundColor={colors.primary}
              onCancel={this.handleAlarmCancel}
              onConfirm={this.handleAlarmChange}
            />
          </Contents>
        </Container>
      </>
    )
  }
}
