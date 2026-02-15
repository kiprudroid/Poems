
import React, { type ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Users, Feather } from 'lucide-react';
import styles from './Layout.module.css';

interface Props {
  children: ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className={styles.container}>
      <header className={styles.appBar}>
        <div className={styles.toolbar}>
          <div className={styles.logo}>
            <Feather size={24} color="#fff" />
            <span className={styles.brand}>Poet's Corner</span>
          </div>
          <nav className={styles.nav}>
            <NavLink 
              to="/" 
              className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}
              end
            >
              <Home size={18} />
              Home
            </NavLink>
            <NavLink 
              to="/authors" 
              className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}
            >
              <Users size={18} />
              Authors
            </NavLink>
          </nav>
        </div>
      </header>
      
      <main className={styles.content}>
        {children}
      </main>

      <footer className={styles.footer}>
        <p>© {new Date().getFullYear()} <a href="https://www.github.com/kiprudroid">Shadrack Kipruto</a> | Classic Poetry for Modern Minds.</p>
      </footer>
    </div>
  );
};

export default Layout;
