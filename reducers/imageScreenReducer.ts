import { Actions } from "../actions";
import { Types } from "./../types";

export interface ImageScreenState {
  uri: string,
  width: number,
  height: number,
  isLoading: boolean,
}

export const initialImageScreenState = {
  uri: "",
  width: 0,
  height: 0,
  isLoading: false,
}

function saveSize(
  state: ImageScreenState,
  { payload, error }: {
    payload: { uri: string, width: number, height: number } | Error,
    error: boolean,
  }
): ImageScreenState {
  // TODO: handle error
  if (error || payload instanceof Error) return state

  return {
    ...payload,
    isLoading: false,
  }
}

function setLoading(state: ImageScreenState): ImageScreenState {
  return {
    ...state,
    isLoading: true,
  }
}

export function imageScreenReducer(
  state: ImageScreenState,
  action: Actions,
): ImageScreenState {
  switch (action.type) {
    case Types.IMAGE_SCREEN_GET_SIZE_END:
      return saveSize(state, action)
    case Types.IMAGE_SCREEN_GET_SIZE_START:
      return setLoading(state)
    default:
      return state
  }
}
