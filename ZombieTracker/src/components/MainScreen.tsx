import React, { useRef, useState, useMemo } from 'react'
import { FlatList, StyleSheet, TextInput, View, Text } from 'react-native'
import useLocations from '../hooks/useLocations'
import useZombies from '../hooks/useZombies'
import { colors } from '../theme'
import { MenuOption, Zombie } from '../types'
import ZombieCountBanner from './ZombieCountBanner'
import ZombieRow from './ZombieRow'
import Menu from './Menu'
import { Provider } from 'react-native-paper'


const MainScreen = () => {

    const [searchTerm, setSearchTerm] = useState('')
    const listRef = useRef<FlatList<Zombie>>(null)
    const [selectedIds, setSelectedIds] = useState<string[]>([])
    const { zombies, fetchZombies, loading } = useZombies()
    const { locations } = useLocations()
    const [locationFilter, setLocationFilter] = useState<string>('all')
    const locationFilterOptions: MenuOption[] = [
        { value: 'all', label: 'All locations'},
        ...locations
            .map(location => ({ value: location, label: location })),
]
    const handlePress = (id: string) => {
        if (!selectedIds.includes(id)) {
            setSelectedIds([...selectedIds, id])
        } else {
            setSelectedIds(selectedIds.filter(elem => elem !== id))
        }
    }
    
    const filteredZombies = useMemo(() => {
        const lowerCaseTerm = searchTerm.toLowerCase()
        
        return zombies.filter(({ name, location }) =>
            (locationFilter === 'all' || locationFilter === location)
            && name.toLowerCase().includes(lowerCaseTerm)
        )
    }, [searchTerm, zombies, locationFilter])


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
        <Provider>
            <View style={{ flex: 1 }}>
                <ZombieCountBanner count={zombieCount} />
                <TextInput
                    style={styles.textInput}
                    value={searchTerm}
                    onChangeText={setSearchTerm}
                    placeholder={'Search by zombie name...'}
                />
                <Menu
                    options={locationFilterOptions}
                    value={locationFilter}
                    onSelectOption={setLocationFilter}
                    placeholder={'All locations'}
                />
                <FlatList
                    ref={listRef}
                    data={filteredZombies}
                    renderItem={renderZombie}
                    refreshing={loading}
                    onRefresh={() => fetchZombies()}
                    contentContainerStyle={styles.flatlistContent}
                    ListEmptyComponent={<Text style={styles.noMatchesText}>{`No matches`}</Text>}
                />
            </View>
        </Provider>
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
