import { CardContainer } from './styles';

type CardProps = {
	listId: string,
	text: string,
}

export const Card = ({text, listId} : CardProps) => {
	return <CardContainer>{text}</CardContainer>
}