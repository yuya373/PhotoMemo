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
import { Memo } from '../models/Memo';
import MemoCard from "./../components/MemoCard"
import { FlatList } from "react-native"

interface State {
  displayCamera: boolean
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
  }

  renderMemo = ({ item }: { item: Memo }) => {
    return (
      <MemoCard
        key={item.uri}
        memo={item}
      />
    )
  }

  keyExtractor = (memo: Memo) => memo.uri

  renderMemos = (store: Store) => {
    return (
      <FlatList
        data={store.state.memos}
        renderItem={this.renderMemo}
        keyExtractor={this.keyExtractor}
      />
    )
  }

  render() {
    return (
      <SafeAreaView>
        <Content>
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
