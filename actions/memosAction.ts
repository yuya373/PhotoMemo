import { Action } from "redux";
import { Memo } from "../models/Memo";
import { Types } from "./../types"
import { ThunkResult } from ".";
import { Alert } from "react-native";
import { saveState } from "./initialState";

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

interface DeleteMemoAction extends Action {
  type: Types.DELETE_MEMO,
  payload: {
    id: string,
  }
}

const confirmDelete = (): Promise<boolean> => new Promise((resolve) => Alert.alert("Are you sure?", "", [
  { text: "OK", onPress: () => resolve(true) },
  { text: "Cancel", onPress: () => resolve(false), style: "cancel" },
]))

export function deleteMemo(): ThunkResult<Promise<boolean>> {
  return async (dispatch, getState) => {
    const confirmed = await confirmDelete()
    if (!confirmed) return false

    const id = getState().memoForm.id
    dispatch({
      type: Types.DELETE_MEMO,
      payload: { id },
    })
    dispatch(saveState())
    return true
  }
}

export type MemosActions = UpdateMemoAction | CreateMemoAction | DeleteMemoAction
