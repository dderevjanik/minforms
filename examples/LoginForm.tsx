import * as React from "react";
import { MinForm } from "../dist/index";

export const LoginForm = (props: { email: string; password: string }) => (
  <MinForm
    initialValues={{ email: props.email, password: props.password }}
    render={({ values, handleChange }) => (
      <form>
        <h2>Login Page</h2>
        <input name="email" type="text" value={values.email} onChange={handleChange} />
        <br />
        <input name="password" type="password" value={values.password} onChange={handleChange} />
        <br />
      </form>
    )}
  />
);
