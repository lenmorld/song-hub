import React from 'react'

const tagline = "'Hub' your "

function word() {
  return 'music'
}

const styles = {
  tagline_span: {
    fontFamily: 'Courier New, Arial',
    color: 'lime',
  },
}

const Header = () => {
  return (
    <header>
      <h1>
        <span className="circle" role="img" aria-label="logo">
          📻
        </span>
        Songhub
        <div style={{ fontSize: '11px', marginLeft: '50px' }}>
          {/* this is a comment */}
          <span style={styles.tagline_span}>
            {tagline}
            {word()}
          </span>
        </div>
      </h1>
    </header>
  )
}

export default Header
