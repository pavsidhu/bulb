import * as React from 'react'
import styled from 'styled-components/native'

import Button from './Button'

const Container = styled.View`
  flex-direction: row;
  margin-bottom: 24px;
`

interface Props {
  onToggleBulb: () => void
  setAlarm: () => void
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
        <Button onPress={this.toggleBulb} text="Toggle Bulb" />
        <Button onPress={this.props.setAlarm} text="Set Alarm" />
      </Container>
    )
  }
}
