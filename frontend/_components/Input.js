import React from 'react'
import { TextInput, Picker, Text, StyleSheet } from 'react-native'

class Input extends React.Component {
    render() {
        const { primary, pickerTag, name, value, onChangeFn, children, ...props } = this.props

        return (
            <>
                <Text style={primary ? styles.inputLabelPrimary : styles.inputLabel}>{name}</Text>
                {pickerTag ?
                    (
                        <Picker
                            selectedValue={value}
                            onValueChange={onChangeFn}
                        >
                            {children}
                        </Picker>
                    ) : (
                        <TextInput
                            value={value}
                            onChangeText={onChangeFn}
                            style={primary ? styles.inputPrimary : styles.input}
                            {...props}
                        />
                    )
                }
            </>
        )

    }
}

export default Input

const styles = StyleSheet.create({
    inputLabelPrimary: {
        marginTop: 15,
        fontSize: 12,
        color: '#fff'
    },
    inputPrimary: {
        marginBottom: 15,
        paddingVertical: 5,
        color: '#fff',
        borderBottomColor: '#fff',
        borderBottomWidth: 2,
    },
    inputLabel: {
        color: '#000',
        marginTop: 15
    },
    input: {
        paddingVertical: 5,
        color: '#000',
        borderBottomColor: '#e3e3e3',
        borderBottomWidth: 1
    }

})