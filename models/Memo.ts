import { Label } from "./Tag"

export type Memo = {
  uri: string,
  category: Label,
  subCategory: Label,
  tags: Array<Label>,
}
