import { useSelector } from 'react-redux';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { InfinitySpin } from 'react-loader-spinner';

import { ContactsList } from './Contacts.styled';
import theme from 'theme';
import { getContacts, getFilters } from 'redux/selectors';
import { ContactsItem } from './ContactItem';

const Contacts = () => {
  const { myContacts, isLoading, error } = useSelector(getContacts);
  const { filterValue } = useSelector(getFilters);

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
    <>
      {!myContacts.length > 0 && isLoading && (
        <InfinitySpin width="200" color={theme.colors.accent} />
      )}
      <ContactsList>
        {visibleСontacts(filterValue, myContacts).map(contact => (
          <ContactsItem key={contact.id} {...contact} />
        ))}
      </ContactsList>
    </>
  );
};

export default Contacts;
