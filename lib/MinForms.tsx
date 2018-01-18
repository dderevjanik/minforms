import * as React from "react";

export type ErrorsFromValues<V extends object> = {[ErrorValue in keyof V]?: string };

export type SetValue<V extends object> = (
    value: keyof V,
    newValue: V[keyof V],
) => void;

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
}

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

    /**
     * Should autobind input values by Id to initial values and changed them onChange ?
     */
    autoBind?: boolean;
}

export type State<V extends object> = {
    values: V;
    errors: ErrorsFromValues<V>;
}

export class MinForms<V extends object> extends React.Component<
    MinFormsProps<V>,
    State<V>
    > {
    constructor(props: MinFormsProps<V>) {
        super(props);
        const errors = props.validateOnInit
            ? props.validation ? props.validation(props.initialValues) : {}
            : {};
        this.state = {
            errors,
            values: props.initialValues,
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
    }

    /**
     * Set value to `values`
     * @param value - which value from `values` change
     * @param newValue - to new value
     */
    private setValue: SetValue<V> = (value, newValue) => {
        const newValues: V = {
            ...(this.state.values as any),
            [value]: newValue,
        };
        const errors = this.validate(newValues);
        this.setState({
            errors,
            values: newValues,
        });
    }

    private handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.name) {
            if (e.target.name in this.state.values) {
                // TODO: try to remove `any` hack
                this.setValue(e.target.name as any, e.target.value);
            } else {
                throw new Error(`Input with a name '${e.target.name}' is emitting a change event, but there's no value defined`);
            }
        } else {
            throw new Error('Input without a name is emitting change event');
        }
    };

    public render() {
        return this.props.render({
            errors: this.state.errors,
            handleChange: this.handleChange,
            setValue: this.setValue,
            values: this.state.values,
        });
    }
}
