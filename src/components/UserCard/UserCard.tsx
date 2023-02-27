import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Text,
} from 'grommet';
import { Edit, Trash } from 'grommet-icons';
import { Dispatch, SetStateAction } from 'react';
import { User } from '../../utils/types';

type Props = {
  user: User;
  setDeleteUserId: Dispatch<SetStateAction<string>>;
  setShowDeleteModal: Dispatch<SetStateAction<boolean>>;
  setUpdatedUser: Dispatch<SetStateAction<User>>;
  setShowEditModal: Dispatch<SetStateAction<boolean>>;
};

function UserCard({
  user,
  setDeleteUserId,
  setShowDeleteModal,
  setUpdatedUser,
  setShowEditModal,
}: Props) {
  const { name, email, phone, address } = user;

  return (
    <Card
      width="medium"
      background="light-1"
      margin={{ vertical: 'small', horizontal: 'xsmall' }}
    >
      <CardHeader pad="medium">
        <Avatar
          size="large"
          src={`https://avatars.dicebear.com/api/human/${name}.svg`}
        />
      </CardHeader>
      <CardBody pad="medium">
        <Box direction="column" gap="small">
          <Text size="large" weight="bold">
            {name}
          </Text>
          <Text size="medium">{email}</Text>
          <Text size="medium">{phone}</Text>
          <Text size="medium">{address}</Text>
        </Box>
      </CardBody>
      <CardFooter pad="medium" background="light-2">
        <Text size="medium">Registered: {user.registered}</Text>
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
      </CardFooter>
    </Card>
  );
}

export default UserCard;
