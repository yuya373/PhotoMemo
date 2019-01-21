import React from "react"
import { NavigationScreenProp } from "react-navigation";
import {
  Content,
  Container,
  Header,
  Left,
  Body,
  Right,
  Button,
  Title,
  Text,
} from "native-base"
import { Subscribe } from 'unstated';
import Store from "./../store"
import MemoForm from "./../components/MemoForm"
import { Memo } from "../models/Memo";
import { Tag } from "../models/Tag";
import { Item } from "../components/Picker";

interface Props {
  navigation: NavigationScreenProp<any, any>,
  store: Store,
}

interface State {
  id: string,
  uri: string,
  category: Tag | undefined,
  subCategory: Tag | undefined,
  tags: Array<Tag>,
}

class EditMemoScreen extends React.Component<Props, State> {
  goBack = () => this.props.navigation.goBack()
  goCreateTag = (level: string) =>
    this.props.navigation.navigate("CreateTag", { level })

  onCategorySelected = (item: Item) => {
    const { category } = this.state
    if (category && category.label === item.label) {
      this.setState({ category: undefined })
      return
    }

    this.setState({
      category: {
        label: item.label,
        level: "0",
      }
    })
  }
  onSubCategorySelected = (item: Item) => {
    const { subCategory } = this.state
    if (subCategory && subCategory.label === item.label) {
      this.setState({ subCategory: undefined })
      return
    }

    this.setState({
      subCategory: {
        label: item.label,
        level: "1",
      }
    })
  }
  onTagsSelected = (item: Item) => {
    this.setState((s) => {
      const exists = s.tags.find((e) => e.label === item.label)
      if (exists) {
        return {
          ...s,
          tags: s.tags.filter((e) => e.label !== item.label),
        }
      } else {
        return {
          ...s,
          tags: s.tags.concat([{ label: item.label, level: "2" }]),
        }
      }
    })
  }
  updateMemo = () => {
    this.props.store.updateMemo(this.buildMemo())
  }
  buildMemo = (): Memo => {
    const {
      id,
      uri,
      category,
      subCategory,
      tags,
    } = this.state
    return {
      id,
      uri,
      category: category!.label,
      subCategory: subCategory!.label,
      tags: tags.map((e) => e.label),
    }
  }
  isSaveButtonDisabled = () => {
    const {
      category,
      subCategory,
      tags,
    } = this.state
    return category == null ||
      subCategory == null ||
      tags.length <= 0
  }

  constructor(props: Props) {
    super(props)
    const id: string | null = props.navigation.getParam("id", null)
    if (!id) {
      throw new Error(`id must not ${id}`)
    }
    const memo: Memo | undefined = props.store.findMemo(id)
    if (!memo) {
      throw new Error(`Memo not found: ${id}`)
    }

    const category = props.store.findCategory(memo.category)!
    const subCategory = props.store.findSubCategory(memo.subCategory)!
    const tags = props.store.findTags(memo.tags)

    this.state = {
      id,
      uri: memo.uri,
      category,
      subCategory,
      tags,
    }
  }

  render() {
    const {
      uri,
      category,
      subCategory,
      tags,
    } = this.state

    return (
      <Container>
        <Header>
          <Left>
            <Button
              transparent
              onPress={this.goBack}
            >
              <Text>Cancel</Text>
            </Button>
          </Left>
          <Body>
            <Title>
              Edit Memo
            </Title>
          </Body>
          <Right>
            <Button
              transparent
              disabled={this.isSaveButtonDisabled()}
              onPress={this.updateMemo}
            >
              <Text>Save</Text>
            </Button>
          </Right>
        </Header>
        <Content>
          <MemoForm
            uri={uri}
            category={category}
            subCategory={subCategory}
            tags={tags}
            onCategorySelected={this.onCategorySelected}
            onSubCategorySelected={this.onSubCategorySelected}
            onTagSelected={this.onTagsSelected}
            onTagModalOpen={this.goCreateTag}
          />
        </Content>
      </Container >
    )
  }
}

export default ({ navigation }: { navigation: NavigationScreenProp<any, any> }) => (
  <Subscribe to={[Store]}>
    {(store: Store) => (<EditMemoScreen store={store} navigation={navigation} />)}
  </Subscribe>
)
