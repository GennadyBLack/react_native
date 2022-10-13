import 'React' from 'react'
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  Pressable,
  Text,
} from "react-native";
export default ProfileEditForm() {

return (
   <ScrollView
        nativeID={"spisok-pipisok"}
        style={{ flex: 1 }}
        scrollEventThrottle={16}
      >
        <Form onSubmit={submit} defaultValues={user} resetForm={false}>
          <Form.Input
            name="username"
            mode="outlined"
            rules={{
              required: {
                value: true,
                message: "Это поле обязательно для заполнения чудик",
              },
              max: { value: 3, message: "Больше 3" },
            }}
          />
          <Form.Input
            name="description"
            mode="outlined"
            multiline
            rules={{
              required: {
                value: true,
                message: "Это поле обязательно для заполнения чудик",
              },
            }}
          />
          <Form.File name="avatar" title="Загрузить фото профиля" />
          <Switch />
        </Form>
      </ScrollView>
     )
}
