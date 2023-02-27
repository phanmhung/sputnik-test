import { Box } from 'grommet';
import { useState } from 'react';

import { User } from '../../utils/types';
import AddUserModal from '../Modal/AddUserModal';
import DeleteUserModal from '../Modal/DeleteUserModal';
import UpdateUserModal from '../Modal/UpdateUserModal';
import UserCard from '../UserCard/UserCard';
import { createUser, deleteUser, updateUser } from '../../utils/api';
import ViewFormModal from '../Modal/ViewFormModal';

interface CardLayoutProps {
  users: User[];
  onLoadUsers: () => void;
}

export function CardLayout({ users, onLoadUsers }: CardLayoutProps) {

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
      <Box pad="medium">
        <Box direction="row" wrap justify="center" gap="medium">
          {users.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              setDeleteUserId={setDeleteUserId}
              setShowDeleteModal={setShowDeleteModal}
              setUpdatedUser={setUpdatedUser}
              setShowEditModal={setShowEditModal}
              handleViewMore={handleViewMore}
            />
          ))}
        </Box>
      </Box>
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
}
