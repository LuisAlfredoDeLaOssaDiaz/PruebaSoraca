import * as Yup from "yup";

export function inititalValues() {
  return {
    id: "",
    password: "",
  };
}

export function validationSchema() {
  return Yup.object({
    email: Yup.string()
      .email("El id no es valido")
      .required("Campo obligatorio"),
    password: Yup.string().required("Campo obligatorio"),
  });
}
