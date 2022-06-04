import React from "react";
import Switch from "../validation/Switch";

export default function MenuSwicher({ data, onChange }) {
  const mappedSwitchArray = () => {
    if (data && Array.isArray(data)) {
      return data.map((item, index) => {
        return (
          <Switch
            label={item.label}
            key={index}
            value={item.value}
            onChange={(e) => onChange(e, item.label)}
          />
        );
      });
    }
  };
  return <>{mappedSwitchArray()}</>;
}
