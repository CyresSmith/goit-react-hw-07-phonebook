import { useSelector } from 'react-redux';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { InfinitySpin } from 'react-loader-spinner';

import { ContactsList } from './Contacts.styled';
import theme from 'theme';
import { getFilter } from 'redux/selectors';
import { ContactsItem } from './ContactItem';

import { useGetContactsQuery } from 'redux/contactsSlice';

import Modal from 'components/Phonebook/Contacts/Modal';
import useToggleModal from 'components/Phonebook/Contacts/Modal/useToggleModal';
import { useState } from 'react';

const Contacts = () => {
  const { data: myContacts = [], isLoading, error } = useGetContactsQuery();

  const [modalData, setModalData] = useState(null);
  const { showModal, toggleModal } = useToggleModal();

  const handleModal = id => {
    setModalData(id);
    toggleModal();
  };

  const { filterValue } = useSelector(getFilter);

  const visibleСontacts = (value, contacts) => {
    if (value) {
      const visibleСontacts = contacts.filter(({ firstname, lastname }) => {
        const name = firstname + ' ' + lastname;
        return name.toLowerCase().includes(value);
      });
      if (visibleСontacts.length === 0) {
        Notify.failure('No contacts with this name', {
          showOnlyTheLastOne: true,
          position: 'right-top',
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
          <ContactsItem
            key={contact.id}
            handleModal={handleModal}
            contact={contact}
          />
        ))}
      </ContactsList>
      {showModal && (
        <Modal onClick={toggleModal} showModal={showModal} id={modalData} />
      )}
    </>
  );
};

export default Contacts;
