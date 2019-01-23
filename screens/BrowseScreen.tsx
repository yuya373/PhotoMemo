import React from 'react';
import {
  Content,
  Left,
  Right,
  Text,
  ListItem,
  Icon,
} from "native-base"
import SafeAreaView from "./../components/SaveAreaView"
import { FlatList } from "react-native"

interface Props {
  categories: Array<string>,
  onPressItem: (category: string) => void,
}

type Item = string

export class BrowseScreen extends React.Component<Props> {
  static navigationOptions = {
    title: 'Categories',
  };

  keyExtractor = (item: Item) => item
  renderItem = ({ item, index }: { item: Item, index: number }) => {
    const isFirst = index === 0
    const onPress = () => this.props.onPressItem(item)


    return (
      <ListItem
        noIndent
        button
        first={isFirst}
        onPress={onPress}
      >
        <Left>
          <Text>
            {item}
          </Text>
        </Left>
        <Right>
          <Icon name="arrow-forward" />
        </Right>
      </ListItem>
    )
  }

  render() {
    const { categories } = this.props
    return (
      <SafeAreaView>
        <Content>
          <FlatList
            data={categories}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderItem}
          />
        </Content>
      </SafeAreaView>
    )
  }
}
