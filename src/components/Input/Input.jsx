import cn from 'classnames';
import { forwardRef } from 'react';

import styles from './Input.module.css';

const Input = forwardRef(function Input( { className, isValid = true, apperance, ...props }, ref) {
	return (
		<input ref={ref} className={cn(className, styles['input'], {
			[styles['invalid']]: !isValid,
			[styles['input-title']]: apperance == 'title'
		})} {...props} />
	);
});

export default Input;
