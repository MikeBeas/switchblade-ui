import { useEffect } from 'react';
import { Outlet } from 'react-router';

import Header from 'components/Header';
import NavDrawer from 'components/NavDrawer';

const AppChrome = () => {
  useEffect(() => {
    document.getElementById("theme-color").setAttribute("content", "white");
  }, [])

  return (
    <>
      <Header />
      <div style={{ margin: 20 }}>
        <Outlet />
        <NavDrawer />
      </div>
    </>
  )
}

export default AppChrome;