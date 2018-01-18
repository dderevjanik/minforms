export type ErrorsFromValues<V extends object> = { [ErrorValue in keyof V]?: string };

export type SetValue<V extends object> = (value: keyof V, newValue: V[keyof V]) => void;

export type RenderProps<V extends object> = {
  /**
   * Minforms computed values
   */
  values: V;

  /**
   * Change event binding for input `onChange`
   */
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;

  /**
   * Possible errors returned `validation`
   */
  errors: ErrorsFromValues<V>;

  /**
   * Set new value
   */
  setValue: SetValue<V>;

  /**
   * OnSubmit event
   */
  onSubmit: (callback: (values: V) => void) => void;
};

export type MinFormsProps<V extends object> = {
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
};
