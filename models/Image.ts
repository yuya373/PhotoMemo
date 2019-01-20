import { Label, Tag } from "./Tag"

export type Image = {
  uri: string,
  category: Label,
  subCategory: Label,
  tags: Array<Label>,
}

export const addTag = (image: Image, tag: Tag): Image => {
  if (!image.tags.includes(tag.label)) {
    return image
  }

  return {
    ...image,
    tags: image.tags.concat([tag.label]),
  }
}
