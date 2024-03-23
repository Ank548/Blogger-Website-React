import React from 'react'
import logosrc from '../images/logo.png'


function Logo({ width = '100px' }) {
  return (
    <div style={width = { width }}>
      <img src={logosrc} alt="logo" width={"100%"} height={"100%"} />
    </div>
  )
}

export default Logo;
