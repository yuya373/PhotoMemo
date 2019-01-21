import React from "react"
import {
  StyleSheet,
  Modal,
  FlatList,
} from "react-native";
import {
  Icon,
  Text,
  Button,
  Header,
  Left,
  Right,
  Body,
  Title,
  Content,
} from "native-base"

export interface Item {
  label: string,
}

interface Props {
  items: Array<Item>,
  onPressItem: (item: Item) => Promise<boolean>,
  selected: Item | undefined | null | Array<Item>,
  title?: string,
  onPressAddItem: () => void,
  isOpen: boolean,
  onClose: () => void,
  onOpen: () => void,
  multiple?: boolean,
}

export default class Picker extends React.PureComponent<Props> {
  openModal = () => this.props.onOpen()
  closeModal = () => this.props.onClose()
  onPressItem = (item: Item) => {
    const {
      onPressItem,
    } = this.props

    onPressItem(item).then((closable) => {
      if (closable) this.closeModal()
    })
  }
  renderItem = ({ item }: { item: Item }) => {
    const { selected } = this.props
    const isSelected = selected != null &&
      (!Array.isArray(selected) ?
        (selected.label === item.label) :
        Boolean(selected.find((e) => e.label === item.label)))
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
  addItem = () => {
    this.closeModal()
    this.props.onPressAddItem()
  }

  render() {
    const {
      selected,
      title,
      items,
      isOpen,
      multiple,
    } = this.props

    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={isOpen}
        onRequestClose={this.closeModal}>
        <Header>
          <Left>
            <Button
              transparent
              onPress={this.closeModal}
            >
              <Text>
                {multiple ? "Save" : "Cancel"}
              </Text>
            </Button>
          </Left>
          <Body>
            <Title>
              {title}
            </Title>
          </Body>
          <Right>
            <Button
              transparent
              onPress={this.addItem}
            >
              <Icon name='add' />
            </Button>
          </Right>
        </Header>
        <Content>
          <FlatList
            extraData={selected}
            data={items}
            renderItem={this.renderItem}
            keyExtractor={this.keyExtractor}
          />
        </Content>
      </Modal>
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
