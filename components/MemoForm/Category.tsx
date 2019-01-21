import React from "react"
import { Tag } from "./../../models/Tag";
import {
  StyleSheet,
} from "react-native";
import Picker, { Item as PickerItem } from "./../../components/Picker"

interface Props {
  isOpen: boolean,
  categories: Array<Tag>,
  selected: Tag | undefined,
  onOpen: () => void,
  onClose: () => void,
  onPressItem: (item: PickerItem) => Promise<boolean>,
  onPressAddItem: (tagLevel: "0") => void,
}

export default function Category({
  isOpen,
  categories,
  selected,
  onOpen,
  onClose,
  onPressItem,
  onPressAddItem,
}: Props) {
  const handlePressAddItem = () => {
    onPressAddItem("0")
  }

  return (
    <Picker
      title="Categories"
      isOpen={isOpen}
      onClose={onClose}
      onOpen={onOpen}
      items={categories}
      placeholder="Select Category"
      selected={selected}
      style={styles.picker}
      onPressItem={onPressItem}
      onPressAddItem={handlePressAddItem}
    />
  )
}


const styles = StyleSheet.create({
  picker: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  }
})
