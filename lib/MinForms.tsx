import * as React from "react";
import { ErrorsFromValues, MinFormsProps, SetValue } from "./MinFormsProps";

export type State<V extends object, E> = {
  values: V;
  errors: ErrorsFromValues<V, E>;
};

export class MinForms<Values extends object, ErrorType = string> extends React.Component<
  MinFormsProps<Values, ErrorType>,
  State<Values, ErrorType>
> {
  public static defaultProps: Partial<MinFormsProps<object, object>> = {
    validateOnSubmit: false,
    validateOnInit: true
  };

  constructor(props: MinFormsProps<Values, ErrorType>) {
    super(props);
    const errors = props.validateOnInit ? (props.validation ? props.validation(props.initialValues) : {}) : {};
    this.state = {
      errors,
      values: props.initialValues
    };
  }

  componentWillReceiveProps(nextProps: MinFormsProps<Values, ErrorType>) {
    if (this.props.onValuesChange && nextProps.values) {
      this.setState({
        values: {
          ...(this.state.values as any),
          ...(this.props.onValuesChange(this.state.values, nextProps.values) as any)
        }
      });
    }
  }

  /**
   * Will validate values based on given `validation` - if there's any
   * @param values - values to validate
   * @return possible errors
   */
  public validate = (values: Values) => {
    if (this.props.validation && !this.props.validateOnSubmit) {
      return this.props.validation(values);
    } else {
      return {};
    }
  };

  /**
   * Set value to `values`
   * @desc Use this function to change initialValues, after setting a new value, it'll validate and re-render MinForms
   * @param value - which value from `values` change
   * @param newValue - to new value
   */
  private setValue: SetValue<Values> = (value, newValue) => {
    const newValues: Values = {
      ...(this.state.values as any),
      [value]: newValue
    };
    const errors = this.validate(newValues);
    this.setState({
      errors,
      values: newValues
    });
  };

  private onSubmit = (callback: (valuesToSubmit: Values) => void) => {
    // Has validation ?
    if (this.props.validation) {
      const errors = this.validate(this.state.values);
      // Is there any errors ?
      if (Object.keys(errors).length > 0) {
        // There are errors, so don't submit this Form
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

  /**
   * @param e - Event emitted from an input element
   */
  private handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Has input `name` attribute ?
    if (e.target.name) {
      // Check if input attribute `name` matches any value in `this.state.values`
      if (e.target.name in this.state.values) {
        this.setValue(e.target.name as any, e.target.value as any);
      } else {
        throw new Error(
          `Error during 'handleChange': <${e.target.tagName}> with a name '${
            e.target.name
          }' doesn't exists in initialValues. Probably you misspelled input's name or you didn't provide a correct value in initialValues`
        );
      }
    } else {
      throw new Error(
        `Error during 'handleChange': Element <${
          e.target.tagName
        }> has no 'name' attribute and it is emitting 'onChange' event. Please provide a correct 'name' attribute to your <${
          e.target.tagName
        }> element to match it's 'value' from initialValues`
      );
    }
  };

  public render() {
    return this.props.render({
      errors: this.state.errors,
      handleChange: this.handleChange,
      setValue: this.setValue,
      values: this.state.values,
      submit: this.onSubmit
    });
  }
}
