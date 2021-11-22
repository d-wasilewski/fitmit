import React from "react"
import { TextInput, View, StyleSheet } from "react-native"
import fonts from "../styles/fonts"
import inputs from "../styles/inputs"


const Input = (props) => {
    console.log(props.placeholder)
    return <TextInput style={[style.input], inputs.underlined} {...props}>

    </TextInput>
}


const style = StyleSheet.create({
    input: {
        width: '30%',
        color: '#c0c0c0',
        textAlign: "center",
    }
})

export default Input
