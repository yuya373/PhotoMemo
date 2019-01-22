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
  store: Store,
}

class HomeScreen extends React.Component<Props, State> {
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
      id: memo.id,
    })

  getSubCategoryProps = (memo: Memo) => {
    const { store } = this.props
    const categories = store.collectCategory()
    const category = categories.find((e) => {
      return e.category.label === memo.category
    })

    return {
      category: memo.category,
      subCategories: category ?
        Array.from(category.subCategories) :
        [],
    }
  }

  goSubCategories = (memo: Memo) => () => {
    const { navigation } = this.props

    navigation.navigate(
      "SubCategory",
      this.getSubCategoryProps(memo),
    )
  }

  goMemos = (memo: Memo) => () => {
    const { navigation } = this.props
    const { category, subCategory } = memo
    navigation.navigate("Memos", {
      category,
      subCategory,
    })
  }

  renderMemo = ({ item }: { item: Memo }) => {
    return (
      <MemoCard
        memo={item}
        onPressEdit={this.goEditMemo(item)}
        onPressImage={this.goImage(item)}
        onPressCategory={this.goSubCategories(item)}
        onPressSubCategory={this.goMemos(item)}
      />
    )
  }

  keyExtractor = (memo: Memo) => memo.uri

  renderMemos = () => {
    const { store } = this.props
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
          {this.renderMemos()}
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

export default ({ navigation }: { navigation: NavigationScreenProp<any, any> }) => (
  <Subscribe to={[Store]}>
    {(store: Store) => (
      <HomeScreen
        store={store}
        navigation={navigation}
      />
    )}
  </Subscribe>
)
