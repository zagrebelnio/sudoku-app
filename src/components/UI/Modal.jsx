import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Button from "./Button.jsx";
import Info from "../Info.jsx";
import './Modal.css';

export default function Modal({result, onClose}) {
  const dialog = useRef();
  

  const open = result !== undefined;

  useEffect(() => {
    const modal = dialog.current;
    
    if (open) {
      modal.showModal();
    }

    return () => modal.close();
  }, [open]);

  return createPortal(
    <dialog ref={dialog} className="modal" onClose={onClose}>
      <h1 className="result">{result === 'win' ? 'You won!' : 'You lost' }</h1>
      <Info />
      <Button btnType="default" onClick={onClose}>New Game</Button>
    </dialog>,
    document.getElementById('modal')
  );
}