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
        "http://192.168.100.147:5000/api/register",
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
        <View style={styles.form}>
          {/* TODO: dodac onblur */}
          <View style={styles.input} >
            <Input
              placeholder="Login"
              onChange={handleChange("login")}
              // value={values.register}
              name="login"
            />
          </View>
          <View style={styles.input} >
            <Input
              placeholder="Email"
              onChange={handleChange("email")}
              // value={values.register}
              name="email"
            />
          </View>
          <View style={styles.input} >
            <Input
              placeholder="Password"
              onChange={handleChange("password")}
              // value={values.register}
              name="password"
              secureTextEntry={true}
            />
          </View>
          <View style={styles.primmary_button}>
            <Button onPress={handleSubmit} title={"Login"} />
          </View>
        </View>
      )}
    </PoteznyForm>
  );
};

const styles = StyleSheet.create({
  form: {
    height: "100%",
    width: "100%",
    justifyContent: "flex-end"
  },
  primmary_button: {
    height: "6%",
    width: "100%",
    marginTop: "30%"  // Podnosi inputy do góry
  },
  input: {
    marginBottom: "10%", // Zwieksza przerwy miedzy inputami
  }
})
export default RegisterForm;
