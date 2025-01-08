export default function ProfileInfoButton({ children, onSelect, isSelected }) {
	return (
		<button
			className={
				isSelected ? 'profile-info-button active' : 'profile-info-button'
			}
			onClick={onSelect}
		>
			{children}
		</button>
	);
}
