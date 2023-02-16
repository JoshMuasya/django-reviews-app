import React from 'react';

import Nav from './nav';

const Layout = ({ children }) => {
  return (
    <>
        <Nav />
        {children}
    </>
  )
}

export default Layout