import React from 'react';
import {
  Text,
  CardItem,
  Button,
} from 'native-base';
import { StyleSheet } from "react-native"
import MemoCard from "./base"
import { Memo } from '../../models/Memo';

interface Props {
  memo: Memo,
  onPressEdit?: () => void,
  onPressImage?: () => void,
}

export default function StaticMemoCard({
  memo,
  onPressEdit,
  onPressImage,
}: Props) {

  const Category = (
    <Text>
      {memo.category}
    </Text>
  )

  const SubCategory = (
    <Text>
      {memo.subCategory}
    </Text>
  )

  const Tags = (
    <CardItem
      footer
      style={styles.tagsContainer}
    >
      {memo.tags.map((e, i) => (
        <Button
          key={i}
          bordered
          dark
          small
          rounded
          style={styles.tag}
        >
          <Text>{e}</Text>
        </Button>
      ))}
    </CardItem>
  )

  return (
    <MemoCard
      uri={memo.uri}
      Category={Category}
      SubCategory={SubCategory}
      Tags={Tags}
      onPressEdit={onPressEdit}
      onPressImage={onPressImage}
    />
  )
}

const styles = StyleSheet.create({
  tagsContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    alignContent: "space-around",
    paddingBottom: 0,
  },
  tag: {
    marginRight: 10,
    marginBottom: 10,
  },
})
