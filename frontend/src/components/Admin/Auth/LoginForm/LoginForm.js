import React from "react";
import { Form } from "semantic-ui-react";
import { useFormik } from "formik";
import { Auth } from '../../../../api';
// import { useAuth } from "../../../../hooks";
import { inititalValues, validationSchema } from "./LoginForm.form";

const authController = new Auth();

export function LoginForm() {
  // const { login } = useAuth();

  const formik = useFormik({
    initialValues: inititalValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const response = await authController.login(formValue);

        const res = authController.setAccessToken(response.access);
        console.log(res);
        authController.setRefreshToken(response.refresh);

        // login(response.access);
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Input
        name="id"
        placeholder="ID user"
        onChange={formik.handleChange}
        value={formik.values.id}
        error={formik.errors.id}
      />
      <Form.Input
        name="password"
        type="password"
        placeholder="Password"
        onChange={formik.handleChange}
        value={formik.values.password}
        error={formik.errors.password}
      />

      <Form.Button type="submit" primary fluid loading={formik.isSubmitting}>
        Entrar
      </Form.Button>
    </Form>
  );
}
