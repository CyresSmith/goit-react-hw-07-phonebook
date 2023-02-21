import { useDispatch, useSelector } from 'react-redux';
import { IoMdPerson, IoIosCall } from 'react-icons/io';
import { MdPersonRemoveAlt1 } from 'react-icons/md';
import { BiLoaderCircle } from 'react-icons/bi';

import { removeContact } from 'redux/operations';
import { getContacts } from 'redux/selectors';
import { Contact, Name, Phone, DeletBtn, Loader } from './Contacts.styled';
import theme from 'theme';
import Box from 'components/shared/Box';

export const ContactsItem = ({ id, name, phone }) => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector(getContacts);

  const handleContactRemove = id => dispatch(removeContact(id));

  return (
    <Contact>
      <Box>
        <Box display="flex" alignItems="center" mb={[2]}>
          <IoMdPerson size={20} color={theme.colors.secondary} />
          <Name>{name}</Name>
        </Box>
        <Box display="flex" alignItems="center">
          <IoIosCall size={20} color={theme.colors.secondary} />
          <Phone>{phone}</Phone>
        </Box>
      </Box>

      <DeletBtn
        disabled={isLoading ? true : false}
        onClick={() => handleContactRemove(id)}
      >
        {isLoading && (
          <Loader>
            <BiLoaderCircle size={20} color={theme.colors.white} />
          </Loader>
        )}
        {!isLoading && (
          <MdPersonRemoveAlt1 size={20} color={theme.colors.white} />
        )}
      </DeletBtn>
    </Contact>
  );
};
