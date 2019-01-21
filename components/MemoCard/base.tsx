import React, { ReactNode } from 'react';
import {
  Text,
  Card,
  CardItem,
  Icon,
  Button,
} from 'native-base';
import { Image, StyleSheet, View } from "react-native"

interface Props {
  uri: string,
  Category: ReactNode,
  SubCategory: ReactNode,
  Tags: ReactNode,
  onPressEdit?: () => void,
  onPressImage?: () => void,
}

export default function MemoCard({
  uri,
  Category,
  SubCategory,
  Tags,
  onPressEdit,
  onPressImage,
}: Props) {

  const editButton = onPressEdit ? (
    <View style={styles.editButtonContainer}>
      <Button
        transparent
        small
        onPress={onPressEdit}
      >
        <Icon name="create" />
      </Button>
    </View>
  ) : null

  return (
    <Card style={styles.card}>
      <CardItem
        header
        style={styles.headerContainer}
      >
        <View style={styles.headerText}>
          {Category}
          <Text style={styles.separator}>
            >
          </Text>
          {SubCategory}
        </View>
        {editButton}
      </CardItem>
      <CardItem
        button={(typeof onPressImage) === "function"}
        onPress={onPressImage}
        cardBody
      >
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
    justifyContent: "space-between",
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 0,
  },
  headerText: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  editButtonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    paddingBottom: 5,
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
