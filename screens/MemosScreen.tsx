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
import { Memo } from '../models/Memo';
import MemoCard from "./../components/MemoCard"

interface Props {
  navigation: NavigationScreenProp<any, any>,
}

export default class MemosScreen extends React.Component<Props> {
  static navigationOptions = {
    title: 'Memos',
  };

  keyExtractor = (item: Memo) => item.uri
  renderItem = ({ item }: { item: Memo }) => {
    return (
      <MemoCard
        memo={item}
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

    const memos = store.state.memos.
      filter((e) => e.category === category && e.subCategory === subCategory)

    return (
      <FlatList
        data={memos}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem}
      />
    )
  }

  render() {
    return (
      <SafeAreaView>
        <Content>
          <Subscribe to={[Store]}>
            {this.renderList}
          </Subscribe>
        </Content>
      </SafeAreaView>
    )
  }
}
