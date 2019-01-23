import React from "react"
import { Tag } from "./../../models/Tag";
import Picker from "./../../components/Picker"
import {
  Content,
  Container,
} from "native-base"
import { Header } from "./Header";

interface Props {
  subCategories: Array<Tag>,
  selected: string,
  onPressItem: (item: string) => void,
  onPressAddItem: (tagLevel: "1") => void,
  goBack: () => void,
}

export function SubCategory({
  subCategories,
  selected,
  onPressItem,
  onPressAddItem,
  goBack,
}: Props) {
  const handlePressAddItem = () => {
    onPressAddItem("1")
  }
  const handlePressItem = ({ label }: { label: string }) => {
    const isSame = selected === label
    onPressItem(label)

    if (isSame) return
    goBack()
  }

  return (
    <Container>
      <Header
        title="SubCategories"
        leftButtonLabel="Cancel"
        onPressAddItem={handlePressAddItem}
        onPressLeftButton={goBack}
      />
      <Content>
        <Picker
          items={subCategories}
          selected={selected}
          onPressItem={handlePressItem}
        />
      </Content>
    </Container>
  )
}
