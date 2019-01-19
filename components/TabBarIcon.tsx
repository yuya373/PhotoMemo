import React from 'react';
import { Icon } from 'native-base';

import Colors from '../constants/Colors';

interface Props {
  name: string,
  focused: boolean,
}

export default function TabBarIcon({
  name,
  focused,
}: Props) {
  return (
    <Icon
      name={name}
      style={{
        marginBottom: -3,
        color: focused ?
          Colors.tabIconSelected :
          Colors.tabIconDefault,
      }}
    />
  );
}
