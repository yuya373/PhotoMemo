import { RootState } from "../reducers";
import { connect } from "react-redux";
import { SubCategoryScreen } from "../screens/SubCategoryScreen";
import { ThunkDispatch } from "redux-thunk";
import { Actions } from "../actions";
import { NavigationScreenProp, NavigationState } from "react-navigation";
import { filterSubCategoryChange } from "../actions/filterMemosAction";

const getSubCategories = (state: RootState) => {
  const subCategories: Set<string> = new Set([])
  state.memosFilter.memoIdsByCategory.forEach((id) => {
    const memo = state.memos.byId[id]
    subCategories.add(memo.subCategory)
  })
  return Array.from(subCategories)
}
function mapStateToProps(
  state: RootState
) {
  return {
    subCategories: getSubCategories(state)
  }
}

function mapDispatchToProps(
  dispatch: ThunkDispatch<RootState, undefined, Actions>,
  { navigation }: { navigation: NavigationScreenProp<NavigationState> },
) {
  return {
    onPressItem: async (subCategory: string) => {
      await dispatch(filterSubCategoryChange(subCategory))
      navigation.navigate("Memos")
    }
  }
}

export const SubCategoryScreenContainer =
  connect(mapStateToProps, mapDispatchToProps)(SubCategoryScreen)
