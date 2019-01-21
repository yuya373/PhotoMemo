import React from "react"
import { Tag } from "./../../models/Tag";
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
      onClose={onClose}
      onOpen={onOpen}
      items={subCategories}
      selected={selected}
      onPressItem={onPressItem}
      onPressAddItem={handlePressAddItem}
    />
  )
}
