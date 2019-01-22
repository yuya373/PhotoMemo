import { Label } from "./Tag"
import uuid from "uuid/v4"

export interface NewMemo {
  uri: string,
  width: number,
  height: number,
  category: Label,
  subCategory: Label,
  tags: Array<Label>,
}

export interface Memo extends NewMemo {
  id: string,
}

export function create(memo: NewMemo): Memo {
  const id = uuid()

  return {
    ...memo,
    id,
  }
}

export function hasTag(memo: Memo, label: Label): boolean {
  for (let tag of memo.tags) {
    if (tag.indexOf(label) >= 0) {
      return true
    }
  }
  return false
}
