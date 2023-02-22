import { useState, useCallback } from 'react';

const useToggleModal = () => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = useCallback(() => {
    setShowModal(prevState => !prevState);
  }, []);

  return { showModal, toggleModal };
};

export default useToggleModal;
