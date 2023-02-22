import { useRemoveContactMutation } from 'redux/contactsSlice';
import { IoMdPerson, IoIosCall } from 'react-icons/io';
import { MdPersonRemoveAlt1, MdEmail } from 'react-icons/md';
import { BiLoaderCircle } from 'react-icons/bi';
import { FaUserEdit } from 'react-icons/fa';
import { Confirm } from 'notiflix/build/notiflix-confirm-aio';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import {
  Contact,
  Name,
  Phone,
  DeletBtn,
  EditBtn,
  Loader,
} from './Contacts.styled';
import theme from 'theme';
import Box from 'components/shared/Box';

export const ContactsItem = ({ handleModal, contact }) => {
  const { id, firstname, lastname, phone, email } = contact;
  const [removeContact, { isLoading }] = useRemoveContactMutation();

  const handleContactRemove = id => {
    Confirm.show(
      'Confirm contact delete',
      'Are you sure you want to delete a contact?',
      'Yes',
      'No',
      () => {
        removeContact(id);
        Notify.failure(`Сontact successfully deleted`, {
          position: 'right-top',
        });
      },
      () => {
        return;
      },
      {
        backOverlayColor: 'rgba(0, 0, 0, 0.8)',
        fontFamily: theme.fonts.body,
        titleColor: theme.colors.accent,
        messageColor: theme.colors.accent,
        okButtonColor: 'white',
        okButtonBackground: 'red',
        borderRadius: theme.radii.high,
        cancelButtonBackground: theme.colors.background,
        backgroundColor: theme.colors.secondary,
      }
    );
  };

  const name = firstname + ' ' + lastname;

  return (
    <Contact>
      <Box>
        <Box display="flex" alignItems="center" mb={[2]}>
          <IoMdPerson size={20} color={theme.colors.secondary} />
          <Name>{name}</Name>
        </Box>
        <Box display="flex" alignItems="center" mb={[2]}>
          <IoIosCall size={20} color={theme.colors.secondary} />
          <Name>{phone}</Name>
        </Box>
        {email !== '' && (
          <Box display="flex" alignItems="center">
            <MdEmail size={20} color={theme.colors.secondary} />
            <Phone>{email}</Phone>
          </Box>
        )}
      </Box>

      <Box
        display="flex"
        alignItems="center"
        flexDirection="column"
        justifyContent="space-between"
        height="100%"
      >
        <EditBtn
          disabled={isLoading ? true : false}
          onClick={() => handleModal(id)}
        >
          {isLoading && (
            <Loader>
              <BiLoaderCircle size={20} color={theme.colors.white} />
            </Loader>
          )}
          {!isLoading && <FaUserEdit size={20} color={theme.colors.white} />}
        </EditBtn>

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
      </Box>
    </Contact>
  );
};
