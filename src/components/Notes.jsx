import './Notes.css';

/* eslint-disable react/prop-types */
export default function Notes({notes}) {
  return (
    <div className="notes-container">
      {notes.map((note, index) => (
          <div key={index} className="notes-cell">{note === 0 ? '' : note}</div>  
        )
      )}
    </div>
  );
}