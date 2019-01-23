import { RootState } from "../../reducers";
import { ThunkDispatch } from "redux-thunk";
import { Actions } from "../../actions";
import { NavigationScreenProp, NavigationState } from "react-navigation";
import { memoFormChangeCategory } from "../../actions/memoFormAction";
import { TagLevel } from "../../reducers/tagsReducer";
import { connect } from "react-redux";
import Category from "../../components/MemoForm/Category";

function mapStateToProps(state: RootState) {
  return {
    selected: state.memoForm.category,
    categories: state.tags[0],
  }
}

function mapDispatchToProps(
  dispatch: ThunkDispatch<RootState, undefined, Actions>,
  { navigation }: { navigation: NavigationScreenProp<NavigationState> }
) {
  return {
    onPressAddItem: (level: TagLevel) => {
      navigation.navigate("CreateTag", { level })
    },
    onPressItem: (category: string) =>
      dispatch(memoFormChangeCategory(category)),
    goBack: () => navigation.goBack(),
  }
}

export const CategoryContainer =
  connect(mapStateToProps, mapDispatchToProps)(Category)
