import { Box, Button, Layer } from 'grommet'
import React from 'react'
import { User } from '../../utils/types';

interface Props {
  selectedUser: User;
  onClose: () => void;

}

function ViewFormModal({selectedUser,onClose}:Props) {
  return (
    <Layer
          onEsc={onClose}
          onClickOutside={onClose}
        >
          <Box pad="medium">
            <Box direction="row" justify="between">
              <h3>{selectedUser.name}</h3>
              <Button label="Close" onClick={onClose} />
            </Box>
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>Phone:</strong> {selectedUser.phone}</p>
            <p><strong>Address:</strong> {selectedUser.address}</p>
            <p><strong>DOB:</strong> {selectedUser.dob}</p>
            <p><strong>Registered:</strong> {selectedUser.registered}</p>
          </Box>
        </Layer>
  )
}

export default ViewFormModal