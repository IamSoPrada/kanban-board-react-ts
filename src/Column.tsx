import {ColumnContainer, ColumnTitle, CardContainer} from "./styles"
import {Card} from "./Card"
type ColumnProps = {
	text: string;
	children?: React.ReactNode;
}

export const Column = ({text}: ColumnProps) => {
	return (
		<ColumnContainer>
			<ColumnTitle>{text}</ColumnTitle>
			<Card text="Создать первое typescript приложение" />
			<Card text="Изучить основы typescript" />
			<Card text="Начать активно использовать typescript" />
		</ColumnContainer>
	)
}