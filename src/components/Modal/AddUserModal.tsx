import React, { useState } from 'react';
import { Box, Button, Form, FormField, Layer, TextInput } from 'grommet';
import { User } from '../../utils/types';
import { createUser } from '../../utils/api';

interface Props {
  onClose: () => void;
  onAddUser: (user: User) => void;
}

export default function AddUserModal({ onClose, onAddUser }: Props) {
  const [user, setUser] = useState<User>({id: "", gender: "", name: "", email: "", password: "", address: "", phone: "", dob: "", registered: ""});
  

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await createUser(user);
    } catch (err) {
      console.error(err);
    }

    onClose();
  };

  return (
    <Layer onEsc={onClose} onClickOutside={onClose}>
      <Box pad="medium" gap="medium">
        <Form onSubmit={handleSubmit}>
          <FormField name="gender" label="Gender">
            <TextInput value={user.gender} onChange={event => setUser({ ...user, gender: event.target.value })} />
          </FormField>
          <FormField name="name" label="Name">
            <TextInput value={user.name} onChange={event => setUser({ ...user, name: event.target.value })} />
          </FormField>
          <FormField name="email" label="Email">
            <TextInput value={user.email} onChange={event => setUser({ ...user, email: event.target.value })} />
          </FormField>
          <FormField name="password" label="Password">
            <TextInput value={user.password} onChange={event => setUser({ ...user, password: event.target.value })} />
          </FormField>
          <FormField name="address" label="Address">
            <TextInput value={user.address} onChange={event => setUser({ ...user, address: event.target.value })} />
          </FormField>
          <FormField name="phone" label="Phone">
            <TextInput value={user.phone} onChange={event => setUser({ ...user, phone: event.target.value })} />
          </FormField>
          <FormField name="dob" label="Date of Birth">
            <TextInput value={user.dob} onChange={event => setUser({ ...user, dob: event.target.value })} />
          </FormField>
          <Box direction="row" justify="end" gap="medium">
            <Button label="Cancel" onClick={onClose} />
            <Button type="submit" primary label="Add User" />
          </Box>
        </Form>
      </Box>
    </Layer>
  );
}
