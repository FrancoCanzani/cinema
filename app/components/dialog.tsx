import React, { DialogHTMLAttributes, ReactNode } from 'react';

interface DialogProps extends DialogHTMLAttributes<HTMLDialogElement> {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

function Dialog({ isOpen, onClose, children, ...rest }: DialogProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <dialog open {...rest}>
      <div className='dialog-content'>
        {children}
        <button onClick={onClose}>Close</button>
      </div>
    </dialog>
  );
}

export default Dialog;
