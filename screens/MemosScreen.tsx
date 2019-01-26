import React from 'react';
import { NavigationScreenProp } from "react-navigation";
import SafeAreaView from "./../components/SaveAreaView"
import { FlatList, ScrollView } from "react-native"
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
        screen="browse"
      />
    )
  }

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
    const { memoIds } = this.props
    return (
      <SafeAreaView>
        <ScrollView
          ref={this.contentRef}
          onContentSizeChange={this.onContentSizeChange}
        >
          <SearchByTagContainer screen="browse" />
          <FlatList
            data={memoIds}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderItem}
          />
        </ScrollView>
      </SafeAreaView>
    )
  }
}
