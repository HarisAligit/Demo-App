import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

let flag = false;

function FormikForm(props) {
  return (
    <Formik {...props}>
      <Form className="needs-validation" noValidate="">
        {props.children}
      </Form>
    </Formik>
  );
}

function NumberField(props) {
  const { name, value, label, placeholder, handleChange } = props;
  return (
    <div>
      {label && <label htmlFor={name}>{label}</label>}
      <Field
        type="number"
        name={name}
        id={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder || ""}
      />
      <ErrorMessage
        name={name}
        render={(msg) => <div style={{ color: "red" }}>{msg}</div>}
      />
    </div>
  );
}

function TextField(props) {
  const { name, value, label, placeholder, handleChange } = props;
  return (
    <div>
      {label && <label htmlFor={name}>{label}</label>}
      <Field
        type="text"
        name={name}
        id={name}
        onChange={handleChange}
        value={value}
        placeholder={placeholder || ""}
      />
      <ErrorMessage
        name={name}
        render={(msg) => <div style={{ color: "red" }}>{msg}</div>}
      />
    </div>
  );
}

const addInput = (e, field, attributes, values, setFieldValue) => {
  if (!flag) {
    attributes.push({
      key: `userid`,
      type: "number",
      usertype: `${e.target.value}`,
      label: `${e.target.value} id: `,
      required: true,
    });
    flag = true;
    setFieldValue("userid", "", true);
  } else {
    const len = attributes.length;
    attributes[len - 1].label = `${e.target.value} id: `;
    attributes[len - 1].usertype = `${e.target.value}`;
    console.log("\nUser Type", attributes);
    setFieldValue("userid", "", true);
  }
  field.onChange(e);
};

function SelectField(props) {
  const { name, label, options, attributes, values, setFieldValue } = props;
  return (
    <div>
      {label && <label htmlFor={name}>{label}</label>}
      <Field as="select" id={name} name={name}>
        {({ field }) => (
          <select
            {...field}
            onChange={(e) =>
              addInput(e, field, attributes, values, setFieldValue)
            }
          >
            <option value="">Choose...</option>
            {options.map((opt, index) => (
              <option
                key={index}
                value={opt.value}
                label={opt.label || opt.value}
              />
            ))}
          </select>
        )}
      </Field>
      <ErrorMessage
        name={name}
        render={(msg) => <div style={{ color: "red" }}>{msg}</div>}
      />
    </div>
  );
}

export { SelectField, NumberField, TextField, FormikForm };