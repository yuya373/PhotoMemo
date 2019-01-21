import React from "react"
import { Tag } from "./../../models/Tag";
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
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      items={tags}
      selected={selected}
      onPressItem={onPressItem}
      onPressAddItem={handlePressAddItem}
    />
  )
}
