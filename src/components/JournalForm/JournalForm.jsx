import { useContext, useEffect, useReducer, useRef } from 'react';
import Button from '../Button/Button';
import cn from 'classnames';
import Input from '../Input/Input';

import styles from './JournalForm.module.css';
import { INITIAL_STATE, formReducer } from './JournalForm.state';
import { UserContext } from '../../context/user.context';

function JournalForm( { onSubmit, data, onDelete } ) {

	const [formState, dispathForm] = useReducer(formReducer, INITIAL_STATE);
	const { isValid, isFormReadyToSubmit, values } = formState;
	const titleRef = useRef();
	const postRef = useRef();
	const dateRef = useRef();
	const { userId } = useContext(UserContext);


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
		if (!data) {
			dispathForm( { type: 'CLEAR'} );
			dispathForm({ type: 'SET_VALUE', payload: { userId }});
		}
		dispathForm({ type: 'SET_VALUE', payload: { ...data }});
	}, [data]);

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
			dispathForm( { type: 'CLEAR'} );
			dispathForm({ type: 'SET_VALUE', payload: { userId }});
		}
	}, [isFormReadyToSubmit, values, onSubmit, userId]);

	const addJournalItem = (e) => {
		e.preventDefault();
		dispathForm({ type: 'SUBMIT'});
	};

	const onChange = (e) => {
		dispathForm({ type: 'SET_VALUE', payload: { [e.target.name]: e.target.value}});
	};

	const deleteJournalItem = () => {
		onDelete(data.id);
		dispathForm( { type: 'CLEAR'} );
		dispathForm({ type: 'SET_VALUE', payload: { userId }});
	};
 
	return (
		<form className={styles['journal-form']} onSubmit={addJournalItem}>
			<div className={styles['form-row']}>
				<Input apperance='title' ref={titleRef} onChange={onChange} value={values.title} type="text" isValid={isValid.title} name='title' />
				{data?.id && <button className={styles['delete']} type='button' onClick={deleteJournalItem}>
					<img src='/public/delete.svg' alt="кнопка удалить" />
				</button>}
			</div>
			<div className={styles['form-row']}>
				<label htmlFor="date" className={styles['form-label']}>
					<img src="/public/calendar.svg" alt="Иконка календаря" />
					<span>Дата</span>
				</label>
				<Input ref={dateRef} onChange={onChange} value={values.date} type='date' isValid={isValid.date} name='date' id='date' />
			</div>
			<div className={styles['form-row']}>
				<label htmlFor="tag" className={styles['form-label']}>
					<img src="/public/folder.svg" alt="Иконка даты" />
					<span>Метки</span>
				</label>
				<Input  onChange={onChange} type='text' id='tag' value={values.tag} name='tag' className={cn(styles['input'])} />
			</div>
			<textarea  onChange={onChange} rel={postRef} value={values.post} name="post" id="" cols="30" rows="10" className={cn(styles['input'], {
				[styles['invalid']]: !isValid.post
			})} ></textarea>
			<Button>Сохранить</Button>
		</form>	
	);
}

export default JournalForm;
