import React from 'react';
import { View } from "react-native";
import RootNavigator from "@Navigations/Root";
import RealmContextProvider from '@Context/Realm-Context';

const Root = () =>
    <View style={{ flex: 1 }}>
        <RealmContextProvider>
            <RootNavigator />
        </RealmContextProvider>
    </View>

export default Root;
