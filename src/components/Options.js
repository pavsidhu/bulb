import React from 'react'
import styled from 'styled-components'

import Lifx from '../lifx'
import config from '../config'
import styles from '../styles'

const lifx = new Lifx(config.token)

const { colors } = styles

const OptionsContainer = styled.View`
  flex-direction: row;
  margin-bottom: 24px;
`

const OptionContainer = styled.View`
  margin: 0 16px;
  padding: 16px 24px;
  border-radius: 32px;
  align-items: center;
  justify-content: center;
  background-color: ${colors.white};
`

const OptionText = styled.Text`
  font-size: 16px;
  color: ${colors.black};
`

function Option(props) {
  return (
    <OptionContainer>
      <OptionText icon={props.icon} onPress={props.onPress}>
        {props.text}
      </OptionText>
    </OptionContainer>
  )
}

export default class Options extends React.Component {
  state = {
    isBulbOn: false
  }

  constructor(props) {
    super(props)

    this.toggleBulb = this.toggleBulb.bind(this)
  }

  toggleBulb() {
    const isBulbOn = !this.state.isBulbOn
    this.setState({ isBulbOn })

    lifx.setState({
      power: isBulbOn ? 'off' : 'on'
    })
  }

  render() {
    return (
      <OptionsContainer>
        <Option onPress={this.toggleBulb} text="Toggle Bulb" />
        <Option onPress={this.props.setAlarm} text="Set Alarm" />
      </OptionsContainer>
    )
  }
}
