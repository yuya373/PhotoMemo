import { RootState } from "../../reducers";
import { ThunkDispatch } from "redux-thunk";
import { Actions } from "../../actions";
import { NavigationScreenProp, NavigationState } from "react-navigation";
import { memoFormChangeSubCategory } from "../../actions/memoFormAction";
import { TagLevel } from "../../reducers/tagsReducer";
import { connect } from "react-redux";
import { SubCategory } from "../../components/MemoForm/SubCategory";

function mapStateToProps(state: RootState) {
  return {
    selected: state.memoForm.subCategory,
    subCategories: state.tags[1],
  }
}

function mapDispatchToProps(
  dispatch: ThunkDispatch<RootState, undefined, Actions>,
  { navigation }: { navigation: NavigationScreenProp<NavigationState> }
) {
  return {
    goBack: () => navigation.goBack(),
    onPressItem: (subCategory: string) =>
      dispatch(memoFormChangeSubCategory(subCategory)),
    onPressAddItem: (level: TagLevel) =>
      navigation.navigate("CreateTag", { level })
  }
}

export const SubCategoryContainer =
  connect(mapStateToProps, mapDispatchToProps)(SubCategory)
