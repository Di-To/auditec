import styles from '../styles/Layout.module.css'
import NavBar from './NavBar'
import NavBarB from './NavBarB'

const Layout = ({children}) => {
  return (
    <>
        <NavBarB/>
        <div className={styles.container}>
            <main className={styles.main}>
                {children}
            </main>
        </div>
    </>
  )
}

export default Layout