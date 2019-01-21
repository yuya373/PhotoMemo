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
import { Tag } from "../models/Tag";
import { Item as PickerItem } from "./../components/Picker"
import { Subscribe } from 'unstated';
import Store from "./../store"
import MemoForm from "./../components/MemoForm"

interface Props {
  navigation: NavigationScreenProp<any, any>,
}

interface State {
  category: Tag | undefined,
  subCategory: Tag | undefined,
  tags: Array<Tag>,
}

export default class CreateMemoScreen extends React.Component<Props, State> {
  state: State = {
    category: undefined,
    subCategory: undefined,
    tags: [],
  }

  goCreateTag = (level: string) => {
    this.props.navigation.navigate("CreateTag", {
      level
    })
  }
  goBack = () => {
    this.props.navigation.goBack()
  }

  categorySelected = (item: PickerItem) => {
    const { category } = this.state

    if (category && (category.label === item.label)) {
      this.setState({ category: undefined })
      return
    }

    this.setState(
      (s) => ({
        ...s,
        category: {
          label: item.label,
          level: "0",
        }
      })
    )
  }

  subCategorySelected = (item: PickerItem) => {
    const { subCategory } = this.state
    if (subCategory && (subCategory.label === item.label)) {
      this.setState({ subCategory: undefined })
      return
    }

    this.setState(
      (s) => ({
        ...s,
        subCategory: {
          label: item.label,
          level: "1",
        }
      })
    )
  }

  tagsSelected = (item: PickerItem) => {
    this.setState(
      (s) => {
        const exists = s.tags.find((e) => e.label === item.label)

        if (exists) {
          return {
            ...s,
            tags: s.tags.filter((e) => e.label !== item.label),
          }
        } else {
          return {
            ...s,
            tags: s.tags.
              concat([{ label: item.label, level: "2" }]),
          }
        }
      }
    )
  }

  isSaveButtonDisabled = () => {
    const {
      category,
      subCategory,
      tags,
    } = this.state

    return category == null ||
      subCategory == null ||
      tags.length <= 0
  }

  saveImage = async (store: Store) => {
    if (this.isSaveButtonDisabled()) return

    const {
      category,
      subCategory,
      tags,
    } = this.state
    const {
      navigation,
    } = this.props

    const uri = navigation.getParam("uri", null)

    if (!uri) return

    await store.addMemo({
      uri: uri,
      category: category!.label,
      subCategory: subCategory!.label,
      tags: tags.map((e) => e.label),
    })
    navigation.navigate("Home")
  }

  renderSaveButton = (store: Store) => {
    return (
      <Button
        transparent
        disabled={this.isSaveButtonDisabled()}
        onPress={() => this.saveImage(store)}
      >
        <Text>Save</Text>
      </Button>

    )
  }

  render() {
    const {
      navigation,
    } = this.props
    const {
      category,
      subCategory,
      tags,
    } = this.state

    const uri = navigation.getParam("uri", null)

    return (
      <Container>
        <Header>
          <Left>
            <Button
              transparent
              onPress={this.goBack}
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
            <Subscribe to={[Store]}>
              {this.renderSaveButton}
            </Subscribe>
          </Right>
        </Header>
        <Content>
          <MemoForm
            uri={uri}
            category={category}
            subCategory={subCategory}
            tags={tags}
            onCategorySelected={this.categorySelected}
            onSubCategorySelected={this.subCategorySelected}
            onTagSelected={this.tagsSelected}
            onTagModalOpen={this.goCreateTag}
          />
        </Content>
      </Container >
    )
  }
}
