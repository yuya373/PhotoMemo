import React from 'react';
import { NavigationScreenProp } from "react-navigation";
import {
  Content,
} from "native-base"
import SafeAreaView from "./../components/SaveAreaView"
import { FlatList } from "react-native"
import { SearchByTagContainer } from "./../container/SearchByTagContainer"
import { MemoCardContainer } from '../container/MemoCardContainer';

interface Props {
  navigation: NavigationScreenProp<any, any>,
  memoIds: Array<string>,
}

export class MemosScreen extends React.Component<Props> {
  static navigationOptions = {
    title: 'Memos',
  };
  keyExtractor = (item: string) => item
  renderItem = ({ item }: { item: string }) => {
    return (
      <MemoCardContainer
        id={item}
        navigation={this.props.navigation}
      />
    )
  }

  render() {
    const { memoIds } = this.props
    return (
      <SafeAreaView>
        <Content
        >
          <SearchByTagContainer screen="browse" />
          <FlatList
            data={memoIds}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderItem}
          />
        </Content>
      </SafeAreaView>
    )
  }
}
