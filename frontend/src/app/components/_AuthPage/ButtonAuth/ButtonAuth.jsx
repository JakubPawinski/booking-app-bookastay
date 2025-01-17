export default function ButtonAuth({ children, isSelected, onSelect }) {
	return (
		<button className={isSelected ? 'active' : ''} onClick={onSelect}>
			{children}
		</button>
	);
}
