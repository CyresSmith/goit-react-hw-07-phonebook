import { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { CgClose } from 'react-icons/cg';
import IconButton from 'components/shared/IconButton';
import { Backdrop, ModalWindow } from './Modal.styled';
import useLockBodyScroll from './useLockBodyScroll';
import EditContactForm from 'components/Phonebook/Contacts/EditContactForm';
import { useGetContactByIdQuery } from 'redux/contactsSlice';
import { InfinitySpin } from 'react-loader-spinner';
import theme from 'theme';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ onClick, showModal, id }) => {
  const { data, isLoading: isContactLoading } = useGetContactByIdQuery(id);

  const closeModal = useCallback(
    ({ code, target, currentTarget }) => {
      if (target === currentTarget || code === 'Escape') {
        onClick();
      }
    },
    [onClick]
  );

  useEffect(() => {
    document.addEventListener('keydown', closeModal);
    return () => document.removeEventListener('keydown', closeModal);
  }, [closeModal, onClick]);

  useLockBodyScroll();

  return createPortal(
    <Backdrop onClick={closeModal}>
      {isContactLoading && (
        <InfinitySpin width="200" color={theme.colors.accent} />
      )}
      {!isContactLoading && (
        <ModalWindow>
          <IconButton
            icon={CgClose}
            iconSize={20}
            ariaLable="close button"
            onClick={onClick}
            round={true}
          />

          <EditContactForm data={data} toggleModal={onClick} />
        </ModalWindow>
      )}
    </Backdrop>,
    modalRoot
  );
};

export default Modal;
