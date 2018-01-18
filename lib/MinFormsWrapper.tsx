/**
 * We need Wrapper in order to get intellisense from initialValues
 * read more https://github.com/Microsoft/TypeScript/issues/6395
 */
import * as React from "react";
import { MinForms } from "./MinForms";
import { MinFormsProps } from "./MinFormsProps";

export function MinForm<V extends object>(props: MinFormsProps<V>) {
  return <MinForms {...props} />;
}
