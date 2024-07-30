import React from "react";
import { Link } from "react-router-dom";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const Menu = () => {
	return (
		<nav style={styles.nav}>
			{/* <Link to="/" style={styles.link}>
				Home
			</Link> */}
			<ConnectButton chainStatus="icon" />
			{/* Add more links as needed */}
		</nav>
	);
};

const styles = {
	nav: {
		display: "flex",
		gap: "10px",
	},
	link: {
		textDecoration: "none",
		color: "black",
	},
};

export default Menu;
