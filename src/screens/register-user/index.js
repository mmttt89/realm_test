import React from 'react';
import Realm from 'realm';
import { View, ScrollView, KeyboardAvoidingView, Alert, FlatList, Text } from 'react-native';
import MTextInput from '@Components/M-TextInput';
import MButton from '@Components/M-Button';
let realm;

export default class RegisterUserScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user_name: '',
            user_contact: '',
            user_address: '',
            FlatListItems: []
        };
        realm = new Realm({ path: 'UserDatabase.realm' });
        var user_details = realm.objects('user_details');
        this.state = {
            FlatListItems: user_details,
        };
    }

    register_user = () => {
        // var that = this;
        const { user_name, user_contact, user_address } = this.state;
        if (user_name) {
            if (user_contact) {
                if (user_address) {
                    realm.write(() => {
                        var ID =
                            realm.objects('user_details').sorted('user_id', true).length > 0
                                ? realm.objects('user_details').sorted('user_id', true)[0]
                                    .user_id + 1
                                : 1;
                        realm.create('user_details', {
                            user_id: ID,
                            user_name: this.state.user_name,
                            user_contact: this.state.user_contact,
                            user_address: this.state.user_address,
                        })

                        Alert.alert(
                            'Success',
                            'You are registered successfully',
                            [
                                {
                                    text: 'Ok',
                                    onPress: () => console.log("done"),
                                },
                            ],
                            { cancelable: false }
                        );
                    });
                } else {
                    alert('Please fill Address');
                }
            } else {
                alert('Please fill Contact Number');
            }
        } else {
            alert('Please fill Name');
        }
    };
    ListViewItemSeparator = () => {
        return (
            <View style={{ height: 0.5, width: '100%', backgroundColor: '#000' }} />
        );
    };

    render() {
        return (
            <View style={{ backgroundColor: 'white', flex: 1 }}>
                <View keyboardShouldPersistTaps="handled" style={{flex:1, justifyContent:'flex-start'}}>
                    <KeyboardAvoidingView
                        behavior="padding"
                        style={{ flex: 1, justifyContent: 'space-between' }}>
                        <MTextInput
                            placeholder="Enter Name"
                            onChangeText={user_name => this.setState({ user_name })}
                        />
                        <MTextInput
                            placeholder="Enter Contact No"
                            onChangeText={user_contact => this.setState({ user_contact })}
                            maxLength={10}
                            keyboardType="numeric"
                        />
                        <MTextInput
                            placeholder="Enter Address"
                            onChangeText={user_address => this.setState({ user_address })}
                            maxLength={225}
                            numberOfLines={5}
                            multiline={true}
                            style={{ textAlignVertical: 'top' }}
                        />
                        <MButton
                            title="Submit"
                            customClick={this.register_user}
                        />
                    </KeyboardAvoidingView>
                </View>
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

