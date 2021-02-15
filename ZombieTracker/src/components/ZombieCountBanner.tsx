import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { ZombieCount } from '../types'

const ZombieCountBanner = ({ count }: ZombieCountBannerProps) => {
    return (
        <View>
            <Text style={styles.title}>
                {`Zombie Count`}
            </Text>
            <ScrollView
                horizontal
                style={styles.scroll}
                contentContainerStyle={styles.scrollContainer}
            >
                {Object.entries(count).map(([key, val]) => 
                    <View key={`count-${key}`} style={styles.countItem}>
                        <Text>
                            {key}
                        </Text>
                        <Text>
                            {val}
                        </Text>
                    </View>
                )}
            </ScrollView>    
        </View>
    )
}

interface ZombieCountBannerProps {
    count: ZombieCount
}

const styles = StyleSheet.create({
    scroll: {
        alignSelf: 'center' 
    },
    scrollContainer: {
        paddingHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'center',
        margin: 8 
    },
    title: {
        marginTop: 16,
        fontSize: 32,
        textAlign: 'center'
    },
    countItem: {
        padding: 8,
        alignItems: 'center'
    }
})

export default ZombieCountBanner
