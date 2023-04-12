import { useState } from 'react';

const useModal = (initialState = false) => {
  const [isOpen, setIsOpen] = useState<boolean>(initialState);

  const handleOpenModal = (): void => setIsOpen(true);
  const handleCloseModal = (): void => setIsOpen(false);

  return {
    isOpen,
    handleOpenModal,
    handleCloseModal,
  };
};

export default useModal;
