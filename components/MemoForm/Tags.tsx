import React from "react"
import { Tag } from "./../../models/Tag";
import Picker from "./../../components/Picker"
import { Header } from "./Header";
import {
  Content,
  Container,
} from "native-base"

interface Props {
  tags: Array<Tag>,
  selected: Array<string>,
  onPressItem: (item: string) => void,
  onPressAddItem: (tagLevel: "2") => void,
  goBack: () => void,
}

export function Tags({
  tags,
  selected,
  onPressItem,
  onPressAddItem,
  goBack,
}: Props) {
  const handlePressAddItem = () => {
    onPressAddItem("2")
  }
  const handlePressItem = ({ label }: { label: string }) => {
    onPressItem(label)
  }

  return (
    <Container>
      <Header
        title="Tags"
        leftButtonLabel="Save"
        onPressAddItem={handlePressAddItem}
        onPressLeftButton={goBack}
      />
      <Content>
        <Picker
          items={tags}
          selected={selected}
          onPressItem={handlePressItem}
        />
      </Content>
    </Container>
  )
}
