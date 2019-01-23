import React from "react"
import {
  StyleSheet,
  FlatList,
} from "react-native";
import {
  Icon,
  Text,
  Button,
} from "native-base"

export interface Item {
  label: string,
}

interface Props {
  items: Array<Item>,
  selected: string | Array<string>,
  onPressItem: (item: Item) => void,
}

export default class Picker extends React.PureComponent<Props> {
  onPressItem = (item: Item) => {
    const {
      onPressItem,
    } = this.props
    onPressItem(item)
  }
  renderItem = ({ item }: { item: Item }) => {
    const { selected } = this.props
    const isSelected = selected != null &&
      (!Array.isArray(selected) ?
        (selected === item.label) :
        Boolean(selected.find((e) => e === item.label)))
    const buttonLabelColor = isSelected ?
      styles.selectedColor : undefined

    return (
      <Button
        dark
        transparent
        full
        iconRight={isSelected}
        onPress={() => this.onPressItem(item)}
        style={styles.listItem}
      >
        <Text
          style={[buttonLabelColor]}
        >
          {item.label}
        </Text>
        {isSelected &&
          <Icon
            name="checkmark"
            style={[buttonLabelColor]}
          />}
      </Button>
    )
  }
  keyExtractor = (item: Item) => item.label

  render() {
    const {
      selected,
      items,
    } = this.props

    return (
      <FlatList
        extraData={selected}
        data={items}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
      />
    )
  }
}

const styles = StyleSheet.create({
  openPickerButton: {
    justifyContent: "flex-start",
  },
  selectedColor: {
    color: "#007aff",
  },
  listItem: {
    justifyContent: "space-between",
    borderBottomColor: "#c9c9c9",
    borderBottomWidth: 0.8,
  },
})
