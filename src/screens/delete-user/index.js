import React from 'react';
import { View, Alert, FlatList, Text } from 'react-native';
import MTextInput from '@Components/M-TextInput';
import MButton from '@Components/M-Button';
import Realm from 'realm';
let realm;

export default class DeleteUserScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input_user_id: '',
            FlatListItems: []
        };
        realm = new Realm({ path: 'UserDatabase.realm' });
        var user_details = realm.objects('user_details');
        this.state = {
            FlatListItems: user_details,
        };
    }
    deleteUser = () => {
        const { input_user_id } = this.state;
        if (input_user_id == "") {
            alert("user id is empty")
            return;
        }
        realm.write(() => {
            var ID = this.state.input_user_id;
            if (
                realm.objects('user_details').filtered('user_id =' + ID)
                    .length > 0
            ) {
                realm.delete(
                    realm.objects('user_details').filtered('user_id =' + ID)
                );
                var user_details = realm.objects('user_details');
                console.log(user_details);
                Alert.alert(
                    'Success',
                    'User deleted successfully',
                    [
                        {
                            text: 'Ok',
                            onPress: () => console.log("deleted"),
                        },
                    ],
                    { cancelable: false }
                );
            } else {
                alert('Please insert a valid User Id');
            }
        });
    };

    render() {
        return (
            <View style={{ backgroundColor: 'white', flex: 1 }}>
                <MTextInput
                    placeholder="Enter User Id"
                    onChangeText={input_user_id => this.setState({ input_user_id })}
                />
                <MButton
                    title="Delete User"
                    customClick={this.deleteUser}
                />
                <View style={{ flex: 1 }}>
                    <FlatList
                        data={this.state.FlatListItems}
                        ItemSeparatorComponent={this.ListViewItemSeparator}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <View style={{ backgroundColor: 'white', padding: 20 }}>
                                <Text>Id: {item.user_id}</Text>
                                <Text>Name: {item.user_name}</Text>
                                <Text>Contact: {item.user_contact}</Text>
                                <Text>Address: {item.user_address}</Text>
                            </View>
                        )}
                    />
                </View>
            </View>
        )
    }
}

