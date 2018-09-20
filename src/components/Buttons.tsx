import React from 'react'
import styled from 'styled-components/native'

import Button from './Button'
import Lifx from '../lifx'
import config from '../config'

const lifx = new Lifx(config.token)

const Container = styled.View`
  flex-direction: row;
  margin-bottom: 24px;
`

interface Props {
  onToggleBulb: () => void
  setAlarm: () => void
}

interface State {
  isBulbOn: boolean
}

export default class Buttons extends React.Component<Props, State> {
  state = {
    isBulbOn: false
  }

  constructor(props: Props) {
    super(props)

    this.toggleBulb = this.toggleBulb.bind(this)
  }

  toggleBulb() {
    const isBulbOn = !this.state.isBulbOn
    this.setState({ isBulbOn })

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
