import * as React from 'react'
import styled from 'styled-components/native'
import styles from '../styles'
import { TouchableOpacity } from 'react-native'

const { colors } = styles

const Container = styled.View`
  margin: 0 16px;
  padding: 32px 40px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  background: ${colors.lightPurple};
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
    <TouchableOpacity onPress={props.onPress} activeOpacity={0.5}>
      <Container>
        <Text>{props.text}</Text>
      </Container>
    </TouchableOpacity>
  )
}
