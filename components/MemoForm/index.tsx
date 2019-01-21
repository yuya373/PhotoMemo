import React from "react"
import { NavigationEvents } from 'react-navigation';
import {
  Thumbnail,
  Content,
  Container,
  Button,
  Text,
} from "native-base"
import { Tag } from "./../../models/Tag";
import {
  StyleSheet,
} from "react-native";
import { Item as PickerItem } from "./../Picker"
import { Subscribe } from 'unstated';
import Store from "./../../store"
import Category from "./Category"
import SubCategory from "./SubCategory"
import Tags from "./Tags"
import MemoCard from "./../MemoCard/Form"

interface Props {
  uri: string,
  width: number,
  height: number,
  category: Tag | undefined,
  onCategorySelected: (item: PickerItem) => void,
  subCategory: Tag | undefined,
  onSubCategorySelected: (item: PickerItem) => void,
  tags: Array<Tag>,
  onTagSelected: (item: PickerItem) => void,
  onTagModalOpen: (tagLevel: string) => void,
}

interface State {
  isCategoryPickerOpen: boolean,
  isSubCategoryPickerOpen: boolean,
  isTagsPickerOpen: boolean,
  tagModal: {
    level: "0" | "1" | "2",
    isOpen: boolean,
  },
}

export default class MemoForm extends React.Component<Props, State> {
  state: State = {
    isCategoryPickerOpen: false,
    isSubCategoryPickerOpen: false,
    isTagsPickerOpen: false,
    tagModal: {
      level: "0",
      isOpen: false,
    },
  }

  openCategory = () => this.setState({
    isCategoryPickerOpen: true,
  })
  closeCategory = () => this.setState({
    isCategoryPickerOpen: false,
  })
  handleCategorySelected = (item: PickerItem): Promise<boolean> => {
    const { category, onCategorySelected } = this.props
    onCategorySelected(item)
    if (category && (category.label === item.label)) {
      return Promise.resolve(false)
    }
    return Promise.resolve(true)
  }
  renderCategory = (store: Store) => {
    const {
      isCategoryPickerOpen,
    } = this.state
    const {
      category,
    } = this.props

    return (
      <Category
        isOpen={isCategoryPickerOpen}
        onClose={this.closeCategory}
        onOpen={this.openCategory}
        categories={store.state.tags["0"]}
        selected={category}
        onPressItem={this.handleCategorySelected}
        onPressAddItem={this.handlePressAddItem}
      />
    )
  }

  closeSubCategory = () => this.setState({
    isSubCategoryPickerOpen: false,
  })
  openSubCategory = () => this.setState({
    isSubCategoryPickerOpen: true,
  })
  handleSubCategorySelected = (item: PickerItem): Promise<boolean> => {
    const { subCategory, onSubCategorySelected } = this.props
    onSubCategorySelected(item)
    if (subCategory && (subCategory.label === item.label)) {
      return Promise.resolve(false)
    }
    return Promise.resolve(true)
  }
  renderSubCategory = (store: Store) => {
    const {
      isSubCategoryPickerOpen,
    } = this.state

    const {
      category,
      subCategory,
    } = this.props

    return (
      <SubCategory
        isOpen={isSubCategoryPickerOpen}
        disabled={category == null}
        selected={subCategory}
        onOpen={this.openSubCategory}
        onClose={this.closeSubCategory}
        subCategories={store.state.tags["1"]}
        onPressItem={this.handleSubCategorySelected}
        onPressAddItem={this.handlePressAddItem}
      />
    )
  }

  openTags = () => this.setState({ isTagsPickerOpen: true })
  closeTags = () => this.setState({ isTagsPickerOpen: false })
  handleTagSelected = (item: PickerItem): Promise<boolean> => {
    this.props.onTagSelected(item)
    return Promise.resolve(false)
  }
  renderTags = (store: Store) => {
    const {
      isTagsPickerOpen,
    } = this.state

    const {
      category,
      subCategory,
      tags,
    } = this.props

    return (
      <Tags
        isOpen={isTagsPickerOpen}
        disabled={category == null || subCategory == null}
        onOpen={this.openTags}
        onClose={this.closeTags}
        tags={store.state.tags["2"]}
        selected={tags}
        onPressItem={this.handleTagSelected}
        onPressAddItem={this.handlePressAddItem}
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

  handlePressAddItem = (level: "0" | "1" | "2") => {
    this.setState(
      (s) => ({
        ...s,
        tagModal: {
          ...s.tagModal,
          level,
          isOpen: true,
        },
      }),
      () => this.props.onTagModalOpen(level),
    )
  }

  render() {
    const {
      uri, width, height,
      tags,
      category,
      subCategory,
    } = this.props

    return (
      <Content>
        <NavigationEvents
          onWillFocus={this.mayDisplayPicker}
        />
        <MemoCard
          uri={uri}
          category={category ? category.label : undefined}
          subCategory={subCategory ? subCategory.label : undefined}
          tags={tags.map((e) => e.label)}
          onPressCategory={this.openCategory}
          onPressSubCategory={this.openSubCategory}
          onPressTags={this.openTags}
        />
        <Subscribe to={[Store]}>
          {this.renderCategory}
        </Subscribe>
        <Subscribe to={[Store]}>
          {this.renderSubCategory}
        </Subscribe>
        <Subscribe to={[Store]}>
          {this.renderTags}
        </Subscribe>
      </Content>
    )
  }
}

const styles = StyleSheet.create({
  tagsContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  }
})
