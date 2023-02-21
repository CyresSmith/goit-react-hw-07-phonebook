import { ImFilter } from 'react-icons/im';
import { useDispatch } from 'react-redux';

import { Label, Input } from './Filter.styled';
import { setFilterValue } from 'redux/filterSlice';
import Box from 'components/shared/Box';
import theme from 'theme';

const Filter = () => {
  const dispatch = useDispatch();

  const handleFilterChange = e => {
    const value = e.currentTarget.value.toLowerCase().trim();
    dispatch(setFilterValue(value));
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="flrx-start"
      mb={theme.space[6]}
    >
      <Label htmlFor="filter">Contacts filter</Label>

      <Box display="flex" alignItems="center">
        <ImFilter size={30} color={theme.colors.accent} />
        <Input
          type="text"
          id="filter"
          name="filter"
          placeholder="Contact name"
          onChange={handleFilterChange}
        />
      </Box>
    </Box>
  );
};

export default Filter;
