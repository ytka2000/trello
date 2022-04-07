import React, { useState } from "react";
import NewCard from "../new-card/NewCard";
import Card from "../card/Card";
import { v4 as uuidv4 } from "uuid";
import { deleteCard } from "../../../js/request/deleteCard";
import { createCard } from "../../../js/request/createCard";
import List from "../../../js/utils/sorting";

function Column({ name, statusValue, statuses, refreshColumns, cards }) {
	const [columnCards, setColumnCards] = useState(cards);

	function deleteCardById(id) {
		deleteCard(id).then(
			setColumnCards(prevList => {
				return prevList.filter(item => {
					return item.id !== id;
				});
			})
		);
	}

	function editCardById(id, data) {
		setColumnCards(prevList => {
			return prevList.map(elem => {
				if (elem.id === id) {
					return data;
				}
				return elem;
			});
		});
		refreshColumns();
	}

	function createNewCard(status) {
		const newCardData = {
			title: "This is title",
			status: status,
			description: "This is description",
		};
		createCard(newCardData)
			.then(response => {
				setColumnCards(prevList => {
					prevList.push({ ...response, editStatus: true });
					return [...prevList];
				});
			})
			.catch(e => console.log(e));
	}

	return (
		<div className="column">
			<h2>{name}</h2>
			<NewCard status={statusValue} createCard={createNewCard} />
			{columnCards.sort(List.sortByDateCreatedAt).map(elem => (
				<Card
					key={uuidv4()}
					title={elem.title}
					description={elem.description}
					status={elem.status}
					statuses={statuses}
					cardId={elem.id}
					deleteData={deleteCardById}
					editData={editCardById}
					editStatus={elem.editStatus}
				/>
			))}
		</div>
	);
}

export default Column;