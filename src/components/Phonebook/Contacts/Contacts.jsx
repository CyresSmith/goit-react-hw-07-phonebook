import { IoMdPerson, IoIosCall } from 'react-icons/io';
import { MdPersonRemoveAlt1 } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import {
  ContactsList,
  Contact,
  Name,
  Phone,
  DeletBtn,
} from './Contacts.styled';
import Box from 'components/shared/Box';
import theme from 'theme';
import { getContacts, getFilters } from 'redux/selectors';
import { removeContact } from 'redux/contactsSlice';

const Contacts = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const filters = useSelector(getFilters);

  const handleContactRemove = id => dispatch(removeContact(id));

  const visibleСontacts = (value, contacts) => {
    if (value) {
      const visibleСontacts = contacts.filter(({ name }) =>
        name.toLowerCase().includes(value)
      );
      if (visibleСontacts.length === 0) {
        Notify.failure('No contacts with this name', {
          showOnlyTheLastOne: true,
          position: 'right-bottom',
        });
      } else {
        return visibleСontacts;
      }
    }
    return contacts;
  };

  return (
    <ContactsList>
      {visibleСontacts(filters.filterValue, contacts).map(contact => {
        const { id, name, number } = contact;
        return (
          <Contact key={id}>
            <Box>
              <Box display="flex" alignItems="center">
                <IoMdPerson size={20} color={theme.colors.secondary} />
                <Name>{name}</Name>
              </Box>
              <Box display="flex" alignItems="center">
                <IoIosCall size={20} color={theme.colors.secondary} />
                <Phone>{number}</Phone>
              </Box>
            </Box>

            <DeletBtn onClick={() => handleContactRemove(id)}>
              <MdPersonRemoveAlt1 size={20} color={theme.colors.white} />
            </DeletBtn>
          </Contact>
        );
      })}
    </ContactsList>
  );
};

export default Contacts;
