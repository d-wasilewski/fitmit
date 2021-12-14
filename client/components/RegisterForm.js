import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Input from "./LoginInput";
import Button from "./Button";
import { Formik as PoteznyForm } from "formik";
import axios from "axios";
import * as Yup from "yup";

const RegisterForm = ({ navigation }) => {
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
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
    console.log(values);

    navigation.navigate("Home");
  };

  const SignupSchema = Yup.object().shape({
    login: Yup.string()
      .min(4, "Login nie może mieć mniej niż 4 znaki!")
      .max(20, "Login nie może mieć więcej niż 20 znaków!")
      .required("To pole jest wymagane!"),
    password: Yup.string()
      .min(4, "Hasło nie może mieć mniej niż 4 znaki!")
      .max(20, "Hasło nie może mieć więcej niż 20 znaków!")
      .required("To pole jest wymagane!"),
    email: Yup.string()
      .email("Niepoprawny email")
      .required("To pole jest wymagane!"),
  });

  return (
    <PoteznyForm
      initialValues={{ login: "", password: "", email: "" }}
      onSubmit={(values) => handleSubmit(values)}
      validationSchema={SignupSchema}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
      }) => (
        <View style={styles.form}>
          {/* TODO: dodac onblur */}
          <View style={styles.input}>
            <Input
              placeholder="Login"
              onChange={handleChange("login")}
              // value={values.register}
              name="login"
            />
          </View>
          {errors.login && touched.login ? (
            <Text style={styles.error}>{errors.login}</Text>
          ) : null}
          <View style={styles.input}>
            <Input
              placeholder="Email"
              onChange={handleChange("email")}
              // value={values.register}
              name="email"
            />
          </View>
          {errors.email && touched.email ? (
            <Text style={styles.error}>{errors.email}</Text>
          ) : null}
          <View style={styles.input}>
            <Input
              placeholder="Password"
              onChange={handleChange("password")}
              // value={values.register}
              name="password"
              secureTextEntry={true}
            />
          </View>
          {errors.password && touched.password ? (
            <Text style={styles.error}>{errors.password}</Text>
          ) : null}
          <View style={styles.checkbox}>
            <BouncyCheckbox 
              size={25} 
              fillColor="#6BF300"
              textStyle={styles.text}
              text="I accept regulamin" 
              // onPress={(isChecked) => {}}
            />
          </View>
          <View style={styles.primmary_button}>
            <Button onPress={handleSubmit} title={"Register"} />
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
    justifyContent: "flex-end",
  },
  primmary_button: {
    height: "6%",
    width: "100%",
    marginTop: "30%", // Podnosi inputy do góry
  },
  input: {
    marginBottom: "10%", // Zwieksza przerwy miedzy inputami
  },
  error: {
    color: "red",
    textAlign: "center",
  },
  checkbox: {
    color: "#f0f0f0",
    alignItems: "center",
    marginTop: "10%",
  },
  text: {
    color: "#f0f0f0",
    textDecorationLine: "none",
  }
});
export default RegisterForm;
