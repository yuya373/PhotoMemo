import React from "react"
import { Tag } from "./../../models/Tag";
import {
  StyleSheet,
} from "react-native";
import Picker, { Item as PickerItem } from "./../../components/Picker"

interface Props {
  isOpen: boolean,
  disabled: boolean,
  tags: Array<Tag>,
  selected: Array<Tag>,
  onOpen: () => void,
  onClose: () => void,
  onPressItem: (item: PickerItem) => Promise<boolean>,
  onPressAddItem: (tagLevel: "2") => void,
}

export default function Tags({
  isOpen,
  disabled,
  tags,
  selected,
  onOpen,
  onClose,
  onPressItem,
  onPressAddItem,
}: Props) {
  const handlePressAddItem = () => {
    onPressAddItem("2")
  }

  return (
    <Picker
      title="Tags"
      multiple={true}
      disabled={disabled}
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      items={tags}
      placeholder="Tags"
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
