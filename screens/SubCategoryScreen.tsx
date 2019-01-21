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
import { Label } from '../models/Tag';

interface Props {
  navigation: NavigationScreenProp<any, any>,
}

export default class SubCategoryScreen extends React.Component<Props> {
  static navigationOptions = {
    title: 'SubCategories',
  };

  handlePressItem = (subCategory: Label) => () => {
    const { navigation } = this.props
    const category: Label | null =
      navigation.getParam("category", null)

    if (!category) return
    navigation.navigate("Memos", {
      category,
      subCategory,
    })
  }
  keyExtractor = (item: Label) => item
  renderItem = ({ item, index }: { item: Label, index: number }) => {
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
      navigation,
    } = this.props

    const subCategories: Array<Label> =
      navigation.getParam("subCategories", [])

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
