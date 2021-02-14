import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { colors } from '../theme'
import { MenuOption } from '../types'
import ModalMenu from './ModalMenu'

const Menu = ({
    value,
    onSelectOption,
    options,
    placeholder
}: LocationsMenuProps) => {

    const [visible, setVisible] = useState(false)
    const label = options.find(option => option.value === value)?.label || placeholder

    useEffect(() => {
        if (visible) {
            setVisible(false)
        }
    }, [value])

    return (
        <View>
            <TouchableOpacity
                onPress={() => setVisible(true)}
                style={styles.button}
            >
                <Text style={styles.label}>
                    {label}
                </Text>
            </TouchableOpacity>
            <ModalMenu
                visible={visible}
                options={options}
                onDismiss={() => setVisible(false)}
                value={value}
                onSelectOption={onSelectOption}
            />
        </View>
    )
}

interface LocationsMenuProps {
    options: MenuOption[]
    value?: string
    onSelectOption: (option: string) => void
    placeholder: string
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        alignSelf: 'flex-start',
        borderWidth: 1,
        borderRadius: 16,
        margin: 8,
        marginBottom: 16,
        paddingHorizontal: 8,
        borderColor: colors.darkGray,
        backgroundColor: colors.button,
        shadowRadius: 2,
        shadowOpacity: 0.5,
        shadowOffset: {
            height: 2,
            width: 2
        },
        elevation: 2
    },
    label: {
        fontSize: 16,
        padding: 4,
        color: colors.white
    }
})
export default Menu