import { useEffect, useReducer, useRef } from 'react';
import Button from '../Button/Button';
import cn from 'classnames';
import Input from '../Input/Input';

import styles from './JournalForm.module.css';
import { INITIAL_STATE, formReducer } from './JournalForm.state';

function JournalForm( { onSubmit } ) {

	const [formState, dispathForm] = useReducer(formReducer, INITIAL_STATE);
	const titleRef = useRef();
	const postRef = useRef();
	const dateRef = useRef();
	const { isValid, isFormReadyToSubmit, values } = formState;

	const focusError = (isValid) => {
		switch (true) {
		case !isValid.title: 
			titleRef.current.focus();
			break;
		case !isValid.post: 
			dateRef.current.focus();
			break;
		case !isValid.date: 
			postRef.current.focus();
			break;
		}
	};

	useEffect(() => {
		let timerId;
		if (!isValid.date || !isValid.post || !isValid.title) {
			focusError(isValid);
			timerId = setTimeout(() => {
				dispathForm({ type: 'RESET_VALIDITY' });
			}, 2000);
		}
		return () => {
			clearTimeout(timerId);
		};
	}, [isValid]);

	useEffect(() => {
		if (isFormReadyToSubmit) {
			onSubmit( values );
		}
	}, [isFormReadyToSubmit]);

	const addJournalItem = (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const formProps = Object.fromEntries(formData);
		dispathForm({ type: 'SUBMIT', payload: formProps });
	};
 
	return (
		<form className={styles['journal-form']} onSubmit={addJournalItem} >
			<div>
				<Input ref={titleRef} type="text" isValid={isValid.title} name='title' apperance="title" />
			</div>
			<div className={styles['form-row']}>
				<label htmlFor="date" className={styles['form-label']}>
					<img src="/public/calendar.svg" alt="Иконка календаря" />
					<span>Дата</span>
				</label>
				<Input ref={dateRef} type='date' isValid={isValid.date} name='date' id='date' />
			</div>
			<div className={styles['form-row']}>
				<label htmlFor="tag" className={styles['form-label']}>
					<img src="/public/folder.svg" alt="Иконка даты" />
					<span>Метки</span>
				</label>
				<Input type='text' id='tag' name='tag' className={cn(styles['input'])} />
			</div>
			<textarea rel={postRef} name="post" id="" cols="30" rows="10" className={cn(styles['input'], {
				[styles['invalid']]: !isValid.post
			})} ></textarea>
			<Button text='Сохранить' />
		</form>	
	);
}

export default JournalForm;
