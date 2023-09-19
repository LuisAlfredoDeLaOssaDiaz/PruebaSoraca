import React from "react";
// import { Container } from "semantic-ui-react";
// import { TopBar, Footer } from "../../components/Web";
// import "./ClientLayout.scss";

export function ClientLayout(props) {
  const { children } = props;

  return (
    <div>
      header
      {children}
      footer
    </div>
  );
}

