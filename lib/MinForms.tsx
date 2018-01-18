import * as React from "react";
import { ErrorsFromValues, MinFormsProps } from "./MinFormsProps";

export type State<V extends object> = {
  values: V;
  errors: ErrorsFromValues<V>;
};

export class MinForms<V extends object> extends React.Component<MinFormsProps<V>, State<V>> {
  public static defaultProps: Partial<MinFormsProps<{}>> = {
    validateOnSubmit: false,
    validateOnInit: true
  };

  constructor(props: MinFormsProps<V>) {
    super(props);
    const errors = props.validateOnInit ? (props.validation ? props.validation(props.initialValues) : {}) : {};
    this.state = {
      errors,
      values: props.initialValues
    };
  }

  /**
   * Will validate values based on given `validation` - if there's any
   * @param values - values to validate
   * @return possible errors
   */
  public validate = (values: V) => {
    if (this.props.validation && !this.props.validateOnSubmit) {
      return this.props.validation(values);
    } else {
      return {};
    }
  };

  /**
   * Set value to `values`
   * @param value - which value from `values` change
   * @param newValue - to new value
   */
  private setValue: SetValue<V> = (value, newValue) => {
    const newValues: V = {
      ...(this.state.values as any),
      [value]: newValue
    };
    const errors = this.validate(newValues);
    this.setState({
      errors,
      values: newValues
    });
  };

  private onSubmit = (callback: (valuesToSubmit: V) => void) => {
    if (this.props.validation) {
      const errors = this.validate(this.state.values);
      if (Object.keys(errors).length > 0) {
        // There are errors, so don't submit this form
        this.setState({
          errors
        });
      } else {
        callback(this.state.values);
      }
    } else {
      callback(this.state.values);
    }
  };

  private handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name) {
      // Check if input attribute `name` matches any value in `this.state.values`
      if (e.target.name in this.state.values) {
        // TODO: try to remove `any` hack
        this.setValue(e.target.name as any, e.target.value);
      } else {
        throw new Error(
          `Input with a name '${
            e.target.name
          }' is emitting an onChange event using handleChange, but there's no value defined. Probably you misspelled input's name or you didn't provide correct value in initialValues`
        );
      }
    } else {
      throw new Error(
        `Input without a 'name' attribute is emitting onChange event using handleChange. Please provide a 'name' attribute to input element to match it's value from initialValues`
      );
    }
  };

  public render() {
    return this.props.render({
      errors: this.state.errors,
      handleChange: this.handleChange,
      setValue: this.setValue,
      values: this.state.values,
      onSubmit: this.onSubmit
    });
  }
}
