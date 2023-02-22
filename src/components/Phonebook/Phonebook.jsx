import { useGetContactsQuery } from 'redux/contactsSlice';
import { IoIosContacts } from 'react-icons/io';
import { RiContactsBook2Fill } from 'react-icons/ri';

import Section from './Section';
import AddContactForm from './Form';
import Contacts from './Contacts';
import Filter from './Contacts/Filter';

export const Phonebook = () => {
  const { data: myContacts = [] } = useGetContactsQuery();

  return (
    <>
      <Section title="Phonebook" Icon={IoIosContacts}>
        <AddContactForm />
      </Section>
      <Section title="Contacts" Icon={RiContactsBook2Fill}>
        {myContacts.length > 1 && <Filter />}
        <Contacts />
      </Section>
    </>
  );
};

// export default Phonebook;
