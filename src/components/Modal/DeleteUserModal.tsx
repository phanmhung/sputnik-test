import { Box, Button, Heading, Layer, Paragraph } from "grommet";

interface Props {
    onClose: () => void;
    onDeleteUser: (userId: string) => void;
    deleteUserId:string;
  }
  
  export default function DeleteUserModal({ onClose, onDeleteUser, deleteUserId }: Props) {

    return(
        <Layer onEsc={onClose} onClickOutside={onClose}>
          <Box pad="medium" gap="medium">
            <Heading level={3} margin="none">
              Delete User
            </Heading>
            <Paragraph>Are you sure you want to delete this user?</Paragraph>
            <Box direction="row" justify="end" gap="medium">
              <Button label="Cancel" onClick={onClose} />
              <Button label="Delete" color="status-critical" onClick={()=>onDeleteUser(deleteUserId)} />
            </Box>
          </Box>
        </Layer>
    )
  }