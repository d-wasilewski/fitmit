import React from "react";
import { View, StyleSheet } from "react-native";
import Input from "./LoginInput";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: "",
      password: "",
    };
    this.handleInputLoginChange = this.handleInputLoginChange.bind(this);
    this.handleInputPasswordChange = this.handleInputPasswordChange.bind(this);
  }

  handleInputLoginChange(e) {
    this.setState({
      login: e,
    });
    console.log(this.state.login);
  }

  handleInputPasswordChange(e) {
    this.setState({
      password: e,
    });
    console.log(this.state.password);
  }

  render() {
    return (
      <View>
        <Input
          placeholder="Username"
          onChange={this.handleInputLoginChange}
          name="login"
        ></Input>
        <Input
          placeholder="Password"
          onChange={this.handleInputPasswordChange}
          name="password"
          secureTextEntry={true}
        ></Input>
      </View>
    );
  }
}

export default LoginForm;
