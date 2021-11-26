import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Input from "./LoginInput";
import Button from "./Button";
import { Formik as PoteznyForm } from "formik";
import axios from "axios";
import * as Yup from "yup";

const LoginForm = ({ navigation }) => {
  const handleSubmit = (values) => {
    const { login, password } = values;
    axios
      .post(
        "http://192.168.1.11:5000/api/login",
        {
          username: login,
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

  const LoginSchema = Yup.object().shape({
    login: Yup.string().required("To pole jest wymagane!"),
    password: Yup.string().required("To pole jest wymagane!"),
  });

  return (
    <PoteznyForm
      initialValues={{ login: "", password: "" }}
      onSubmit={(values) => handleSubmit(values)}
      validationSchema={LoginSchema}
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
});

export default LoginForm;
