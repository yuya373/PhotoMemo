import React from 'react';
import {
  Text,
  CardItem,
  Button,
} from 'native-base';
import { StyleSheet } from "react-native"
import MemoCard from "./base"

interface Props {
  uri: string,
  category: string | undefined,
  subCategory: string | undefined,
  tags: Array<string> | undefined,
  onPressCategory?: () => void | undefined,
  onPressSubCategory?: () => void | undefined,
  onPressTags?: () => void | undefined,
}

export default function FormMemoCard({
  uri,
  category,
  subCategory,
  tags,
  onPressCategory,
  onPressSubCategory,
  onPressTags,
}: Props) {

  const Category = (
    <Button
      small
      bordered={category == null}
      transparent={category != null}
      onPress={onPressCategory}
    >
      <Text>
        {category || "Select Category"}
      </Text>
    </Button >
  )

  const SubCategory = (
    <Button
      small
      bordered={subCategory == null}
      transparent={subCategory != null}
      onPress={onPressSubCategory}
    >
      <Text>
        {subCategory || "Select SubCategory"}
      </Text>
    </Button>
  )

  tags = tags && tags.length > 0 ? tags : ["Select Tags"]
  const Tags = (
    <CardItem
      button
      onPress={onPressTags}
      footer
      style={styles.tagsContainer}
    >
      {tags.map((e, i) => (
        <Button
          key={i}
          bordered
          small
          rounded
          style={styles.tag}
          onPress={onPressTags}
        >
          <Text>{e}</Text>
        </Button>
      ))}
    </CardItem>
  )

  return (
    <MemoCard
      uri={uri}
      Category={Category}
      SubCategory={SubCategory}
      Tags={Tags}
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
