import React from 'react';
import SafeAreaView from './../components/SaveAreaView';
import {
  Content,
  Fab,
  Icon,
} from 'native-base';
import { NavigationScreenProp } from 'react-navigation';
import { FlatList } from "react-native"
import { Tag } from '../models/Tag';
import { SearchByTagContainer } from "./../container/SearchByTagContainer"
import { MemoCardContainer } from '../container/MemoCardContainer';

interface Props {
  navigation: NavigationScreenProp<any, any>,
  memoIds: Array<string>,
  categories: Array<Tag>,
  addMemo: () => void,
}

type Item = string

export class HomeScreen extends React.Component<Props, {}> {
  static navigationOptions = {
    header: null
  }

  renderMemo = ({ item }: { item: Item }) => {
    return (
      <MemoCardContainer
        id={item}
        navigation={this.props.navigation}
      />
    )
  }

  keyExtractor = (memo: Item) => memo

  render() {
    const {
      memoIds,
      addMemo,
    } = this.props

    return (
      <SafeAreaView>
        <Content>
          <SearchByTagContainer screen="home" />
          <FlatList
            data={memoIds}
            renderItem={this.renderMemo}
            keyExtractor={this.keyExtractor}
          />
        </Content>
        <Fab
          direction="up"
          position="bottomRight"
          onPress={addMemo}
        >
          <Icon name="add" />
        </Fab>
      </SafeAreaView>
    );
  }
}
