import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow
} from 'grommet';
import { Edit, FormView, Trash } from 'grommet-icons';
import { useState } from 'react';

import { createUser, deleteUser, updateUser } from '../../utils/api';
import { User } from '../../utils/types';
import AddUserModal from '../Modal/AddUserModal';
import DeleteUserModal from '../Modal/DeleteUserModal';
import UpdateUserModal from '../Modal/UpdateUserModal';
import ViewFormModal from '../Modal/ViewFormModal';

interface UserTableProps {
  users: User[];
  onLoadUsers: () => void;
}

const UserTable = ({users, onLoadUsers}:UserTableProps) => {
  
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [updatedUser, setUpdatedUser] = useState<User>({
    id: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    dob: '',
    registered: '',
    gender: '',
    password: '',
  });
  const [selectedUser, setSelectedUser] = useState(null);

  const handleDelete = async (userId: string) => {
    await deleteUser(userId);
  };

  const handleAdd = async (user: User) => {
    await createUser(user);
    onLoadUsers();
    setShowAddModal(false);
  };
  const handleEdit = async (user: User) => {
    await updateUser(user);
    onLoadUsers();
    setShowEditModal(false);
  };

  const handleViewMore = (user:User) => {
    //@ts-ignore
    setSelectedUser(user);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
  };

  return (
    <>
      <Box direction="row" justify="end" margin="medium">
        <Button label="Add User" onClick={() => setShowAddModal(true)} />
      </Box>
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>{user.address}</TableCell>
              <TableCell>
                <Button
                  icon={<Trash />}
                  onClick={() => {
                    setDeleteUserId(user.id);
                    setShowDeleteModal(true);
                  }}
                />
                <Button
                  icon={<Edit />}
                  onClick={() => {
                    setUpdatedUser(user);
                    setShowEditModal(true);
                  }}
                />
                <Button icon={<FormView />} 
                onClick={()=>handleViewMore(user)}/>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      {showAddModal && (
        <AddUserModal
          onClose={() => setShowAddModal(false)}
          onAddUser={handleAdd}
        />
      )}
      {showDeleteModal && (
        <DeleteUserModal
          onClose={() => setShowDeleteModal(false)}
          onDeleteUser={handleDelete}
          deleteUserId={deleteUserId}
        />
      )}
      {showEditModal && (
        <UpdateUserModal
          onClose={() => setShowEditModal(false)}
          onUpdateUser={handleEdit}
          updatedUser={updatedUser}
          setUpdatedUser={setUpdatedUser}
        />
      )}
      {selectedUser && (
        <ViewFormModal selectedUser={selectedUser} onClose={handleCloseModal} />
      )}
    </>
  );
};

export default UserTable;
