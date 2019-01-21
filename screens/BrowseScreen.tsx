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
  subCategories: Array<Label>,
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
        Array.from(new Set(item.subCategories)),
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
    const items: { [category: string]: Item } = {}
    const _cat: { [label: string]: Tag } = store.state.tags["0"].reduce((
      a: { [label: string]: Tag },
      e: Tag
    ) => {
      a[e.label] = e
      return a
    }, {})

    store.state.memos.forEach((e) => {
      const cat = _cat[e.category]
      if (cat) {
        if (!items[cat.label]) {
          items[cat.label] = {
            category: cat,
            subCategories: [],
          }
        }

        items[cat.label].subCategories.push(e.subCategory)
      }
    })

    return Object.values(items)
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
