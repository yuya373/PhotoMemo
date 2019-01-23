import React from "react"
import { StyleSheet } from "react-native"
import {
  Form,
  Item,
  Input,
  Icon,
  Button,
} from "native-base"

interface Props {
  inputValue: string,
  onChangeText: (text: string) => void,
  onSubmit: () => void,
  onClear: () => void,
  onFocus: () => void,
  onBlur: () => void,
  placeholder: string,
}

export default function Search({
  inputValue,
  onChangeText,
  onSubmit,
  onClear,
  onFocus,
  onBlur,
  placeholder,
}: Props) {

  return (
    <Form style={styles.searchContainer}>
      <Item rounded>
        <Icon
          style={styles.searchLeftIcon}
          name="search"
        />
        <Input
          style={styles.searchInput}
          placeholder={placeholder}
          returnKeyType="search"
          onChangeText={onChangeText}
          onSubmitEditing={onSubmit}
          onFocus={onFocus}
          onBlur={onBlur}
          value={inputValue}
        />
        <Button
          style={styles.searchClearButton}
          transparent
          dark
          onPress={onClear}
        >
          <Icon name="close" />
        </Button>
      </Item>
    </Form>
  )
}


const styles = StyleSheet.create({
  searchContainer: {
    paddingTop: 15,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
  },
  searchInput: {
    height: 40,
    fontSize: 15,
  },
  searchLeftIcon: {
    paddingLeft: 15,
  },
  searchClearButton: {
    zIndex: 1,
  },
})
