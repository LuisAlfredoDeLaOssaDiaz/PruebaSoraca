import React from "react";
import {useFormik} from 'formik';

import { useAuth } from "../../../hooks";
// import { Button, MenuItem } from "semantic-ui-react";



export function Notes() {
  const { login } = useAuth();

  const formik = useFormik({
    initialValues: {
      id: "",
      password: "",
    },
    validationSchema: Yup.object({
      id: Yup.string().required(),
      password: Yup.string().required(),
    }),
    onSubmit: async (formValue) => {
      try {
        const response = await authController.login(formValue);
        
        authController.setAccessToken(response.access);
        authController.setRefreshToken(response.refresh);
        if (response) {
          console.log(response);
        }

        login(response.access)
      } catch (error) {
        console.error(error);
      }
    },
  })

  return (
    <div>
      <div className="ui card">
        <div className="content">
          <h4>Titulo nota.</h4>
        </div>
        <div className="content">
          <span>Contenido nota.</span>
        </div>
        <div className="content">
          <span className="right floated">
            <button className="ui red button">Delete</button>
          </span>
          <button className="ui blue button">Edit</button>
        </div>
      </div>
    </div>
  );
}
