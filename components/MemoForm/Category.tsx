import React from "react"
import { Tag } from "./../../models/Tag";
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
      selected={selected}
      onPressItem={onPressItem}
      onPressAddItem={handlePressAddItem}
    />
  )
}
