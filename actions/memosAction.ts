import { Action } from "redux";
import { Memo } from "../models/Memo";
import { Types } from "./../types"

interface UpdateMemoAction extends Action {
  type: Types.UPDATE_MEMO,
  payload: {
    memo: Memo
  }
}

export function updateMemo(memo: Memo): UpdateMemoAction {
  return {
    type: Types.UPDATE_MEMO,
    payload: {
      memo,
    }
  }
}

interface CreateMemoAction extends Action {
  type: Types.CREATE_MEMO,
  payload: {
    newMemo: Memo,
  }
}

export function createMemo(newMemo: Memo): CreateMemoAction {
  return {
    type: Types.CREATE_MEMO,
    payload: {
      newMemo
    }
  }
}

export type MemosActions = UpdateMemoAction | CreateMemoAction
