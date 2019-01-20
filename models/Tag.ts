export type Label = string
export type Tag = {
  label: Label,
  level: "0" | "1" | "2",
}

export type Tags = {
  "0": Array<Tag>,
  "1": Array<Tag>,
  "2": Array<Tag>,
}

const isEqual = (a: Tag, b: Tag): boolean => {
  if (a.label !== b.label) return false

  return true
}

export const addTag = (tags: Tags, tag: Tag): Tags => {
  if (tags[tag.level].find((e) => isEqual(e, tag))) {
    return tags
  }

  return {
    ...tags,
    [tag.level]: tags[tag.level].concat(tag),
  }
}
