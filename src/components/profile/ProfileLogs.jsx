import React, {useEffect, useState} from 'react'
import {getFromStorage} from "../../helpers/storage";
import {Text, View} from "react-native";

export default function ProfileLogs() {
    const [visits, setVisits] = useState(null)

    useEffect(() => {
        async function getVisits() {
            const res = await getFromStorage("visits")
            console.log(res, "VISITS")
            setVisits(JSON.parse(res))
        }
        getVisits();
    }, [])

    const Visits = visits?.map(visit => (
        <View key={visit.time} style={{marginBottom: 15}}>
            <Text>Your Location: {`${visit.location.latitude}: ${visit.location.longitude}`}</Text>
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