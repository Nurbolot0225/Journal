import './JournalItem.css';

function JournalItem({ title, post, date }) {
	const formatedDate = new Intl.DateTimeFormat('ru-RU').format(date);

	return (
		<>
			<h2 className="journal-item-header">{title}</h2>
			<h2 className="journal-item-body">
				<div className="journal-item-date">{formatedDate}</div>
				<div className="journal-item-text">{post}</div>
			</h2>
		</>
	);
}

export default JournalItem;
