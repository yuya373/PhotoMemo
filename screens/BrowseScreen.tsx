import React from 'react';
import { NavigationScreenProp } from "react-navigation";
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
import { Subscribe } from 'unstated';
import Store from '../store';
import { Tag, Label } from '../models/Tag';

interface Props {
  navigation: NavigationScreenProp<any, any>,
}

type Item = {
  category: Tag,
  subCategories: Set<Label>,
}

export default class BrowseScreen extends React.Component<Props> {
  static navigationOptions = {
    title: 'Categories',
  };

  goSubCategories = (category: Label, subCategories: Array<Label>) => {
    this.props.navigation.navigate("SubCategory", {
      category,
      subCategories,
    })
  }
  keyExtractor = (item: Item) => item.category.label
  renderItem = ({ item, index }: { item: Item, index: number }) => {
    const isFirst = index === 0
    const onPress = () => {
      this.goSubCategories(
        item.category.label,
        Array.from(item.subCategories),
      )
    }

    return (
      <ListItem
        noIndent
        button
        first={isFirst}
        onPress={onPress}
      >
        <Left>
          <Text>
            {item.category.label}
          </Text>
        </Left>
        <Right>
          <Icon name="arrow-forward" />
        </Right>
      </ListItem>
    )
  }

  collectCategory = (store: Store): Array<Item> => {
    return store.collectCategory()
  }

  renderList = (store: Store) => {
    const data = this.collectCategory(store)

    return (
      <FlatList
        data={data}
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
