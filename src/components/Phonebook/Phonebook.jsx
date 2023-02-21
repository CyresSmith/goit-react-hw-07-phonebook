import { useSelector } from 'react-redux';
import { IoIosContacts } from 'react-icons/io';
import { RiContactsBook2Fill } from 'react-icons/ri';

import { getContacts } from 'redux/selectors';

import Section from './Section';
import AddContactForm from './Form';
import Contacts from './Contacts';
import Filter from './Contacts/Filter';

const Phonebook = () => {
  const contacts = useSelector(getContacts);

  return (
    <>
      <Section title="Phonebook" Icon={IoIosContacts}>
        <AddContactForm />
      </Section>
      {contacts.length > 0 && (
        <Section title="Contacts" Icon={RiContactsBook2Fill}>
          {contacts.length > 1 && <Filter />}
          <Contacts />
        </Section>
      )}
    </>
  );
};

export default Phonebook;
