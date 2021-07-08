import { DarkModalSection } from 'components/feature/header/auth/auth';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  onCloseModal: () => void;
};

const Modal = ({ children, onCloseModal }: Props) => {
  return <DarkModalSection onClick={onCloseModal}>{children}</DarkModalSection>;
};

export default Modal;
