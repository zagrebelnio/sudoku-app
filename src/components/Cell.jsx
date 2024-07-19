import './Cell.css';

import Notes from './Notes.jsx';

/* eslint-disable react/prop-types */
export default function Cell({value, status, notes, ...props}) {

  return (
    <div className={`cell ${status ?? ''}`} {...props}>
      {value !== 0 ? value : ''}
      { notes ? 
        <Notes notes={notes} /> : 
        ''
      } 
    </div>
  );
}