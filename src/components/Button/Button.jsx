import { Children } from 'react';
import './Button.css';

function Button() {
  return (
    <button className="button accent">{Children}</button>
  );
}

export default Button;
