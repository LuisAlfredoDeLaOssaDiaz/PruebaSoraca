import React from "react";
import { Route, Routes } from 'react-router-dom';
import { Home, Notes } from '../pages/web'
import { ClientLayout } from '../layouts';
import { useAuth } from "../hooks";


const NotFound = _=> {
  return (
    <div>
      <span>404</span>
    </div>
  )
}

export function WebRouter() {
  const {user} = useAuth();

  const loadLayout = (Layout, Page) => {
    return (
      <Layout>
        <Page />
      </Layout>
    );
  };
  
  return (
    <Routes>
      {!user ?
        <>
          <Route path="/*" element={loadLayout(ClientLayout, NotFound)} />
          <Route path="/" element={loadLayout(ClientLayout, Home)} />
        </>
        :<>
        <Route path="/*" element={loadLayout(ClientLayout, NotFound)} />
        <Route path="/" element={loadLayout(ClientLayout, Notes)} />
        </>
      }
    </Routes>
  );
}
