import { Tag, Label } from "./../models/Tag"
import { Memo } from "../models/Memo";
import uuid from "uuid/v4"

export const generateId = uuid

interface Category {
  category: Tag,
  subCategories: Set<Label>,
}
export const collectCategory = (
  { memos, categories }: {
    memos: Array<Memo>,
    categories: Array<Tag>,
  }
): Array<Category> => {
  const items: { [categoryLabel: string]: Category } = {}
  const _cat: { [label: string]: Tag } = categories.reduce((
    a: { [label: string]: Tag },
    e: Tag
  ) => {
    a[e.label] = e
    return a
  }, {})

  memos.forEach((e) => {
    const cat = _cat[e.category]
    if (cat) {
      if (!items[cat.label]) {
        items[cat.label] = {
          category: cat,
          subCategories: new Set([]),
        }
      }

      items[cat.label].subCategories.add(e.subCategory)
    }
  })

  return Object.values(items)
}

export const findMemo = (
  memos: Array<Memo>,
  id: string | null | undefined,
): Memo | undefined => {
  return memos.find((e) => e.id === id)
}

export const findCategory = (
  categories: Array<Tag>,
  label: string,
): Tag | undefined => {
  return categories.find((e) => e.label === label)
}

export const findSubCategory = (
  subCategories: Array<Tag>,
  label: string,
): Tag | undefined => {
  return subCategories.find((e) => e.label === label)
}

export const findTags = (
  tags: Array<Tag>,
  labels: Array<string>,
): Array<Tag> => {
  const result: Array<Tag> = []

  labels.forEach((label) => {
    const tag = tags.find((e) => e.label === label)

    if (tag) {
      result.push(tag)
    }
  })

  return result
}
