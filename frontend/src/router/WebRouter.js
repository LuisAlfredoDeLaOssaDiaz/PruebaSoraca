import React from "react";
import { Route, Routes } from 'react-router-dom';
import { Home } from '../pages/web'
import { ClientLayout } from '../layouts';

const NotFound = _=> {
  return (
    <div>
      <span>404</span>
    </div>
  )
}

export function WebRouter() {
  const loadLayout = (Layout, Page) => {
    return (
      <Layout>
        <Page />
      </Layout>
    );
  };
  
  return (
    <Routes>
      <Route path="*" element={loadLayout(ClientLayout, NotFound)} />
      <Route path="/" element={loadLayout(ClientLayout, Home)} />
    </Routes>
  );
}
