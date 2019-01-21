import React from "react"
import { Tag } from "./../../models/Tag";
import {
  StyleSheet,
} from "react-native";
import Picker, { Item as PickerItem } from "./../../components/Picker"

interface Props {
  isOpen: boolean,
  disabled: boolean,
  subCategories: Array<Tag>,
  selected: Tag | undefined,
  onOpen: () => void,
  onClose: () => void,
  onPressItem: (item: PickerItem) => Promise<boolean>,
  onPressAddItem: (tagLevel: "1") => void,
}

export default function SubCategory({
  isOpen,
  disabled,
  subCategories,
  selected,
  onOpen,
  onClose,
  onPressItem,
  onPressAddItem,
}: Props) {
  const handlePressAddItem = () => {
    onPressAddItem("1")
  }

  return (
    <Picker
      title="SubCategories"
      isOpen={isOpen}
      disabled={disabled}
      onClose={onClose}
      onOpen={onOpen}
      items={subCategories}
      placeholder="Select SubCategory"
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
