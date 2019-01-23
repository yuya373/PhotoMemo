import { RootState } from "../reducers";
import { connect } from "react-redux";
import { HomeScreen } from "../screens/HomeScreen";
import { ThunkDispatch } from "redux-thunk";
import { Actions } from "../actions";
import { NavigationScreenProp, NavigationState } from "react-navigation";
import { storeNewImage } from "../actions/newImageAction";

const getMemoIds = (state: RootState): Array<string> => {
  const filter = state.tagsFilter["home"]

  if (filter.tag.length > 0 && !filter.isEditing) {
    return filter.memoIds
  } else {
    return state.memos.ids
  }
}

function mapStateToProps(state: RootState) {
  return {
    memoIds: getMemoIds(state),
  }
}

function mapDispatchToProps(
  dispatch: ThunkDispatch<RootState, undefined, Actions>,
  { navigation }: { navigation: NavigationScreenProp<NavigationState> },
) {
  return {
    addMemo: async () => {
      const result = await dispatch(storeNewImage())
      if (result) {
        navigation.navigate("CreateMemo")
      }
    },
  }
}

export const HomeScreenContainer =
  connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
