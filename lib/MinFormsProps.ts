export type ErrorsFromValues<V extends object> = { [ErrorValue in keyof V]?: string };

export type SetValue<V extends object> = (
  /**
   * Name of value property
   */
  value: keyof V,
  /**
   * It's value
   */
  newValue: V[keyof V]
) => void;

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
