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

type Item = string

interface Props {
  subCategories: Array<string>,
  onPressItem: (subCategory: string) => void,
}

export class SubCategoryScreen extends React.Component<Props> {
  static navigationOptions = {
    title: 'SubCategories',
  };

  handlePressItem = (subCategory: Item) => () => {
    const {
      onPressItem
    } = this.props

    onPressItem(subCategory)
  }
  keyExtractor = (item: Item) => item
  renderItem = ({ item, index }: { item: Item, index: number }) => {
    const isFirst = index === 0

    return (
      <ListItem
        noIndent
        button
        first={isFirst}
        onPress={this.handlePressItem(item)}
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
    const {
      subCategories,
    } = this.props

    return (
      <SafeAreaView>
        <Content>
          <FlatList
            data={subCategories}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderItem}
          />
        </Content>
      </SafeAreaView>
    )
  }
}
