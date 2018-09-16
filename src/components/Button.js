import React from 'react'
import styled from 'styled-components'
import styles from '../styles'

const { colors } = styles

const Container = styled.View`
  margin: 0 16px;
  padding: 16px 24px;
  border-radius: 32px;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 2550, 0.2);
`

const Text = styled.Text`
  font-size: 16px;
  color: ${colors.white};
`

export default function Button(props) {
  return (
    <Container>
      <Text icon={props.icon} onPress={props.onPress}>
        {props.text}
      </Text>
    </Container>
  )
}
