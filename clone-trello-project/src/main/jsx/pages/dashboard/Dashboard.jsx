import Column from "../../components/column/Column";
import useColumnStatuses from "./useColumnStatuses";
import useCards from "./useCards";
import { v4 as uuidv4 } from "uuid";
import { BallTriangle } from "react-loader-spinner";

function Dashboard() {
	const { columns, isLoadingColumns, isErrorColumns } = useColumnStatuses();
	const { cards, isLoadingCards, isErrorCards, refetchCards } = useCards();

	const spinner = (
		<div className="spinner">
			<BallTriangle color="#7abcff" height={80} width={80} />
		</div>
	);

	const refreshColumns = () => {
		refetchCards();
	};

	return (
		<div className="dashboard">
			{isLoadingColumns || isLoadingCards
				? spinner
				: columns.map(elem => (
						<Column
							key={uuidv4()}
							name={elem.title}
							statusValue={elem.value}
							statuses={columns}
							refreshColumns={refreshColumns}
							cards={cards.filter(card => card.status === elem.value)}
						/>
				  ))}
		</div>
	);
}

export default Dashboard;
