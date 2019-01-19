import React, { ReactNode } from 'react';
import { Platform, View, SafeAreaView as SView } from 'react-native';

const canUseSafeAreaView = Platform.OS === "ios" &&
  parseInt(`${Platform.Version}`, 10) >= 11

export default function SafeAreaView({
  children,
  style = { flex: 1, backgroundColor: '#fff' },
}: {
  children: ReactNode,
  style?: any,
}) {
  if (canUseSafeAreaView) {
    return (
      <SView style={style}>
        {children}
      </SView>
    )
  }

  return (
    <View style={style} >
      {children}
    </View>
  )
}
