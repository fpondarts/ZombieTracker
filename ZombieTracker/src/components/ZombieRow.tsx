import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { colors } from '../theme'

const ZombieRow = ({ id, name, location, selected, onPress }: ZombieRowProps) => {
    return (
        <>
        <TouchableOpacity
            style={[styles.container, selected ? styles.selected : {} ]}
            onPress={() => onPress(id)}
        >
            <Text>{`Id: ${id}`}</Text>
            <Text>{`Name: ${name}`}</Text>
            <Text>{`Location: ${location}`}</Text>
        </TouchableOpacity>
        </>
    )
}

interface ZombieRowProps {
    id: string,
    name: string,
    location: string,
    selected: boolean,
    onPress: (id: string) => void
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 4,
        paddingLeft: 32,
        marginBottom: 4,
        padding: 8,
        backgroundColor: colors.white,
        shadowRadius: 1,
        shadowOpacity: 0.2,
        shadowOffset: {
            height: 2,
            width: 1
        },
        elevation: 2
    },
    selected: {
        backgroundColor: colors.selected
    }
})

export default ZombieRow
