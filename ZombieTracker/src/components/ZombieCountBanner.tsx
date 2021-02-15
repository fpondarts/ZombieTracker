import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { ZombieCount } from '../types'

const ZombieCountBanner = ({ count }: ZombieCountBannerProps) => {
    return (
        <View>
            <Text style={styles.title}>
                {`Zombie Count`}
            </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', margin: 8 }}>
                {Object.entries(count).map(([key, val]) => 
                    <View key={`count-${key}`} style={{ padding: 8, alignItems: 'center' }}>
                        <Text>
                            {key}
                        </Text>
                        <Text>
                            {val}
                        </Text>
                    </View>
                )}
            </View>    
        </View>
    )
}

interface ZombieCountBannerProps {
    count: ZombieCount
}

const styles = StyleSheet.create({
    title: {
        marginTop: 16,
        fontSize: 32,
        textAlign: 'center'
    }
})

export default ZombieCountBanner
