import React, { ReactNode } from 'react';
import {
  Text,
  Card,
  CardItem,
} from 'native-base';
import { Image, StyleSheet } from "react-native"

interface Props {
  uri: string,
  Category: ReactNode,
  SubCategory: ReactNode,
  Tags: ReactNode,
}

export default function MemoCard({
  uri,
  Category,
  SubCategory,
  Tags,
}: Props) {

  return (
    <Card style={styles.card}>
      <CardItem
        header
        style={styles.headerContainer}
      >
        {Category}
        <Text style={styles.separator}>
          >
        </Text>
        {SubCategory}
      </CardItem>
      <CardItem cardBody>
        <Image
          source={{ uri }}
          style={styles.image}
        />
      </CardItem>
      {Tags}
    </Card >
  )
}

const styles = StyleSheet.create({
  card: {
    marginTop: 10,
    marginBottom: 10,
  },
  headerContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  separator: {
    marginLeft: 10,
    marginRight: 10,
    paddingBottom: 2,
  },
  tagsContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  tag: {
    marginRight: 10
  },
  image: {
    flex: 1,
    height: 200,
    resizeMode: "cover",
  },
})
