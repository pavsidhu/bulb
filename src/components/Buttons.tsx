import * as React from 'react'
import styled from 'styled-components/native'

import Button from './Button'

const Container = styled.View`
  flex-direction: row;
  margin-bottom: 24px;
`

interface Props {
  isAlarmActivated: boolean
  onToggleBulb: () => void
  setAlarm: () => void
  disableAlarm: () => void
}

export default class Buttons extends React.Component<Props> {
  constructor(props: Props) {
    super(props)
    this.toggleBulb = this.toggleBulb.bind(this)
  }

  toggleBulb() {
    setTimeout(this.props.onToggleBulb, 1000)
  }

  render() {
    return (
      <Container>
        {this.props.isAlarmActivated ? (
          <Button onPress={this.props.disableAlarm} text="I'm Wake" />
        ) : (
          <>
            <Button onPress={this.props.onToggleBulb} text="Toggle Bulb" />
            <Button onPress={this.props.setAlarm} text="Set Alarm" />
          </>
        )}
      </Container>
    )
  }
}
