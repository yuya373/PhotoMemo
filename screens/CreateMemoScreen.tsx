import React from "react"
import { NavigationScreenProp } from "react-navigation";
import {
  Content,
  Container,
  Header,
  Left,
  Body,
  Right,
  Button,
  Title,
  Text,
} from "native-base"
import { MemoFormContainer } from "../container/MemoForm";

interface Props {
  navigation: NavigationScreenProp<any, any>,
  isValid: boolean,
  goBack: () => void,
  save: () => void,
}

export function CreateMemoScreen({
  navigation,
  isValid,
  goBack,
  save,
}: Props) {
  return (
    <Container>
      <Header>
        <Left>
          <Button
            transparent
            onPress={goBack}
          >
            <Text>Cancel</Text>
          </Button>
        </Left>
        <Body>
          <Title>
            New Memo
          </Title>
        </Body>
        <Right>
          <Button
            transparent
            disabled={!isValid}
            onPress={save}
          >
            <Text>Save</Text>
          </Button>
        </Right>
      </Header>
      <Content>
        <MemoFormContainer
          navigation={navigation}
        />
      </Content>
    </Container >
  )
}

