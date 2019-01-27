import React from "react"
import { NavigationScreenProp, NavigationState } from "react-navigation";
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
import { StyleSheet } from "react-native";

interface Props {
  navigation: NavigationScreenProp<NavigationState>,
  isValid: boolean,
  save: () => void,
  goBack: () => void,
  onPressDelete: () => void,
}

export function EditMemoScreen({
  isValid,
  navigation,
  save,
  goBack,
  onPressDelete,
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
            Edit Memo
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
        <Button
          danger
          block
          onPress={onPressDelete}
          style={styles.button}
        >
          <Text>Delete</Text>
        </Button>
      </Content>
    </Container >
  )
}

const styles = StyleSheet.create({
  button: {
    marginLeft: 15,
    marginRight: 15,
    marginTop: 5,
  },
})
