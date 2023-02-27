import React, { useState } from 'react';
import { Box, Button, Form, FormField, TextInput } from 'grommet';

interface Props {
  onApplyFilters: (primaryFilter: string, secondaryFilter: string) => void;
}

export const Filters = ({ onApplyFilters }: Props) => {
  const [primaryFilter, setPrimaryFilter] = useState('');
  const [secondaryFilter, setSecondaryFilter] = useState('');
  const [showSecondaryFilters, setShowSecondaryFilters] = useState(false);

  const handleApplyFilters = () => {
    onApplyFilters(primaryFilter, secondaryFilter);
  };

  return (
    <Box margin="medium">
      <Form onSubmit={handleApplyFilters}>
        <FormField label="Primary Filter">
          <TextInput
            value={primaryFilter}
            onChange={event => setPrimaryFilter(event.target.value)}
            placeholder="Filter by name"
          />
        </FormField>
        <Box margin={{ top: 'medium' }}>
          <Button
            label="Other filters"
            onClick={() => setShowSecondaryFilters(!showSecondaryFilters)}
          />
        </Box>
        {showSecondaryFilters && (
          <Box margin={{ top: 'medium' }}>
            <FormField label="Secondary Filter">
              <TextInput
              placeholder="Filter by email"
                value={secondaryFilter}
                onChange={event => setSecondaryFilter(event.target.value)}
              />
            </FormField>
          </Box>
        )}
        <Box margin={{ top: 'medium' }}>
          <Button type="submit" label="Apply Filters" primary />
        </Box>
      </Form>
    </Box>
  );
};
