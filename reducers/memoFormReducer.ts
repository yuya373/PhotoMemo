import { Actions } from "../actions";
import { MemoFormInitPayload } from "./../actions/memoFormAction"
import { Types } from "./../types";

export interface MemoFormState {
  id: string,
  uri: string,
  width: number,
  height: number,
  tags: Array<string>,
  subCategory: string,
  category: string,
}

export const initialMemoFormState = {
  id: "",
  uri: "",
  width: 0,
  height: 0,
  tags: [],
  subCategory: "",
  category: "",
}

function init(
  _state: MemoFormState,
  payload: MemoFormInitPayload,
): MemoFormState {
  return payload
}

function changeTag(
  state: MemoFormState,
  { tag }: { tag: string },
): MemoFormState {
  if (state.tags.find((e) => e === tag)) {
    state.tags = state.tags.filter((e) => e !== tag)
  } else {
    state.tags = state.tags.concat([tag])
  }

  return state
}

function changeSubCategory(
  state: MemoFormState,
  { subCategory }: { subCategory: string }
): MemoFormState {
  if (subCategory === state.subCategory) {
    state.subCategory = ""
  } else {
    state.subCategory = subCategory
  }
  return state
}

function changeCategory(
  state: MemoFormState,
  { category }: { category: string }
): MemoFormState {
  if (state.category === category) {
    state.category = ""
  } else {
    state.category = category
  }
  return state
}

function storeNewImage(
  _state: MemoFormState,
  { uri, width, height }: {
    uri: string,
    width: number,
    height: number,
  }
): MemoFormState {
  return {
    id: "",
    uri,
    width,
    height,
    category: "",
    subCategory: "",
    tags: [],
  }
}

export function memoFormReducer(
  state: MemoFormState,
  action: Actions,
): MemoFormState {
  switch (action.type) {
    case Types.MEMO_FORM_INIT:
      return init(state, action.payload)
    case Types.MEMO_FORM_CHANGE_TAG:
      return changeTag(state, action.payload)
    case Types.MEMO_FORM_CHANGE_CATEGORY:
      return changeCategory(state, action.payload)
    case Types.MEMO_FORM_CHANGE_SUB_CATEGORY:
      return changeSubCategory(state, action.payload)
    case Types.STORE_NEW_IMAGE:
      return storeNewImage(state, action.payload)
    default:
      return state
  }
}


export const isValid = (memoForm: MemoFormState) =>
  memoForm.tags.length > 0 &&
  memoForm.category.length > 0 &&
  memoForm.subCategory.length > 0
