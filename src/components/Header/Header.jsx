import styles from './Header.module.css';

function Header() {
	return (
		<img className={styles.logo} src="/Logo.svg" alt="Логотип журнала" />
	);
}

export default Header;
