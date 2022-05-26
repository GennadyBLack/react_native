import React from "react";
import { View } from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";

export default function FeedItem({ feed }) {
  return (
    <View>
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
      </Card>
    </View>
  );
}
