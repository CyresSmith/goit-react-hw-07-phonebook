import { useDispatch, useSelector } from 'react-redux';
import { IoIosContacts } from 'react-icons/io';
import { RiContactsBook2Fill } from 'react-icons/ri';
import { useEffect } from 'react';

import { getContacts } from 'redux/selectors';
import { fetchContacts } from 'redux/operations';

import Section from './Section';
import AddContactForm from './Form';
import Contacts from './Contacts';
import Filter from './Contacts/Filter';

const Phonebook = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const { myContacts } = useSelector(getContacts);

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

export default Phonebook;
