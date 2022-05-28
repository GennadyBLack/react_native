import React from "react";
import { useForm } from "react-hook-form";
import { View, Button, StyleSheet } from "react-native";

export default function Form({ defaultValues, children, onSubmit }) {
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

const styles = StyleSheet.create({
  form: {
    width: "90%",
    margin: "5%",
    paddingTop: 5,
  },
});
