import React from "react"
import {
  Button,
  Icon,
  Header as _Header,
  Left,
  Text,
  Body,
  Title,
  Right,
} from "native-base"

interface Props {
  leftButtonLabel: string,
  title: string,
  onPressLeftButton: () => void,
  onPressAddItem: () => void,
}

export function Header({
  leftButtonLabel,
  onPressLeftButton,
  title,
  onPressAddItem,
}: Props) {
  return (
    <_Header>
      <Left>
        <Button
          transparent
          onPress={onPressLeftButton}
        >
          <Text>
            {leftButtonLabel}
          </Text>
        </Button>
      </Left>
      <Body>
        <Title>
          {title}
        </Title>
      </Body>
      <Right>
        <Button
          transparent
          onPress={onPressAddItem}
        >
          <Icon name='add' />
        </Button>
      </Right>
    </_Header >
  )
}
