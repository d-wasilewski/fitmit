import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import ModalInput from "../../shared/ModalInput";
import { Formik as PoteznyForm } from "formik";
import * as Yup from "yup";
import Button from "../../shared/Button";
import { useSelector, useDispatch } from "react-redux";
import { createGroup, getGroups } from "../../../redux/actions/groupActions";

const AddGroupForm = ({ setModal }) => {
  const { _id: userId } = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    dispatch(createGroup(userId, values.name));
    setModal(false);
  };

  const InputSchema = Yup.object().shape({
    name: Yup.string()
      .required("To pole jest wymagane!")
      .min(4, "Login nie może mieć mniej niż 4 znaki!")
      .max(20, "Login nie może mieć więcej niż 20 znaków!"),
  });

  return (
    <PoteznyForm
      initialValues={{ name: "" }}
      onSubmit={(values) => handleSubmit(values)}
      validationSchema={InputSchema}
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
          <View style={styles.input}>
            <ModalInput
              placeholder="Name"
              onChange={handleChange("name")}
              name="name"
            />
          </View>
          {errors.name && touched.name ? (
            <Text style={styles.error}>{errors.name}</Text>
          ) : null}

          <View style={styles.button}>
            <Button onPress={handleSubmit} title={"Submit"} />
          </View>
        </View>
      )}
    </PoteznyForm>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 40,
    width: "100%",
    marginTop: "10%",
  },
  form: {
    height: "80%",
    width: "95%",
    justifyContent: "center",
  },

  error: {
    color: "red",
    textAlign: "center",
  },
  text: {
    color: "#f0f0f0",
    textDecorationLine: "none",
  },
});

export default AddGroupForm;
