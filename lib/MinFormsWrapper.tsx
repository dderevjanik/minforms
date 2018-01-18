import * as React from "react";
import { MinForms, MinFormsProps } from "./MinForms";

export function MinForm<V extends object>(props: MinFormsProps<V>) {
    return <MinForms {...props} />;
}
