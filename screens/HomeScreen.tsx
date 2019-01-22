import React from 'react';
import SafeAreaView from './../components/SaveAreaView';
import {
  Content,
  Fab,
  Icon,
} from 'native-base';
import { NavigationScreenProp } from 'react-navigation';
import { Subscribe } from 'unstated';
import Store from '../store';
import { Memo, hasTag } from '../models/Memo';
import MemoCard from "./../components/MemoCard"
import { FlatList } from "react-native"
import Search from "./../components/Search"

interface State {
  displayCamera: boolean,
  searchInputValue: string,
  doSearch: boolean,
}

interface Props {
  navigation: NavigationScreenProp<any, any>,
}

export default class HomeScreen extends React.Component<Props, State> {
  static navigationOptions = {
    title: "All Memos",
  };
  displayCamera = () => this.props.navigation.navigate("Camera")

  state = {
    displayCamera: false,
    searchInputValue: "",
    doSearch: false,
  }

  goEditMemo = (memo: Memo) => () =>
    this.props.navigation.navigate("EditMemo", { id: memo.id })

  goImage = (memo: Memo) => () =>
    this.props.navigation.navigate("Image", {
      uri: memo.uri,
      width: memo.width,
      height: memo.height,
    })

  renderMemo = ({ item }: { item: Memo }) => {
    return (
      <MemoCard
        memo={item}
        onPressEdit={this.goEditMemo(item)}
        onPressImage={this.goImage(item)}
      />
    )
  }

  keyExtractor = (memo: Memo) => memo.uri

  renderMemos = (store: Store) => {
    const memos = []
    const {
      doSearch,
      searchInputValue,
    } = this.state
    for (let memo of store.state.memos) {
      if (!doSearch || hasTag(memo, searchInputValue)) {
        memos.push(memo)
      }
    }

    return (
      <FlatList
        data={memos}
        renderItem={this.renderMemo}
        keyExtractor={this.keyExtractor}
      />
    )
  }

  onSearchTextChange = (searchInputValue: string) => {
    if (searchInputValue.length <= 0) {
      this.onSearchClear()
      return
    }
    this.setState({ searchInputValue })
  }

  onSearchSubmit = () => {
    this.setState({ doSearch: true })
  }

  onSearchClear = () => {
    this.setState({ searchInputValue: "", doSearch: false })
  }

  render() {
    return (
      <SafeAreaView>
        <Content>
          <Search
            inputValue={this.state.searchInputValue}
            onChangeText={this.onSearchTextChange}
            onSubmit={this.onSearchSubmit}
            onClear={this.onSearchClear}
            placeholder="Search by tag"
          />
          <Subscribe to={[Store]} >
            {this.renderMemos}
          </Subscribe>
        </Content>
        <Fab
          direction="up"
          position="bottomRight"
          onPress={this.displayCamera}
        >
          <Icon name="add" />
        </Fab>
      </SafeAreaView>
    );
  }
}
