import React from 'react';
import { NavigationScreenProp } from "react-navigation";
import {
  Content,
} from "native-base"
import SafeAreaView from "./../components/SaveAreaView"
import { FlatList } from "react-native"
import { Subscribe } from 'unstated';
import Store from '../store';
import { Label } from '../models/Tag';
import { Memo, hasTag } from '../models/Memo';
import MemoCard from "./../components/MemoCard"
import Search from "./../components/Search"

interface Props {
  navigation: NavigationScreenProp<any, any>,
}

interface State {
  searchInputValue: string,
  doSearch: boolean,
}

export default class MemosScreen extends React.Component<Props, State> {
  static navigationOptions = {
    title: 'Memos',
  };
  state = {
    searchInputValue: "",
    doSearch: false,
  }

  goEditMemo = (memo: Memo) => () =>
    this.props.navigation.navigate("EditMemo", { id: memo.id })
  goImage = (memo: Memo) => () =>
    this.props.navigation.navigate("Image", {
      id: memo.id,
    })
  keyExtractor = (item: Memo) => item.uri
  renderItem = ({ item }: { item: Memo }) => {
    return (
      <MemoCard
        memo={item}
        onPressEdit={this.goEditMemo(item)}
        onPressImage={this.goImage(item)}
      />
    )
  }

  renderList = (store: Store) => {
    const {
      navigation,
    } = this.props

    const subCategory: Label | null =
      navigation.getParam("subCategory", null)
    const category: Label | null =
      navigation.getParam("category", null)

    if (category == null || subCategory == null) {
      return
    }

    const memos: Array<Memo> = []
    for (let e of store.state.memos) {
      if (e.category === category && e.subCategory === subCategory) {
        if (!this.state.doSearch) {
          memos.push(e)
          continue
        }

        if (hasTag(e, this.state.searchInputValue)) {
          memos.push(e)
        }
      }
    }

    return (
      <FlatList
        data={memos}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem}
      />
    )
  }

  onSearchSubmit = () => {
    const { searchInputValue } = this.state
    if (searchInputValue.length <= 0) {
      this.clearSearchInput()
      return
    }
    this.setState({ doSearch: true })
  }
  onSearchTextChange = (searchInputValue: string) => {
    this.setState({ searchInputValue })
  }
  clearSearchInput = () => {
    this.setState({ searchInputValue: "", doSearch: false })
  }

  render() {
    return (
      <SafeAreaView>
        <Content
        >
          <Search
            inputValue={this.state.searchInputValue}
            onChangeText={this.onSearchTextChange}
            onSubmit={this.onSearchSubmit}
            onClear={this.clearSearchInput}
            placeholder="Search by tag"
          />
          <Subscribe to={[Store]}>
            {this.renderList}
          </Subscribe>
        </Content>
      </SafeAreaView>
    )
  }
}
