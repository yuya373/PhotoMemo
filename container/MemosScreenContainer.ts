import { RootState } from "../reducers";
import { connect } from "react-redux";
import { MemosScreen } from "../screens/MemosScreen";

const getMemoIds = (state: RootState) => {
  const filter = state.tagsFilter["browse"]
  if (!filter.isEditing && filter.tag.length > 0) {
    return filter.memoIds
  } else {
    return state.memosFilter.memoIdsBySubCategory
  }
}

function mapStateToProps(state: RootState) {
  return {
    memoIds: getMemoIds(state),
  }
}

export const MemosScreenContainer =
  connect(mapStateToProps)(MemosScreen)
