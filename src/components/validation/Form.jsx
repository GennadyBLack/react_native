import React from "react";
import { useForm } from "react-hook-form";
import Input from "./Input";
import File from "./File";
import Select from "./Select";
import Upload from "./Upload";
import { View, Button, StyleSheet } from "react-native";

function Form({ defaultValues, children, onSubmit }) {
  const methods = useForm({ defaultValues });
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = methods;
  return (
    <View style={styles.form}>
      {React.Children.map(children, (child) => {
        return child.props.name
          ? React.createElement(child.type, {
              ...{
                ...child.props,
                control: control,
                key: child.props.name,
                errors: errors[child.props.name],
              },
            })
          : child;
      })}
      <Button title="save" onPress={handleSubmit(onSubmit)}></Button>
    </View>
  );
}
Form.Input = Input;
Form.Select = Select;
Form.Upload = Upload;
Form.File = File;

export default Form;

const styles = StyleSheet.create({
  form: {
    width: "90%",
    margin: "5%",
    paddingTop: 5,
  },
});
