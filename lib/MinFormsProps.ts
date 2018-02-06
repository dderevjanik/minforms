export type ErrorsFromValues<V extends object, E> = { [ErrorValue in keyof V]?: E };

export type SetValue<Values extends object> = (
  /**
   * Name of value property
   */
  value: keyof Values,
  /**
   * It's value
   */
  newValue: Values[keyof Values]
) => void;

export type RenderProps<Values extends object, ErrorType> = {
  /**
   * Minforms computed values
   * Those are obtained from `initialValues` and `values` props
   */
  values: Values;

  /**
   * Automatically update `value` based on input's name
   * To make this work, please put `handleChange` inside your input's `onChange` event
   */
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;

  /**
   * Possible errors returned from `validation` prop
   */
  errors: ErrorsFromValues<Values, ErrorType>;

  /**
   * Set new value
   */
  setValue: SetValue<Values>;

  /**
   * submit event, pass your custom submit function
   */
  submit: (callback: (values: Values) => void) => void;
};

export type MinFormsProps<V extends object, E> = {
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
  render: (props: RenderProps<V, E>) => JSX.Element | JSX.Element[];

  /**
   * Put all validation here
   * @param values - obtain from `MinForm` state
   * @return possible errors
   */
  validation?: (values: V) => ErrorsFromValues<V, E>;

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
