import cn from 'classnames';
import { forwardRef } from 'react';

import styles from './Input.module.css';

const Input = forwardRef(function Input( { className, isValid = true, apperance, ...props }, ref) {
	return (
		<input ref={ref} {...props} className={cn(className, styles['input'], {
			[styles['invalid']]: !isValid,
			[styles['input-title']]: apperance == 'title'
		})} />
	);
});

export default Input;
