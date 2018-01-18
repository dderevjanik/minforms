import * as React from "react";
import { MinForm } from "../lib/index";

export const Calculator = (props: {}) => (
  <div>
    <h1>Calculator Example</h1>
    <MinForm
      initialValues={{
        a: 0,
        b: 0
      }}
      render={({ values, handleChange, errors }) => (
        <div>
          <input className={errors.a} name="a" type="text" value={values.a} onChange={handleChange} /> +
          <input className={errors.b} name="b" type="text" value={values.b} onChange={handleChange} /> =
          <div>Result: {values.a + values.b}</div>
        </div>
      )}
    />
  </div>
);
