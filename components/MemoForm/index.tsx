import React from "react"
import {
  Content,
} from "native-base"
import MemoCard from "./../MemoCard/Form"

interface Props {
  uri: string,
  category: string,
  subCategory: string,
  tags: Array<string>,
  onPressCategory: () => void,
  onPressSubCategory: () => void,
  onPressTags: () => void,
}

export default function MemoForm({
  uri,
  category,
  subCategory,
  tags,
  onPressCategory,
  onPressSubCategory,
  onPressTags,
}: Props) {
  return (
    <Content>
      <MemoCard
        uri={uri}
        category={category}
        subCategory={subCategory}
        tags={tags}
        onPressCategory={onPressCategory}
        onPressSubCategory={onPressSubCategory}
        onPressTags={onPressTags}
      />
    </Content >
  )
}
