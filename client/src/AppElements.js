import styled from "styled-components";
// Styled Components
export const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	min-height: 100vh;
	background-color: #f8f9fa;
	padding: 20px;
	box-sizing: border-box;

	@media (max-width: 768px) {
		padding: 10px;
	}
`;

export const Header = styled.h1`
	font-size: 2.5rem;
	color: #343a40;

	@media (max-width: 768px) {
		font-size: 2rem;
	}
`;

export const Supply = styled.p`
	font-size: 1.2rem;
	color: #495057;
	margin: 20px 0;

	@media (max-width: 768px) {
		font-size: 1rem;
		margin: 15px 0;
	}
`;

export const MintButton = styled.button`
	background-color: #007bff;
	color: #fff;
	border: none;
	padding: 10px 20px;
	font-size: 1rem;
	border-radius: 5px;
	cursor: pointer;
	transition: background-color 0.3s;

	&:hover {
		background-color: #0056b3;
	}

	&:disabled {
		background-color: #d6d8db;
		cursor: not-allowed;
	}

	@media (max-width: 768px) {
		padding: 8px 16px;
		font-size: 0.9rem;
	}
`;

export const ConnectButton = styled.button`
	background-color: #28a745;
	color: #fff;
	border: none;
	padding: 10px 20px;
	font-size: 1rem;
	border-radius: 5px;
	cursor: pointer;
	transition: background-color 0.3s;

	&:hover {
		background-color: #218838;
	}

	@media (max-width: 768px) {
		padding: 8px 16px;
		font-size: 0.9rem;
	}
`;
