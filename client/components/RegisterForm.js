import React, { useState } from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Input from "./LoginInput";
import Button from "./shared/Button";
import { Formik as PoteznyForm } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { registerUser } from "../redux/actions/userActions";
import ModalTermsOfService from "./homepage/cards/modal/ModalTermsOfService";

const RegisterForm = ({ navigation }) => {
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    dispatch(registerUser(values, navigation));
  };

  const [isTermsOfServiceModalVisible, setTermsOfServiceModalVisible] =
    useState(false);

  const SignupSchema = Yup.object().shape({
    login: Yup.string()
      .min(4, "Login nie może mieć mniej niż 4 znaki!")
      .max(20, "Login nie może mieć więcej niż 20 znaków!")
      .required("To pole jest wymagane!"),
    password: Yup.string()
      .min(4, "Hasło nie może mieć mniej niż 4 znaki!")
      .max(20, "Hasło nie może mieć więcej niż 20 znaków!")
      .required("To pole jest wymagane!"),
    confirmPassword: Yup.string()
      .min(4, "Hasło nie może mieć mniej niż 4 znaki!")
      .max(20, "Hasło nie może mieć więcej niż 20 znaków!")
      .required("To pole jest wymagane!"),
    email: Yup.string()
      .email("Niepoprawny email")
      .required("To pole jest wymagane!"),
  });

  return (
    <PoteznyForm
      initialValues={{
        login: "",
        password: "",
        confirmPassword: "",
        email: "",
      }}
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
          <View style={styles.input}>
            <Input
              placeholder="Confirm password"
              onChange={handleChange("confirmPassword")}
              // value={values.register}
              name="confirmPassword"
              secureTextEntry={true}
            />
          </View>
          {errors.confirmPassword && touched.confirmPassword ? (
            <Text style={styles.error}>{errors.confirmPassword}</Text>
          ) : null}
          <View style={styles.checkbox}>
            <BouncyCheckbox
              size={25}
              fillColor="#6BF300"
              textStyle={styles.text}
              text="I accept "
              // onPress={(isChecked) => {}}
            />
            <Pressable
              onPress={() =>
                setTermsOfServiceModalVisible(!isTermsOfServiceModalVisible)
              }
            >
              <Text
                style={[
                  styles.text,
                  {
                    fontFamily: "RobotoMedium",
                    textDecorationLine: "underline",
                  },
                ]}
              >
                terms of service
              </Text>
            </Pressable>
          </View>
          <View style={styles.primmary_button}>
            <Button onPress={handleSubmit} title={"Register"} />
          </View>
          <ModalTermsOfService
            visible={isTermsOfServiceModalVisible}
            title="Terms Of Service"
            onQuit={() =>
              setTermsOfServiceModalVisible(!isTermsOfServiceModalVisible)
            }
          />
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
    marginTop: "26%", // Podnosi inputy do góry
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
    marginTop: 0,
    flexDirection: "row",
    justifyContent: "center",
  },
  text: {
    color: "#f0f0f0",
    textDecorationLine: "none",
    fontFamily: "RobotoRegular",
    fontSize: 15,
  },
});
export default RegisterForm;
