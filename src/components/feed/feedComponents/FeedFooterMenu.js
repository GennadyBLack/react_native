import {Pressable, Text, View, StyleSheet} from "react-native";
import React from "react";

const FeedFooterMenu = () => {
    const menu = [
        { title: "Like", onPress: () => {}, icon: "" },
        { title: "Comments", onPress: () => {}, icon: "" },
        { title: "Share", onPress: () => {}, icon: "" },
    ];

    return ( <View style={styles.feed_footer}>
        {menu.map((item) => (
            <Pressable onPress={item.onPress} key={item.title}>
                <View>
                    <Text>{item.title}</Text>
                </View>
            </Pressable>
        ))}
    </View>)

};


const styles = StyleSheet.create({
    feed_footer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
})

export default FeedFooterMenu