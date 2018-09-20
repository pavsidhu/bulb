import * as React from 'react'
import { TouchableWithoutFeedback } from 'react-native'
import styled from 'styled-components/native'
import dayjs from 'dayjs'
import styles from '../styles'

const { colors } = styles

const Container = styled.View`
  flex-direction: row;
  align-items: flex-end;
  margin-bottom: 8px;
`

const Label = styled.Text`
  font-size: 48px;
  line-height: 56px;
  color: ${colors.white};
`

const Suffix = styled.Text`
  font-size: 20px;
  line-height: 42px;
  color: ${colors.white};
  margin-left: 4px;
`

interface Props {
  alarm: any
  onPress: () => void
}

export default function Time(props: Props) {
  const alarm = dayjs().add(props.alarm, 'millisecond')
  const time = alarm.format('h:mm')
  const suffix = alarm.format('A')

  return (
    <TouchableWithoutFeedback onPress={props.onPress}>
      <Container>
        <Label>{time}</Label>
        <Suffix>{suffix}</Suffix>
      </Container>
    </TouchableWithoutFeedback>
  )
}
