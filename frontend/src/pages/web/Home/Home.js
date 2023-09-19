import React from "react";
import { Auth } from '../../../api'
import { Container, Form, Button } from 'semantic-ui-react';
import { useFormik } from 'formik';
import { useAuth } from "../../../hooks";
import * as Yup from 'yup';

const authController = new Auth()

export function Home() {
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

        login(response.access);
      } catch (error) {
        console.error(error);
      }
    },
  })

  return (
    <Container 
      style={{
        textAligh: "center",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <h1>form</h1>
      <Form style={{ width: "30%"}} onSubmit={formik.handleSubmit}>
        <Form.Input 
          type="text" 
          placeholder="ID" 
          id="id" 
          onChange={formik.handleChange} 
          error={formik.errors.id}
        />
        <Form.Input 
          type="password" 
          placeholder="Password" 
          id="password" 
          onChange={formik.handleChange} 
          error={formik.errors.password}
        />
        <Button type="submit">Submit</Button>
        <Button type="submit">Clear</Button>
      </Form>
    </Container>
  );
}

