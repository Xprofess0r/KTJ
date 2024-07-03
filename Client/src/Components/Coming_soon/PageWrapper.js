import React from 'react'

const PageWrapper = (props) => (
  <div style={{ height: '100vh', backgroundColor: 'black' }}>
    {props.children}
  </div>
)

export default PageWrapper