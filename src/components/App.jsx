import { TiArrowUpThick } from 'react-icons/ti';

import { Phonebook } from './Phonebook/Phonebook';
import Box from './shared/Box';
import ScrollUpBtn from './shared/ScrollUpButton';

const App = () => {
  return (
    <>
      <Box variant="container">
        <Phonebook />
      </Box>
      <ScrollUpBtn icon={TiArrowUpThick} iconSize={30} round={true} />
    </>
  );
};

export default App;
