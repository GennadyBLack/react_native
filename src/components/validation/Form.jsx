import React from "react";
import { useForm } from "react-hook-form";
import Input from "./Input";
import File from "./File";
import Select from "./Select";
import Upload from "./Upload";
import { View, Button, StyleSheet, Pressable, Text } from "react-native";
import s from "../../helpers/styleHelper";
import constants from "../../helpers/style";

function Form({ defaultValues, children, onSubmit, resetForm = true }) {
  const methods = useForm({ defaultValues });
  const {
    reset,
    handleSubmit,
    control,
    formState: { errors },
  } = methods;

  const wrap = async () => {
    await onSubmit();
    resetForm ? await reset({ defaultValues }) : null;
  };

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
      <Pressable onPress={handleSubmit(wrap)} style={s.button}>
        <Text style={{ color: constants.LIGHT }}>Сохранить</Text>
      </Pressable>
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
