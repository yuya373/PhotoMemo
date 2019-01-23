import React from "react"
import { NavigationScreenProp } from "react-navigation";
import {
  Form,
  Label,
  Text,
  Input,
  Item,
  Button,
  Header,
  Left,
  Right,
  Body,
  Title,
  Content,
  Container,
} from "native-base"
import { createTag } from "../actions/tagsAction";

interface Props {
  navigation: NavigationScreenProp<any, any>,
  createTag: typeof createTag,
}

interface State {
  inputValue: string,
}

export class CreateTagScreen extends React.Component<Props, State> {
  state = {
    inputValue: "",
  }
  closeModal = () => {
    this.setState(
      (s) => ({ ...s, inputValue: "" }),
      this.props.navigation.goBack
    )
  }
  createTag = () => {
    const { inputValue } = this.state
    if (inputValue.length <= 0) return
    const {
      navigation,
      createTag,
    } = this.props

    const level = navigation.getParam("level", "0")
    createTag(inputValue, level)
    navigation.goBack()
  }

  handleChangeText = (inputValue: string) => {
    this.setState((s) => ({
      ...s,
      inputValue,
    }))
  }

  render() {
    const level = this.props.navigation.getParam("level", "0")
    const title = level === "0" ?
      "New Category" : level === "1" ?
        "New SubCategory" : "New Tag"
    const {
      inputValue,
    } = this.state


    return (
      <Container>
        <Header>
          <Left>
            <Button
              transparent
              onPress={this.closeModal}
            >
              <Text>
                Cancel
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
              disabled={inputValue.length <= 0}
              transparent
              onPress={this.createTag}
            >
              <Text>
                Create
              </Text>
            </Button >
          </Right>
        </Header>
        <Content>
          <Form>
            <Item
              floatingLabel
              last
            >
              <Label>
                Name
              </Label>
              <Input
                autoFocus
                onChangeText={this.handleChangeText}
                returnKeyType="done"
                onSubmitEditing={this.createTag}
              />
            </Item>
          </Form>
        </Content>
      </Container>
    )
  }
}
