import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator,
} from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import { CreateMemoScreenContainer } from '../container/CreateMemoScreenContainer';
import { CreateTagScreenContainer } from '../container/CreateTagScreenContainer';
import { EditMemoScreenContainer } from '../container/EditMemoScreenContainer';
import { ImageScreenContainer } from '../container/ImageScreenContainer';
import { CategoryContainer } from '../container/MemoForm/CategoryContainer';
import { SubCategoryContainer } from '../container/MemoForm/SubCategoryContainer';
import { TagsContainer } from '../container/MemoForm/TagsContainer';

const MainStack = createStackNavigator(
  {
    Main: MainTabNavigator,
    CreateMemo: CreateMemoScreenContainer,
    CreateTag: CreateTagScreenContainer,
    EditMemo: EditMemoScreenContainer,
    Image: ImageScreenContainer,
    CategoryPicker: CategoryContainer,
    SubCategoryPicker: SubCategoryContainer,
    TagsPicker: TagsContainer,
  },
  {
    mode: "modal",
    headerMode: "none",
  }
)

export default createAppContainer(createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Main: MainStack,
}));
