/**
 * We need Wrapper in order to get intellisense from initialValues
 * read more https://github.com/Microsoft/TypeScript/issues/6395
 */
import * as React from "react";
import { MinForms } from "./MinForms";
import { MinFormsProps } from "./MinFormsProps";

export function MinForm<Values extends object, ErrorType = string>(props: MinFormsProps<Values, ErrorType>) {
  return <MinForms {...props} />;
}
