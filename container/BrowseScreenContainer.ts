import { RootState } from "../reducers";
import { connect } from "react-redux";
import { BrowseScreen } from "../screens/BrowseScreen";
import { ThunkDispatch } from "redux-thunk";
import { NavigationScreenProp, NavigationState } from "react-navigation";
import { filterCategoryChange } from "../actions/filterMemosAction";
import { Actions } from "../actions";

const getCategory = (state: RootState): Array<string> => {
  const category: Set<string> = new Set([])

  state.memos.ids.forEach((id) => {
    category.add(state.memos.byId[id].category)
  })

  return Array.from(category)
}

function mapStateToProps(state: RootState) {
  return {
    categories: getCategory(state),
  }
}

function mapDispatchToProps(
  dispatch: ThunkDispatch<RootState, undefined, Actions>,
  { navigation }: { navigation: NavigationScreenProp<NavigationState> },
) {
  return {
    onPressItem: async (category: string) => {
      await dispatch(filterCategoryChange(category))
      navigation.navigate("SubCategory")
    },
  }
}

export const BrowseScreenContainer =
  connect(mapStateToProps, mapDispatchToProps)(BrowseScreen)
