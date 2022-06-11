import styles from '../styles/Layout.module.css'
import NavBar from './NavBar'

const Layout = ({children}) => {
  return (
    <>
        <NavBar/>
        <div className={styles.container}>
            <main className={styles.main}>
                {children}
            </main>
        </div>
    </>
  )
}

export default Layout