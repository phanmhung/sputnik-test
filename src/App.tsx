import React from 'react';
import {
  Box,
  Button,
  Grommet,
  Header,
  HeaderExtendedProps,
  Page,
  PageContent,
  PageHeader,
  Pagination,
  Text,
} from 'grommet';
import { useEffect, useState } from 'react';
import { Filters } from './components/Filters/Filters';
import UserTable from './components/Table/DataTable';
import { themeGrommet } from './libs/theme/themeGrommet';

import { User } from './utils/types';
import { CardLayout } from './components/CardLayout/CardLayout';
import { getUsers } from './utils/api';

const AppBar = (props: JSX.IntrinsicAttributes & HeaderExtendedProps) => (
  <Header
    background="brand"
    pad={{ left: 'medium', right: 'small', vertical: 'small' }}
    elevation="medium"
    {...props}
  />
);

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [primaryFilter, setPrimaryFilter] = useState('');
  const [secondaryFilter, setSecondaryFilter] = useState('');
  const [viewMode, setViewMode] = useState<'table' | 'card'>('table');
  const toggleViewMode = () => {
    setViewMode(viewMode === 'table' ? 'card' : 'table');
  };

  const handleApplyFilters = (
    newPrimaryFilter: string,
    newSecondaryFilter: string
  ) => {
    setPrimaryFilter(newPrimaryFilter);
    setSecondaryFilter(newSecondaryFilter);
  };

  const filteredUsers = users.filter((user) => {
    if (!primaryFilter && !secondaryFilter) {
      return true;
    }
    if (primaryFilter && !secondaryFilter) {
      return user.name.toLowerCase().includes(primaryFilter.toLowerCase());
    }
    if (!primaryFilter && secondaryFilter) {
      return user.email.toLowerCase().includes(secondaryFilter.toLowerCase());
    }
    return (
      user.name.toLowerCase().includes(primaryFilter.toLowerCase()) &&
      user.email.toLowerCase().includes(secondaryFilter.toLowerCase())
    );
  });

  const handleLoadUsers = async () => {
    const users = await getUsers();
    setUsers(users);
  };
  useEffect(() => {
    handleLoadUsers();
  }, []);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const handlePageChange = (page:number) => {
    setPage(page);
  };

  const handlePageSizeChange = (event: { target: { value: string; }; }) => {
    const newPageSize = parseInt(event.target.value, 10);
    setPageSize(newPageSize);
    setPage(1);
  };
  const displayedUsers = users.slice((page - 1) * pageSize, page * pageSize);

  return (
    <Grommet theme={themeGrommet} full>
      <Page>
        <AppBar>
          <Text size="large">My App</Text>
        </AppBar>
        <PageContent>
          <PageHeader title="Welcome to Admin page" />
          <Box pad={{ horizontal: 'small' }}>
            <Button
              label={viewMode === 'table' ? 'Card View' : 'Table View'}
              onClick={toggleViewMode}
            />
          </Box>
          <Filters onApplyFilters={handleApplyFilters} />
          {viewMode === 'table' ? (
            <UserTable users={displayedUsers} onLoadUsers={handleLoadUsers} />
          ) : (
            <CardLayout users={displayedUsers} onLoadUsers={handleLoadUsers} />
          )}
          <Box margin={{ top: 'medium' }} align="center">
        <Pagination
          alignSelf="center"
          margin={{ vertical: 'medium' }}
          numberItems={filteredUsers.length}
          onChange={({page})=>handlePageChange(page)}
          page={page}
          step={pageSize}
        />
        <Box margin={{ top: 'medium' }} direction="row" justify="center">
          <span>Rows per page: </span>
          <select value={pageSize} onChange={handlePageSizeChange}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </Box>
      </Box>
        </PageContent>
      </Page>
    </Grommet>
  );
}

export default App;
