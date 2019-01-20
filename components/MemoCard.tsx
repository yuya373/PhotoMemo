import React from 'react';
import {
  Text,
  Card,
  CardItem,
  Button,
} from 'native-base';
import { Image, StyleSheet } from "react-native"
import { Memo } from '../models/Memo';

interface Props {
  memo: Memo,
}

export default function MemoCard({
  memo,
}: Props) {

  return (
    <Card style={styles.card}>
      <CardItem
        header
        style={styles.headerContainer}
      >
        <Text>
          {memo.category}
        </Text>
        <Text style={styles.separator}>
          >
        </Text>
        <Text>
          {memo.subCategory}
        </Text>
      </CardItem>
      <CardItem cardBody>
        <Image
          source={{ uri: memo.uri }}
          style={styles.image}
        />
      </CardItem>
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
  },
})
