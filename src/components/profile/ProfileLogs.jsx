import React, {useEffect, useState} from 'react'
import {getFromStorage} from "../../helpers/storage";
import {Text, View} from "react-native";
import useStore from "../../hooks/useStore";

export default function ProfileLogs() {
    const [auth] = useStore('auth')
    const [visits, setVisits] = useState(() => auth?.user?.user?.visits)
    console.log(visits, "visits")

    const Visits = visits?.map(visit => (
        <View key={visit.time} style={{marginBottom: 15}}>
            <Text>Your Location: {`${visit.country_name}, ${visit.region}, ${visit.city}`}</Text>
            <Text>Your IP: {`${visit.ip}`}</Text>
            <Text>Your Device: {visit.device}</Text>
            <Text>Login time: {visit.time}</Text>
        </View>
))
    return (
        <View>
            {Visits}
        </View>

    )
}