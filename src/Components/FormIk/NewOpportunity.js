import React, { useState, useEffect, startTransition } from "react";
import { TextField, SelectField, NumberField } from "./FormElements";
import * as yup from "yup";
import { Formik, Form } from "formik";

let attributes = [
  {
    key: "name",
    type: "text",
    label: "Name",
    required: true,
  },
  {
    key: "email",
    type: "email",
    label: "Email",
    required: true,
  },
  {
    key: "address",
    type: "text",
    label: "Address",
    required: false,
  },
  {
    key: "role",
    type: "select",
    label: "Role",
    required: true,
    options: [
      {
        label: "Admin",
        value: "admin",
      },
      {
        label: "User",
        value: "user",
      },
      {
        label: "Employee",
        value: "employee",
      },
    ],
  },
];

const getInitialValues = (data) => {
  const values = {};
  data.map((attr) => {
    switch (startTransition.type) {
      case "text":
        values[attr?.key] = "";
        break;
      case "number":
        values[attr?.key] = 0;
        break;
      case "role":
        values[attr?.key] = "";
        break;
      default:
        values[attr?.key] = "";
    }
  });

  return values;
};

const NewOpportunity = () => {
  // useEffect(() => {
  //   validate(attributes);
  // }, [attributes]);

  let validation = yup.object({
    name: yup
      .string()
      .min(3, "Name is too Short (Minimum 3 characters required)")
      .max(30, "Name is too Long (Max 30 characters allowed)")
      .required("Required"),
    email: yup.string().email().required("Required"),
    address: yup
      .string()
      .min(10, "Address cannot be under 10 characters")
      .max(500, "Address is too long")
      .required("Required"),
    role: yup
      .string()
      .required("Required")
      .oneOf(["admin", "user", "employee"]),
    userid: yup
      .number()
      .when("role", {
        is: "admin",
        then: yup
          .number()
          .min(1, "Admin ID must be greater than 0")
          .max(10, "Admin ID must be less than 11")
          .required("Required"),
      })
      .when("role", {
        is: "user",
        then: yup
          .number()
          .min(11, "User ID must be greater than 10")
          .max(20, "User ID must be less than 21")
          .required("Required"),
      })
      .when("role", {
        is: "employee",
        then: yup
          .number()
          .min(21, "Employee ID must be greater than 20")
          .max(30, "Employee ID must be less than 31")
          .required("Required"),
      }),
  });

  const FormComponents = ({
                            name,
                            label,
                            value,
                            attributes,
                            touched,
                            setFieldValue,
                            handleChange,
                            type,
                            options,

                            // name, label, placeholder, handleChange, key
                          }) => {
    const props = {
      name: name,
      label: label,
      value: value,
      touched: touched,
      attributes: attributes,
      setFieldValue: setFieldValue,
      options: options,
      handleChange,
    };

    const fieldType = type;

    if (fieldType === "text" || fieldType === "email")
      return <TextField {...props} />;
    else if (fieldType === "select") return <SelectField {...props} />;
    else if (type === "number") return <NumberField {...props} />;
  };

  const onSubmit = (values, { setSubmitting, resetForm }) => {
    alert(JSON.stringify(values));
    setSubmitting(true);
    // resetForm();
  };

  return (
    <div className="App">
      <Formik
        enableReinitialize
        initialValues={getInitialValues(attributes)}
        validationSchema={validation}
        onSubmit={onSubmit}
      >
        {(formikProps) => {
          return (
            <Form className="needs-validation" noValidate="">
              {console.log(validation)}
              {attributes.map((obj, index) => {
                return (
                  <div key={obj?.key}>
                    <FormComponents
                      name={obj?.key}
                      label={obj?.label}
                      type={obj?.type}
                      options={obj?.options}
                      value={formikProps?.values.key}
                      attributes={attributes}
                      values={formikProps.values}
                      touched={formikProps?.touched}
                      setFieldValue={formikProps?.setFieldValue}
                      handleChange={formikProps?.handleChange}
                    />
                  </div>
                );
              })}
              <button type="submit">Submit</button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default NewOpportunity;