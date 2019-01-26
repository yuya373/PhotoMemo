import { RootState } from "../reducers";
import { connect } from "react-redux";
import { MemoCard } from "../components/MemoCard";
import { ThunkDispatch } from "redux-thunk";
import { Actions } from "../actions";
import { NavigationScreenProp, NavigationState, NavigationActions } from "react-navigation";
import { filterCategoryChange, filterSubCategoryChange } from "../actions/filterMemosAction";
import { getImageMeta } from "../actions/imageScreenAction";
import { initMemoForm } from "../actions/memoFormAction";
import { TagsFilterScreen } from "../reducers/tagsFilterReducer";
import { filterTagChange, filterByTag } from "../actions/tagsFilterAction";

function mapStateToProps(state: RootState, { id }: { id: string }) {
  return {
    memo: state.memos.byId[id],
  }
}

function mapDispatchToProps(
  dispatch: ThunkDispatch<RootState, undefined, Actions>,
  { navigation, id, screen }: {
    navigation: NavigationScreenProp<NavigationState>,
    id: string,
    screen: TagsFilterScreen,
  },
) {
  return {
    onPressTag: (tag: string) => {
      dispatch(filterTagChange({ tag, screen }))
      dispatch(filterByTag({ screen }))
    },
    onPressEdit: async () => {
      await dispatch(initMemoForm(id))
      navigation.navigate("EditMemo")
    },
    onPressImage: async () => {
      await dispatch(getImageMeta(id))
      navigation.navigate("Image")
    },
    onPressCategory: async (category: string) => {
      await dispatch(filterCategoryChange(category))
      navigation.navigate("SubCategory")
    },
    onPressSubCategory: async (category: string, subCategory: string) => {
      await dispatch(filterCategoryChange(category))
      await dispatch(filterSubCategoryChange(subCategory))

      const toSubCatetory = NavigationActions.navigate({
        routeName: "SubCategory"
      })
      navigation.dispatch(toSubCatetory)
      const toMemos = NavigationActions.navigate({
        routeName: "Memos",
      })
      navigation.dispatch(toMemos)
    }
  }
}

export const MemoCardContainer =
  connect(mapStateToProps, mapDispatchToProps)(MemoCard)
