import React from "react";
import { View, StyleSheet, Text } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Input from "./LoginInput";
import Button from "./shared/Button";
import { Formik as PoteznyForm } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";

import { loginUser } from "../redux/actions/userActions";

const LoginForm = ({ navigation }) => {
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    dispatch(loginUser(values));

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
          <View style={styles.checkbox}>
            <BouncyCheckbox
              size={25}
              fillColor="#6BF300"
              textStyle={styles.text}
              text="Don't logout"
              // onPress={(isChecked) => {}}
            />
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
  },
});

export default LoginForm;
