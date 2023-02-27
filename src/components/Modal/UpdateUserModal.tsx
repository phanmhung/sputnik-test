import { Box, Button, Heading, Layer, TextInput } from 'grommet';
import { User } from '../../utils/types';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  onClose: () => void;
  onUpdateUser: (user: User) => void;
  updatedUser: User;
  setUpdatedUser: Dispatch<SetStateAction<User>>;
}

export default function UpdateUserModal({
  onClose,
  onUpdateUser,
  updatedUser,
  setUpdatedUser,
}: Props) {
  return (
    <Layer onEsc={onClose} onClickOutside={onClose}>
      <Box pad="medium" gap="medium">
        <Heading level={3} margin="none">
          Edit User
        </Heading>
        <Box gap="small">
          <TextInput
            placeholder="Name"
            value={updatedUser.name}
            onChange={(e) =>
              setUpdatedUser({ ...updatedUser, name: e.target.value })
            }
          />
          <TextInput
            placeholder="Email"
            value={updatedUser.email}
            onChange={(e) =>
              setUpdatedUser({ ...updatedUser, email: e.target.value })
            }
          />
          <TextInput
            placeholder="Phone"
            value={updatedUser.phone}
            onChange={(e) =>
              setUpdatedUser({ ...updatedUser, phone: e.target.value })
            }
          />
          <TextInput
            placeholder="Address"
            value={updatedUser.address}
            onChange={(e) =>
              setUpdatedUser({ ...updatedUser, address: e.target.value })
            }
          />
          <Box direction="row" justify="end" gap="medium">
            <Button label="Cancel" onClick={onClose} />
            <Button label="Save" onClick={() => onUpdateUser(updatedUser)} />
          </Box>
        </Box>
      </Box>
    </Layer>
  );
}
