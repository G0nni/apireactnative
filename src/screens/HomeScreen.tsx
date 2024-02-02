import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, StyleSheet, Button, Alert} from 'react-native';
import {User} from '../types/user';

const fetchUsers = async () => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const HomeScreen: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetchUsers().then(data => setUsers(data));
  }, []);

  //handle submit post user
  const handleSubmit = () => {
    // met un user par defaut nom
    const user: User = {
      id: 11,
      name: 'Leanne Graham',
      username: 'Bret',
      email: 'fffff@eee.fr',
      address: {
        street: '',
        suite: '',
        city: '',
        zipcode: '',
        geo: {
          lat: '',
          lng: '',
        },
      },
      phone: '',
      website: '',
      company: {
        name: '',
        catchPhrase: '',
        bs: '',
      },
    };

    fetch('https://jsonplaceholder.typicode.com/users', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(response => response.json())
      .then(data =>
        Alert.alert('User added successfully: ', JSON.stringify(data)),
      )
      .catch(error => Alert.alert('Error: ', error));
  };

  const handleEdit = (user: User) => {
    Alert.alert('Edit user: ', JSON.stringify(user));
    fetch(`https://jsonplaceholder.typicode.com/users/${user.id}`, {
      method: 'PUT',
      body: JSON.stringify(user),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(response => response.json())
      .then(data =>
        Alert.alert('User updated successfully: ', JSON.stringify(data)),
      )
      .catch(error => Alert.alert('Error: ', error.toString()));
  };

  const handleDelete = (user: User) => {
    Alert.alert('Delete user: ', JSON.stringify(user));
    fetch(`https://jsonplaceholder.typicode.com/users/${user.id}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(data =>
        Alert.alert('User deleted successfully: ', JSON.stringify(data)),
      )
      .catch(error => Alert.alert('Error: ', error.toString()));
  };

  return (
    <View>
      <Button title="Add User" onPress={() => handleSubmit()} />
      <FlatList
        data={users}
        renderItem={({item}) => (
          <View style={styles.container}>
            <Text style={styles.item}>{item.id}</Text>
            <Text style={styles.item}>{item.name}</Text>
            <Text style={styles.item}>{item.email}</Text>
            <Button
              title="Edit"
              onPress={() => {
                handleEdit(item);
              }}
            />
            <Button
              title="Delete"
              onPress={() => {
                handleDelete(item);
              }}
            />
          </View>
        )}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

export default HomeScreen;
