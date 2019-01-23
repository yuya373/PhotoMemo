import { Action } from "redux";
import { ThunkResult } from ".";
import { updateMemo, createMemo } from "./memosAction";
import { generateId } from "../util";
import { saveState } from "./initialState";
import { Types } from "./../types"

interface MemoFormInitAction extends Action {
  type: Types.MEMO_FORM_INIT,
  payload: MemoFormInitPayload,
}

export interface MemoFormInitPayload {
  id: string,
  uri: string,
  width: number,
  height: number,
  category: string,
  subCategory: string,
  tags: Array<string>,
}

export function initMemoForm(id: string): ThunkResult<Promise<void>> {
  return async (dispatch, getState) => {
    const state = getState()
    const memo = state.memos.byId[id]
    dispatch({
      type: Types.MEMO_FORM_INIT,
      payload: {
        ...memo
      }
    })
  }
}

interface MemoFormChangeTagAction extends Action {
  type: Types.MEMO_FORM_CHANGE_TAG,
  payload: {
    tag: string,
  }
}

export function memoFormChangeTag(tag: string): MemoFormChangeTagAction {
  return {
    type: Types.MEMO_FORM_CHANGE_TAG,
    payload: {
      tag,
    }
  }
}

interface MemoFormChangeCategoryAction extends Action {
  type: Types.MEMO_FORM_CHANGE_CATEGORY,
  payload: {
    category: string,
  }
}

export function memoFormChangeCategory(category: string): MemoFormChangeCategoryAction {
  return {
    type: Types.MEMO_FORM_CHANGE_CATEGORY,
    payload: {
      category,
    }
  }
}

interface MemoFormChangeSubCategoryAction extends Action {
  type: Types.MEMO_FORM_CHANGE_SUB_CATEGORY,
  payload: {
    subCategory: string,
  }
}

export function memoFormChangeSubCategory(subCategory: string): MemoFormChangeSubCategoryAction {
  return {
    type: Types.MEMO_FORM_CHANGE_SUB_CATEGORY,
    payload: {
      subCategory,
    }
  }
}

interface MemoFormUpdateTagMemoAction extends Action {
  type: Types.MEMO_FORM_UPDATE_TAG_MEMO,
  payload: {
    memoId: string,
    tags: Array<string>,
  }
}

export function saveMemoForm(): ThunkResult<Promise<void>> {
  return async (dispatch, getState) => {
    const state = getState()
    const form = state.memoForm
    const memo = state.memos.byId[form.id]

    dispatch({
      type: Types.MEMO_FORM_UPDATE_TAG_MEMO,
      payload: {
        memoId: memo.id,
        tags: form.tags,
      }
    })
    const newMemo = {
      ...memo,
      category: form.category,
      subCategory: form.subCategory,
      tags: form.tags,
    }
    dispatch(updateMemo(newMemo))
    dispatch(saveState())
  }
}

export function createMemoForm(): ThunkResult<Promise<void>> {
  return async (dispatch, getState) => {
    const state = getState()
    const id = generateId()
    const {
      uri,
      width,
      height,
      category,
      subCategory,
      tags,
    } = state.memoForm

    const memo = {
      id,
      uri,
      width,
      height,
      category,
      subCategory,
      tags,
    }
    dispatch(createMemo(memo))
    dispatch(saveState())
  }
}

export type MemoFormActions = MemoFormInitAction | MemoFormChangeTagAction | MemoFormChangeCategoryAction | MemoFormChangeSubCategoryAction | MemoFormUpdateTagMemoAction
