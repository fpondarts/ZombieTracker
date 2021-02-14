import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { MenuOption } from '../types'
import { Modal, Portal } from 'react-native-paper'
import { colors } from '../theme'

const ModalMenu = ({
    value,
    options,
    onSelectOption,
    visible,
    onDismiss
}: ModalMenuProps) => {
    return (
        <Portal>
            <Modal
                visible={visible}
                dismissable
                onDismiss={onDismiss}
            >
            <View style={styles.modalView}>
                    <TouchableOpacity onPress={onDismiss} style={{ alignSelf: 'flex-end' }}>
                        <Text style={{ textDecorationLine: "underline" }}>Close</Text>
                    </TouchableOpacity>
                    <View style={{ paddingRight: 64 }}>
                        {options.map((option) =>
                        <TouchableOpacity 
                            key={`option-${option.value}`}
                            onPress={() => onSelectOption(option.value)}
                            style={[
                                styles.optionRow, 
                                option.value === value ? styles.selected : {}
                            ]}
                        >
                            <Text
                                style={styles.locationText}
                            >
                                {option.label}
                            </Text>
                        </TouchableOpacity>
                        )}
                    </View>
                </View>
            </Modal>
        </Portal>
    )
}

interface ModalMenuProps {
    value?: string,
    options: MenuOption[],
    onSelectOption: (value: string) => void
    visible: boolean
    onDismiss: () => void
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        padding: 16,
        paddingRight: 16,
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      optionRow: {
          padding: 4,
          alignSelf: 'flex-start'
      },
      selected: {
          backgroundColor: colors.selected
      },
      locationText: {
          textAlign: 'left',
          alignSelf: 'flex-start',
          fontSize: 24
      }
})

export default ModalMenu
