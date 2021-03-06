import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, ToastAndroid } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Input from "./LoginInput";
import Button from "./shared/Button";
import { Formik as PoteznyForm } from "formik";
import Toast from "react-native-toast-message";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";

import { loginUser } from "../redux/actions/userActions";
import { CLEAR_ERROR } from "../redux/types";

const LoginForm = ({ navigation }) => {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.user);
  const [checkboxState, setCheckboxState] = useState(false);

  const handleSubmit = (values) => {
    values.checkboxState = checkboxState;
    dispatch(loginUser(values, navigation));
  };

  useEffect(() => {
    if (error != null) {
      ToastAndroid.show(error, ToastAndroid.SHORT);
      dispatch({ type: CLEAR_ERROR });
    }
  }, [error]);

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
              isChecked={checkboxState}
              onPress={() => {
                setCheckboxState(!checkboxState);
              }}
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
    marginTop: "30%", // Podnosi inputy do g??ry
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
