import React from 'react';
import {
  Text,
  CardItem,
  Button,
} from 'native-base';
import { StyleSheet } from "react-native"
import BaseMemoCard from "./base"
import { Memo } from '../../models/Memo';

interface Props {
  memo: Memo,
  onPressEdit: () => void,
  onPressImage: () => void,
  onPressCategory: (category: string) => void,
  onPressSubCategory: (category: string, subCategory: string) => void,
}

export function MemoCard({
  memo,
  onPressEdit,
  onPressImage,
  onPressCategory,
  onPressSubCategory,
}: Props) {

  const Category = onPressCategory ? (
    <Button
      transparent
      small
      dark
      onPress={() => onPressCategory(memo.category)}
    >
      <Text
        style={styles.buttonText}
      >
        {memo.category}
      </Text>
    </Button>
  ) : (<Text>{memo.category}</Text>)

  const SubCategory = onPressSubCategory ? (
    <Button
      transparent
      small
      dark
      onPress={() => onPressSubCategory(memo.category, memo.subCategory)}
    >
      <Text
        style={styles.buttonText}
      >
        {memo.subCategory}
      </Text>
    </Button>
  ) : (<Text>{memo.subCategory}</Text>)

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
    <BaseMemoCard
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
  buttonText: {
    paddingLeft: 0,
    paddingRight: 0,
    fontWeight: "600",
    fontSize: 16,
  },
})
