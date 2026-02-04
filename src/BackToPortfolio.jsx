import React from 'react';

const BackToPortfolio = () => (
    <a
        href="https://ajlato.com/projects/corporate-responsibility"
        style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            background: '#222',
            color: '#fff',
            padding: '10px 15px',
            borderRadius: '5px',
            textDecoration: 'none',
            fontFamily: 'system-ui, sans-serif',
            fontSize: '14px',
            zIndex: 10000,
            boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
            transition: 'transform 0.2s'
        }}
        onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
    >
        ← Back to Portfolio
    </a>
);

export default BackToPortfolio;
