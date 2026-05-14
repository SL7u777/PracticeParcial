import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const styles = {
  navbar: {
    backgroundColor: '#1a1a2e',
    padding: '0 40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '64px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
  },
  brand: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '22px',
    fontWeight: '700',
    letterSpacing: '1px',
  },
  brandSpan: {
    color: '#e63946',
  },
  nav: {
    display: 'flex',
    gap: '24px',
    alignItems: 'center',
  },
  link: {
    color: '#ccc',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'color 0.2s',
  },
};

function Navbar() {
  const navigate = useNavigate();
  return (
    <nav style={styles.navbar}>
      <Link to="/" style={styles.brand}>
        Aero<span style={styles.brandSpan}>Reservas</span>
      </Link>
      <div style={styles.nav}>
        <Link to="/" style={styles.link}>Inicio</Link>
        <button
          onClick={() => navigate('/')}
          style={{
            backgroundColor: '#e63946',
            color: 'white',
            border: 'none',
            padding: '8px 20px',
            borderRadius: '5px',
            fontWeight: '600',
            cursor: 'pointer',
          }}
        >
          Reservar vuelo
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
