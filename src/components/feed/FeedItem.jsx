import React from "react";
import { View, StyleSheet } from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";

export default function FeedItem({ feed }) {
  return (
    <View style={styles.item}>
      <Card>
        {/* <Card.Title
          title="Card Title"
          subtitle="Card Subtitle"
          left={feed.title}
        /> */}
        <Card.Content>
          <Title>{feed?.title}</Title>
          <Paragraph>{feed?.desc}</Paragraph>
        </Card.Content>
        <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
        {/*<Card.Cover source={{ uri: feed?.path }} /> Not allowed to load local resource // https://stackoverflow.com/questions/39007243/cannot-open-local-file-chrome-not-allowed-to-load-local-resource*/}
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    width: "90%",
    marginHorizontal: "5%",
    marginVertical: "1%",
  },
});
