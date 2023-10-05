import LeftPanel from './Layout/LeftPanel/LeftPanel';
import Body from './Layout/Body/Body';
import Header from './components/Header/Header';
import JournalList from './components/JournalList/JournalList';
import JournalAddButton from './components/JournalAddButton/JournalAddButton';
import JournalForm from './components/JournalForm/JournalForm';
import { useLocalStorage } from './hooks/useLocalStorage';
import { UserContextProvider } from './context/user.context';

import './App.css';
import { useState } from 'react';

// const data = [
// 	{
// 		"id": 1,
// 		"title": "Подготовка к обновлению курсов",
// 		"text": "Сегодня провёл весь день за",
// 		"date": "05/08/2023"
// 	},
// 	{
// 		"id": 2,
// 		"title": "Поход в годы",
// 		"text": "Думал, что очень много време",
// 		"date": "06/08/2023"
// 	},
// 	{
// 		"id": 3,
// 		"title": "Первая заметка",
// 		"text": "Создал первую заметку, чтобы",
// 		"date": "07/08/2023"
// 	}
// ];

function mapItems(items) {
	if (!items) {
		return [];
	}
	return items.map(i => ({
		...i,
		date: new Date(i.date)
	}));
}

function App() {
	const [items, setItems] = useLocalStorage('data');
	const [selectedItem, setSelectedItem] = useState(null);

	const addItem = item => {
		if (!item.id) {
			setItems([...mapItems(items), 
				{
					...item, 
					date: new Date(item.date),
					id: items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1
				}
			]);
		} else {
			setItems([...mapItems(items).map(i => {
				if (i.id === item.id) {
					return {
						...item
					};
				} else {
					return i;
				}
			})]);
		}
	};

	const deleteItem = (id) => {
		setItems([...items.filter(i => i.id !== id)]);
	};

	return (
		<UserContextProvider>
			<div className="app">
				<LeftPanel>
					<Header />
					<JournalAddButton clearForm={() => setSelectedItem(null)} />
					<JournalList items={mapItems(items)} setItem={setSelectedItem} />
				</LeftPanel>
				<Body>
					<JournalForm onSubmit={addItem} onDelete={deleteItem} data={selectedItem} />
				</Body>
			</div>
		</UserContextProvider>

	);
}

export default App;
