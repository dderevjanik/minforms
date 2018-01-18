# MinForms

_- Too small to not use_

[![Build Status](https://travis-ci.org/dderevjanik/minforms.svg?branch=master)](https://travis-ci.org/dderevjanik/minforms)

Small and quick alternative to [formik](https://github.com/jaredpalmer/formik)

## Why ?

Formik is a really great library for building forms in typescript. Has great API
and it's easy to use. **MinForms** library is not trying to replace Formik in any
way, it's just small lib which helps you to build basic forms. For complicate
forms, I suggest to use [formik](https://github.com/jaredpalmer/formik) instead.

* small in size
* easy to use
* has full `typescript` support
* no external dependencies

## Installation

`npm i quickform` or `yarn i quickform`

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

copied from [./lib/MinForms.tsx](./lib/MinForms.tsx)

### MinFormProps<V>

```typescript
/**
 * Initial values passed to QuickForm components
 */
initialValues: V;

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
 * Should validate only on submit ?
 */
validateOnSubmit?: boolean;

/**
 * Should immediately after creating a component ?
 */
validateOnInit?: boolean;

/**
 * Automatically change value based on input `name`
 */
handleChange: (e: ReactChangeEvent<HTMLInputElement>) => void;

/**
 * Should autobind input values by Id to initial values and changed them onChange ?
 */
autoBind?: boolean;
```

### RenderProps<V>

```typescript
values: V;
errors: {[ErrorValue in keyof V]?: string };
setValue: (value: keyof V, newValue: V[keyof V]) => void;
```
