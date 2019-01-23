import { Actions } from "../actions";
import { memosReducer, MemosState, initialMemosState } from "./memosReducer"
import { initialTagsState, TagsState, tagsReducer } from "./tagsReducer";
import { memosFilterReducer, MemosFilterState, initialMemosFilterState } from "./memosFilterReducer";
import { TagMemoState, initialTagMemoState, tagMemoReducer } from "./tagMemoReducer";
import { initialTagsFilterState, TagsFilterState, tagsFilterReducer } from "./tagsFilterReducer";
import { ImageScreenState, initialImageScreenState, imageScreenReducer } from "./imageScreenReducer";
import { initialMemoFormState, MemoFormState, memoFormReducer } from "./memoFormReducer";

export interface RootState {
  memos: MemosState,
  tags: TagsState,
  memosFilter: MemosFilterState,
  tagMemo: TagMemoState,
  tagsFilter: TagsFilterState,
  imageScreen: ImageScreenState,
  memoForm: MemoFormState,
}

const initialRootState: RootState = {
  memos: initialMemosState,
  tags: initialTagsState,
  memosFilter: initialMemosFilterState,
  tagMemo: initialTagMemoState,
  tagsFilter: initialTagsFilterState,
  imageScreen: initialImageScreenState,
  memoForm: initialMemoFormState,
}

export function rootReducer(
  state: undefined | RootState = initialRootState,
  action: Actions,
): RootState {
  return {
    memos: memosReducer(state.memos, action),
    tags: tagsReducer(state.tags, action),
    memosFilter: memosFilterReducer(state.memosFilter, action),
    tagMemo: tagMemoReducer(state.tagMemo, action),
    tagsFilter: tagsFilterReducer(state.tagsFilter, action),
    imageScreen: imageScreenReducer(state.imageScreen, action),
    memoForm: memoFormReducer(state.memoForm, action),
  }
}
