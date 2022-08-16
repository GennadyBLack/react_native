import React from "react";
import { View, Button, Text } from "react-native";
import { observer } from "mobx-react-lite";
import Form from "../components/validation/Form";
import Input from "../components/validation/Input";
import File from "../components/validation/File";
import Swipe from "../components/Swipe";
import Tabulator from "../components/Tabulator";
import ModalSwipe from "../components/base/ModalSwipe";

function TestHeader() {
  return (
    <>
      <Text>Header</Text>
    </>
  );
}

export default observer(Test);

function Test({ navigation }) {
  const save = (value) => {
    console.log(value, "form form");
  };
  let tet = (e) => {};
  return (
    <View>
      {/*Form - компонент из которого в чилды типа инпута передаются пропсами эл-ты useForm типа control*/}
      <Form onSubmit={save}>
        <Input
          name="email"
          rules={{
            required: {
              value: true,
              message: "Это поле обязательно для заполнения чудик",
            },
            max: { value: 3, message: "Больше 3" },
          }}
        />
        <File name="file" />
        <Button title="<-- back" onPress={() => navigation.goBack(null)} />
        <Swipe change={(e) => tet(e)} duration={1000}>
          <View style={{ height: 400 }}>
            <Text>SWIPE ME</Text>
            <Tabulator Header={TestHeader} />
          </View>
        </Swipe>
      </Form>
      <ModalSwipe closeOnDown>
        <div>aaasdasdasd</div>
      </ModalSwipe>
    </View>
  );
}
