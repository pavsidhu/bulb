import * as React from 'react'
import styled from 'styled-components/native'
import styles from '../styles'
import { TouchableWithoutFeedback } from 'react-native'

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

interface Props {
  onPress: () => void
  text: string
}

export default function Button(props: Props) {
  return (
    <Container>
      <TouchableWithoutFeedback onPress={props.onPress}>
        <Text>{props.text}</Text>
      </TouchableWithoutFeedback>
    </Container>
  )
}
