import { User } from './types';

const URL='http://localhost:8000/user';
// get all Users
export const getUsers = async (): Promise<User[]> => {
    const response = await fetch(`${URL}`);
    return response.json();
}
// create User
export const createUser = async (user: User): Promise<User> => {
  //registered date to user
  user.registered = new Date().toISOString();
    const response = await fetch(`${URL}`, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    });
    return response.json();
}

// update User
export const updateUser = async (user: User): Promise<User> => {
    const response = await fetch(`${URL}/${user.id}`, {
        method: 'PUT',
        body: JSON.stringify(user),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    });
    return response.json();
}
// delete User
export const deleteUser = async (id: string): Promise<User> => {
    const response = await fetch(`${URL}/${id}`, {
        method: 'DELETE',
    });
    return response.json();
}
