import React, { useRef, useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import useLocations from '../hooks/useLocations'
import useZombies from '../hooks/useZombies'
import { colors } from '../theme'
import { Zombie } from '../types'
import ZombieCountBanner from './ZombieCountBanner'
import ZombieRow from './ZombieRow'


const MainScreen = () => {

    const listRef = useRef<FlatList<Zombie>>(null)
    const [selectedIds, setSelectedIds] = useState<string[]>([])
    const { zombies, fetchZombies, loading } = useZombies()
    const { locations } = useLocations()


    const handlePress = (id: string) => {
        if (!selectedIds.includes(id)) {
            setSelectedIds([...selectedIds, id])
        } else {
            setSelectedIds(selectedIds.filter(elem => elem !== id))
        }
    }

    const initialCount = locations.reduce((accum, location) => {
        accum[location] = 0
        return accum
    }, {} as any)

    const zombieCount = zombies.reduce((count, zombie) => {
        const currentCount = count[zombie.location] || 0
        count[zombie.location] = currentCount + 1
        return count
    }, initialCount)

    const renderZombie = ({ item }: { item: Zombie }) => 
        <ZombieRow {...item} selected={selectedIds.includes(item.id)} onPress={handlePress} />


    return (
        <View style={{ flex: 1 }}>
            <ZombieCountBanner count={zombieCount} />
            <FlatList
                ref={listRef}
                data={zombies}
                renderItem={renderZombie}
                refreshing={loading}
                onRefresh={() => fetchZombies()}
                contentContainerStyle={styles.flatlistContent}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    flatlistContent: {
        backgroundColor: colors.lightGray,
        paddingVertical: 1,
    },
    textInput: {
        marginHorizontal: 8,
        borderColor: colors.darkGray,
        borderWidth: 1,
        backgroundColor: colors.lightGray,
        borderRadius: 4,
        paddingHorizontal: 4,
        paddingVertical: 8,
        marginTop: 16,
        marginBottom: 8
    },
    footer: {
        margin: 4,
        backgroundColor: colors.white,
        paddingBottom: 16,
        shadowRadius: 4,
        shadowOpacity: 0.5,
        shadowOffset: {
            height: 4,
            width: 0
        },
        elevation: 4
    },
    noMatchesText: {
        backgroundColor: colors.white,
        textAlign: 'center',
        padding: 64
    }
})

export default MainScreen
