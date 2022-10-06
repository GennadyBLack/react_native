import React, { useState, useEffect, useReducer } from "react";
import { View } from "react-native";
import { TextInput } from "react-native-paper";
import Form from "../validation/Form";

const moc = [
  { type: "TextInput", props: { name: "name", style: { height: 30 } } },
];

export default function GridSearchComponent({
  filters,
  onChange,
  className = "",
}) {
  function reducer(state, action) {
    switch (action.type) {
      case "input":
        return { ...state, [action.field]: action.payload };
      default:
        return state;
    }
  }

  const [initialState] = useState(() => {
    const obj = {};
    Object.entries(moc).forEach(([key, value]) => {
      obj[value.props.name] = "";
    });
    return obj;
  });

  const [state, dispatch] = useReducer(reducer, initialState);
  const _renderFields = () => {
    return moc.map((item) => {
      switch (item.type) {
        case "TextInput":
          return <Form.Input {...item.props} />;
        default:
          return <Form.Input {...item.props} />;
      }
    });
  };

  console.log(state, "state");
  return (
    <View>
      <Form>{_renderFields()}</Form>
    </View>
  );
}
