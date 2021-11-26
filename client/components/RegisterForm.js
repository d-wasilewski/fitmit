import React, { useState } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import Input from "./LoginInput";
import Button from "./Button";
import { Formik as PoteznyForm } from "formik";
import axios from "axios";

const RegisterForm = () => {
  const handleSubmit = (values) => {
    const { login, password, email } = values;
    axios
      .post(
        "http://192.168.1.11:5000/api/register",
        {
          username: login,
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    console.log(values);

    // TODO: nawigacja po kliknieciu i walidacji
  };

  return (
    <PoteznyForm
      initialValues={{ login: "", password: "", email: "" }}
      onSubmit={(values) => handleSubmit(values)}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <View>
          {/* TODO: dodac onblur */}
          <Input
            placeholder="Login"
            onChange={handleChange("login")}
            // value={values.register}
            name="login"
          />
          <Input
            placeholder="Email"
            onChange={handleChange("email")}
            // value={values.register}
            name="email"
          />
          <Input
            placeholder="Password"
            onChange={handleChange("password")}
            // value={values.register}
            name="password"
            secureTextEntry={true}
          />
          <Button secondary onPress={handleSubmit} title={"Login"} />
        </View>
      )}
    </PoteznyForm>
  );
};

export default RegisterForm;
