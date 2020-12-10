import React from 'react'

const tagline = "'Hub' your music"

const styles = {
  tagline_span: {
    // fontFamily: 'Courier New, Arial',
    color: 'white',
  },
}

const Header = () => {
  return (
    <header
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <h1>
        <span className="circle" role="img" aria-label="logo">
          📻
        </span>
        Songhub
        <div style={{ fontSize: '11px', marginLeft: '50px' }}>
          <span style={styles.tagline_span}>{tagline}</span>
        </div>
      </h1>
      <div>
        <a
          className="spotify-button"
          style={{
            textDecoration: 'none',
          }}
          href="/logout"
        >
          LOG OUT
        </a>
      </div>
    </header>
  )
}

export default Header
