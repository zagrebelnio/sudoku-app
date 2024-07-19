/* eslint-disable react/prop-types */
import './Button.css';

export default function Button({children, btnType, icon, selected, ...props}) {
  
  if (btnType === 'icon') {
    return (
      <div className='button-container'>
        <button className={`button button-${btnType}` + (selected ? ' button-selected' : '')} {...props}>
          <img src={icon} alt="" />
        </button>
        <p className='button-text'>{children}</p>
      </div>
    );
  }
  
  return (
    <button className={`button button-${btnType}`} {...props}>
      {children}
    </button>
  );
}