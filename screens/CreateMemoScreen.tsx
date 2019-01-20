import React from "react"
import { NavigationScreenProp } from "react-navigation";
import {
  Content,
  Thumbnail,
  Container,
  Header,
  Left,
  Body,
  Right,
  Button,
  Title,
  Text,
} from "native-base"
import Layout from "./../constants/Layout"
import { Tag } from "../models/Tag";
import {
  StyleSheet,
} from "react-native";
import Picker, { Item as PickerItem } from "./../components/Picker"
import { NavigationEvents } from 'react-navigation';
import { Subscribe } from 'unstated';
import Store from "./../store"

interface Props {
  navigation: NavigationScreenProp<any, any>,
}

interface State {
  category: Tag | null | undefined,
  subCategory: Tag | null | undefined,
  tags: Array<Tag>,
  isCategoryPickerOpen: boolean,
  isSubCategoryPickerOpen: boolean,
  isTagsPickerOpen: boolean,
  tagModal: {
    level: "0" | "1" | "2",
    isOpen: boolean,
  },
}

export default class CreateMemoScreen extends React.Component<Props, State> {
  state: State = {
    category: null,
    subCategory: null,
    tags: [],
    tagModal: {
      level: "0",
      isOpen: false,
    },
    isCategoryPickerOpen: false,
    isSubCategoryPickerOpen: false,
    isTagsPickerOpen: false,
  }

  goBack = () => {
    this.props.navigation.goBack()
  }

  categorySelected = (item: PickerItem): Promise<boolean> => {
    const { category } = this.state

    if (category && (category.label === item.label)) {
      this.setState({ category: null, subCategory: null })
      return Promise.resolve(false)
    }

    return new Promise((resolve) => {
      this.setState(
        (s) => ({
          ...s,
          category: {
            label: item.label,
            level: "0",
          }
        }),
        () => resolve(true)
      )
    })
  }

  subCategorySelected = (item: PickerItem): Promise<boolean> => {
    const { subCategory } = this.state
    if (subCategory && (subCategory.label === item.label)) {
      this.setState({ subCategory: null })
      return Promise.resolve(false)
    }

    return new Promise((resolve) => {
      this.setState(
        (s) => ({
          ...s,
          subCategory: {
            label: item.label,
            level: "1",
          }
        }),
        () => resolve(true)
      )
    })
  }

  tagsSelected = (item: PickerItem): Promise<boolean> => {
    return new Promise((resolve) => {
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
        },
        () => resolve(false))
    })
  }

  openTagModal = (level: "0" | "1" | "2") => () => {
    this.setState(
      (s) => ({
        ...s,
        tagModal: {
          ...s.tagModal,
          level,
          isOpen: true,
        },
      }),
      () => {
        this.props.navigation.navigate("CreateTag", {
          level,
        })
      }
    )
  }

  openCategory = () => this.setState({
    isCategoryPickerOpen: true,
  })
  closeCategory = () => this.setState({
    isCategoryPickerOpen: false,
  })
  renderCategory = (store: Store) => {
    const {
      category,
      isCategoryPickerOpen,
    } = this.state
    const selected = category != null ? category : undefined

    return (
      <Picker
        title="Categories"
        isOpen={isCategoryPickerOpen}
        onClose={this.closeCategory}
        onOpen={this.openCategory}
        items={store.state.tags["0"]}
        placeholder="Select Category"
        selected={selected}
        style={styles.picker}
        onPressItem={this.categorySelected}
        onPressAddItem={this.openTagModal("0")}
      />
    )
  }

  closeSubCategory = () => this.setState({
    isSubCategoryPickerOpen: false,
  })
  openSubCategory = () => this.setState({
    isSubCategoryPickerOpen: true,
  })
  renderSubCategory = (store: Store) => {
    const {
      category, subCategory,
      isSubCategoryPickerOpen,
    } = this.state
    const selected = subCategory != null ? subCategory : null

    return (
      <Picker
        title="SubCategories"
        isOpen={isSubCategoryPickerOpen}
        onOpen={this.openSubCategory}
        onClose={this.closeSubCategory}
        items={store.state.tags["1"]}
        disabled={category == null}
        placeholder="Select SubCategory"
        selected={selected}
        style={styles.picker}
        onPressItem={this.subCategorySelected}
        onPressAddItem={this.openTagModal("1")}
      />
    )
  }

  openTags = () => this.setState({ isTagsPickerOpen: true })
  closeTags = () => this.setState({ isTagsPickerOpen: false })
  renderTags = (store: Store) => {
    const {
      category, subCategory,
      tags,
      isTagsPickerOpen,
    } = this.state

    return (
      <Picker
        title="Tags"
        multiple={true}
        disabled={category == null || subCategory == null}
        isOpen={isTagsPickerOpen}
        onOpen={this.openTags}
        onClose={this.closeTags}
        items={store.state.tags["2"]}
        placeholder="Tags"
        selected={tags}
        style={styles.picker}
        onPressItem={this.tagsSelected}
        onPressAddItem={this.openTagModal("2")}
      />
    )
  }

  mayDisplayPicker = () => {
    const { level, isOpen } = this.state.tagModal
    if (!isOpen) return

    switch (level) {
      case "0":
        this.openCategory()
        return
      case "1":
        this.openSubCategory()
        return
      case "2":
        this.openTags()
        return
    }
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
      tags,
    } = this.state

    const uri = navigation.getParam("uri", null)
    const width = Layout.window.width
    const height = width

    return (
      <Container>
        <NavigationEvents
          onWillFocus={this.mayDisplayPicker}
        />
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
          {
            uri &&
            <Thumbnail
              style={{
                width,
                height,
              }}
              square={true}
              source={{ uri }}
            />
          }

          <Subscribe to={[Store]}>
            {this.renderCategory}
          </Subscribe>
          <Subscribe to={[Store]}>
            {this.renderSubCategory}
          </Subscribe>
          <Subscribe to={[Store]}>
            {this.renderTags}
          </Subscribe>
          <Container
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            {tags.map((tag) => (
              <Button
                style={{ marginLeft: 10 }}
                key={tag.label}
                bordered
                dark
                small
                rounded
              >
                <Text>
                  {tag.label}
                </Text>
              </Button>
            ))}
          </Container>
        </Content>
      </Container >
    )
  }
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
  },
  picker: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  }
})
