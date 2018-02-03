# MinForms

[![Greenkeeper badge](https://badges.greenkeeper.io/dderevjanik/minforms.svg)](https://greenkeeper.io/)

[![Build Status](https://travis-ci.org/dderevjanik/minforms.svg?branch=master)](https://travis-ci.org/dderevjanik/minforms)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

:fire: Small and quick alternative to [formik](https://github.com/jaredpalmer/formik)

## Why

Formik is a really great library for building forms in Typescript React. Has great API
and it's easy to use. **MinForms** library is not trying to replace Formik in any
way, it's just a small lib which helps you to build basic forms. For complex
forms, I suggest you to use [formik](https://github.com/jaredpalmer/formik) instead.

Main features:

* small in size
* easy to use (_only one component_)
* has full `typescript` support
* no external dependencies

! `minforms` library is designed to provides no Fields or Custom Inputs. It only cares
about values you provided, so you can build best suited Fields/Inputs for you.

## Installation

`npm i minforms` or `yarn i minforms`

## Examples

### Building basic Login form

```typescript
import * as React from "react";
import { MinForm } from "../lib/index";

export const MyForm = (props: { email: string; password: string }) => (
  <MinForm
    initialValues={{ email: props.email, password: props.password }}
    render={({ values }) => (
      <form>
        <h2>Login Page</h2>
        <input type="text" value={values.email} />
        <br />
        <input type="password" value={values.password} />
        <br />
      </form>
    )}
  />
);
```

More examples can be found in [./examples/](./examples)

## API

### Minforms

```typescript
export type MinFormsProps<V extends object> = {
  /**
   * Initial values passed to QuickForm components.
   * This is required property, once you describe your initialValues
   * you'll be no longer able to change the Shape of values.
   */
  initialValues: V;

  /**
   * Values passed to MinForms. If your component has controlled state
   * and you want to pass changed values to MinForms, use this
   * props to update values.
   */
  values?: Partial<V>;

  /**
   * Render function that renders form based on initial values
   * @param props - given props
   */
  render: (props: RenderProps<V>) => JSX.Element | JSX.Element[];

  /**
   * Put all validation here
   * @param values - obtain from `MinForm` state
   * @return possible errors
   */
  validation?: (values: V) => ErrorsFromValues<V>;

  /**
   * Should validate on submit ?
   * @default {false}
   */
  validateOnSubmit?: boolean;

  /**
   * Should validate immediately after creating a component ?
   * @default {true}
   */
  validateOnInit?: boolean;

  /**
   * What to do, when a new values are passed to `values` props
   */
  onValuesChange?: (values: V, nextValues: Partial<V>) => Partial<V>;
};
```

### Minforms `Render`

```typescript
export type RenderProps<V extends object> = {
  /**
   * Minforms computed values
   * Those are obtained from `initialValues` and `values` props
   */
  values: V;

  /**
   * Automatically update `value` based on input's name
   * To make this work, please put `handleChange` inside your input's `onChange` event
   */
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;

  /**
   * Possible errors returned from `validation` prop
   */
  errors: ErrorsFromValues<V>;

  /**
   * Set new value
   */
  setValue: SetValue<V>;

  /**
   * submit event, pass your custom submit function
   */
  submit: (callback: (values: V) => void) => void;
};
```
