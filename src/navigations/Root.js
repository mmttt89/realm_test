import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "@Screens/home";
import RegisterUserScreen from "@Screens/register-user";
import UpdateUserScreen from "@Screens/update-user";
import DeleteUserScreen from "@Screens/delete-user";
import ViewUserScreen from "@Screens/view-user";
import ViewAllUserScreen from "@Screens/view-all-user";

const TopLevelStack = createStackNavigator(
    {
        Home: {
            screen: HomeScreen,
            navigationOptions: {
                title: 'HomeScreen',
                headerStyle: { backgroundColor: '#3a59b7' },
                headerTintColor: '#ffffff',
            },
        },
        ViewUser: {
            screen: ViewUserScreen,
            navigationOptions: {
                title: 'View User',
                headerStyle: { backgroundColor: '#3a59b7' },
                headerTintColor: '#ffffff',
            },
        },
        ViewAll: {
            screen: ViewAllUserScreen,
            navigationOptions: {
                title: 'View All User',
                headerStyle: { backgroundColor: '#3a59b7' },
                headerTintColor: '#ffffff',
            },
        },
        Register: {
            screen: RegisterUserScreen,
            navigationOptions: {
                title: 'Register User',
                headerStyle: { backgroundColor: '#3a59b7' },
                headerTintColor: '#ffffff',
            },
        },
        Update: {
            screen: UpdateUserScreen,
            navigationOptions: {
                title: 'Update User',
                headerStyle: { backgroundColor: '#3a59b7' },
                headerTintColor: '#ffffff',
            },
        },
        Delete: {
            screen: DeleteUserScreen,
            navigationOptions: {
                title: 'Register User',
                headerStyle: { backgroundColor: '#3a59b7' },
                headerTintColor: '#ffffff',
            },
        },
    }, {
    initialRouteName: 'Home',    
}
);

const AppContainer = createAppContainer(TopLevelStack);

export default class RootNavigator extends React.Component {
    render() {
        return (
            <AppContainer />
        );
    }
}

