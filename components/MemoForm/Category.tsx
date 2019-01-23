import React from "react"
import { Tag } from "./../../models/Tag";
import Picker from "./../../components/Picker"
import {
  Container,
  Content,
} from "native-base"
import { Header } from "./Header";

interface Props {
  categories: Array<Tag>,
  selected: string,
  onPressItem: (item: string) => void,
  onPressAddItem: (tagLevel: "0") => void,
  goBack: () => void,
}

export default function Category({
  selected,
  categories,
  onPressItem,
  onPressAddItem,
  goBack,
}: Props) {
  const handlePressAddItem = () => {
    onPressAddItem("0")
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
        leftButtonLabel="Cancel"
        title="Categories"
        onPressAddItem={handlePressAddItem}
        onPressLeftButton={goBack}
      />
      <Content>
        <Picker
          items={categories}
          selected={selected}
          onPressItem={handlePressItem}
        />
      </Content>
    </Container>
  )
}
