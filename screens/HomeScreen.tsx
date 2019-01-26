import React from 'react';
import SafeAreaView from './../components/SaveAreaView';
import {
  Fab,
  Icon,
} from 'native-base';
import { NavigationScreenProp } from 'react-navigation';
import { FlatList, ScrollView } from "react-native"
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
        screen="home"
      />
    )
  }

  keyExtractor = (memo: Item) => memo

  contentRef: React.RefObject<ScrollView> = React.createRef()
  scrollToTop = () => {
    if (this.contentRef.current) {
      this.contentRef.current.scrollTo({
        x: 0,
        y: 0,
        animated: true,
      })
    }
  }
  onContentSizeChange = () => {
    this.scrollToTop()
  }

  render() {
    const {
      memoIds,
      addMemo,
    } = this.props

    return (
      <SafeAreaView>
        <ScrollView
          onContentSizeChange={this.onContentSizeChange}
          ref={this.contentRef}
        >
          <SearchByTagContainer screen="home" />
          <FlatList
            data={memoIds}
            renderItem={this.renderMemo}
            keyExtractor={this.keyExtractor}
          />
        </ScrollView>
        <Fab
          direction="up"
          position="bottomRight"
          onPress={addMemo}
        >
          <Icon name="add" />
        </Fab>
      </SafeAreaView >
    );
  }
}
