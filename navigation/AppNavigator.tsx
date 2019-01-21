import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator,
} from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import CameraScreen from "./../screens/CameraScreen"
import CreateMemoScreen from "./../screens/CreateMemoScreen"
import CreateTagScreen from "./../screens/CreateTagScreen"
import EditMemoScreen from "./../screens/EditMemoScreen"

const MainStack = createStackNavigator(
  {
    Main: MainTabNavigator,
    Camera: CameraScreen,
    CreateMemo: CreateMemoScreen,
    CreateTag: CreateTagScreen,
    EditMemo: EditMemoScreen,
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
