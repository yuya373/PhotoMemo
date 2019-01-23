import { Action } from "redux";
import { TagLevel } from "../reducers/tagsReducer";
import { Types } from "./../types"

interface CreateTag extends Action {
  type: Types.CREATE_TAG,
  payload: {
    label: string,
    level: TagLevel,
  }
}

export function createTag(
  label: string,
  level: TagLevel,
): CreateTag {
  return {
    type: Types.CREATE_TAG,
    payload: {
      label,
      level,
    }
  }
}

export type TagsActions = CreateTag
