import React from "react"
import { NavigationScreenProp } from "react-navigation";
import {
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
import { Subscribe } from 'unstated';
import Store from "./../store"

interface Props {
  navigation: NavigationScreenProp<any, any>,
}

interface State {
  inputValue: string,
}

export default class CreateTagModal extends React.Component<Props, State> {
  state = {
    inputValue: "",
  }
  closeModal = () => {
    this.setState(
      (s) => ({ ...s, inputValue: "" }),
      this.props.navigation.goBack
    )
  }
  createTag = async (store: Store) => {
    const { inputValue } = this.state
    if (inputValue.length <= 0) return
    const { navigation } = this.props

    const level = navigation.getParam("level", "0")
    await store.createTag({
      label: inputValue,
      level,
    })
    navigation.goBack()
  }

  renderCreateButton = (store: Store) => {
    const {
      inputValue,
    } = this.state

    return (
      <Button
        disabled={inputValue.length <= 0}
        transparent
        onPress={() => this.createTag(store)}
      >
        <Text>
          Create
        </Text>
      </Button >
    )
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
            <Subscribe to={[Store]}>
              {this.renderCreateButton}
            </Subscribe>
          </Right>
        </Header>
        <Content>
          <Item regular>
            <Input
              placeholder="Tag name here..."
              onChangeText={this.handleChangeText}
            />
          </Item>
        </Content>
      </Container>
    )
  }
}
