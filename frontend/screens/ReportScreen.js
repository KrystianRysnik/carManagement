import React from 'react'
import { View, Text, TouchableOpacity, Button, Picker, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialIcons'
import NavigationService from '../NavigationService'
import DateTimePicker from '@react-native-community/datetimepicker'
import moment from 'moment'
import axios from 'axios'

import RNHTMLtoPDF from 'react-native-html-to-pdf'

class RouteScreen extends React.Component {
    state = {
        value: '',
        showDateStart: false,
        showDateEnd: false,
        dateStart: moment().subtract(1, 'months').toDate(),
        dateEnd: moment().toDate(),
        mode: 'date',
        show: false,
        car: ''
    }

    setDateStart = (event, date) => {
        dateStart = date || this.state.dateStart

        this.setState({
            showDateStart: Platform.OS === 'ios' ? true : false,
            dateStart,
        })
    }

    setDateEnd = (event, date) => {
        dateEnd = date || this.state.dateEnd

        this.setState({
            showDateEnd: Platform.OS === 'ios' ? true : false,
            dateEnd,
        })
    }

    async createPDF(data, car) {
        let options = {
            html: `<style>
            .border,
            .border th,
            .border td {
                border: 1px solid black;
                border-collapse: collapse;
            }
          </style>
          <table style="width: 100%;">
            <tr>
                <td style="width: 50%;">(dane podatnika)</td>
                <td style="width: 50%;">Numer rejestracyjny pojazdu: ${car.licensePlate}<br/>
            Pojemność silnika: ${car.engineSize} cm</td>
            </tr>
          </table>

          <h1 style="text-align: center; font-size: 16pt;">EWIDENCJA PRZEBIEGU POJAZDU DLA CELÓW VAT</h1>
          <h3 style="text-align: center;">od ${moment(this.state.dateStart).format('DD MMM YYYY')} do ${moment(this.state.dateEnd).format('DD MMM YYYY')}</h3>`,
            fileName: `${car.licensePlate}_${moment(this.state.dateStart).format('DD-MM-YYYY')}`,
            directory: 'Downloads',
            width: 595,
            height: 842
        }

        options.html += `<table class="border">
            <tr>
                <th>Lp</th>
                <th>Data wyjazdu</th>
                <th>Cel wyjazdu</th>
                <th>Liczba przejechanych kilometrów</th>
                <th>Imię i nazwisko osoby kierującej</th>
            </tr>`

        let i = 1
        for (let item of data) {
            options.html += `<tr>
                <td>${i}</td>
                <td>${moment(item.startTrace).format('DD.MM.YYYY')}</td>
                <td>${item.purpose}</td>
                <td>${item.distance.toFixed(2)}</td>
                <td>${item.driver.firstName} ${item.driver.lastName}</td>
            </tr>`
            i++
        }


        options.html += `</table>`

        let file = await RNHTMLtoPDF.convert(options)
        // console.log(file.filePath);
        alert(file.filePath)
    }

    getReport = (car) => {
        axios.post('https://car-management-backend.herokuapp.com/route/report', {
            dateStart: this.state.dateStart,
            dateEnd: this.state.dateEnd,
            licensePlate: car.licensePlate,
            vin: car.vin
        })
            .then(res => {
                console.log('🟢 File Downloaded Succesfull!')
                this.createPDF(res.data, car)
            })
            .catch(error => {
                console.log('🔴 File Downloaded Error!')
                console.log(error)
            })
    }

    handleBack = () => {
        NavigationService.goBack()
    }

    handleSubmit = () => {
        this.props.cars.forEach(element => {
            if (element.vin == this.state.car) {
                let car = {
                    vin: element.vin,
                    licensePlate: element.licensePlate,
                    engineSize: element.engineSize
                }
                this.getReport(car)
            }
        })
    }

    render() {
        const { dateStart, dateEnd, mode, showDateStart, showDateEnd, car } = this.state

        let carsList =
            this.props.cars.map((item, index) => {
                return (<Picker.Item label={`${item.licensePlate} - ${item.name}`} key={item.vin} value={item.vin} />)
            })

        return (
            <View style={{ flex: 1 }}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.headerTouchable} onPress={this.handleBack}>
                        <Icon name='keyboard-backspace' size={24} color='#000' />
                        <Text style={styles.headerTitle}>Generowanie Raportu</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, padding: 20 }}>
                    <Text>Wybierz samochód:</Text>
                    <Picker
                        selectedValue={car}
                        style={{ height: 37 }}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({ car: itemValue })
                        }>
                        {carsList}
                    </Picker>
                    <View style={styles.separator}></View>
                    <Text>Wybierz datę początkową:</Text>
                    <TouchableOpacity onPress={() => this.setState({ showDateStart: true })}>
                        <Text style={{ padding: 8, fontSize: 16 }}>{moment(dateStart).format('DD/MM/YYYY')}</Text>
                    </TouchableOpacity>
                    <View style={styles.separator}></View>
                    <Text>Wybierz datę końcową:</Text>
                    <TouchableOpacity onPress={() => this.setState({ showDateEnd: true })}>
                        <Text style={{ padding: 8, marginBottom: 6, fontSize: 16 }}>{moment(dateEnd).format('DD/MM/YYYY')}</Text>
                    </TouchableOpacity>
                    <Button title='Generuj raport' onPress={this.handleSubmit} />
                </View>
                {showDateStart && <DateTimePicker value={dateStart}
                    mode={mode}
                    display="default"
                    onChange={this.setDateStart} />
                }
                {showDateEnd && <DateTimePicker value={dateEnd}
                    mode={mode}
                    display="default"
                    onChange={this.setDateEnd} />
                }
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        cars: state.car.cars
    }
}

export default connect(mapStateToProps)(RouteScreen)

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e3e3e3',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    headerTouchable: {
        paddingHorizontal: 10,
        height: 45,
        flexDirection: 'row',
        alignItems: 'center'
    },
    headerTitle: {
        marginLeft: 15,
        fontWeight: 'bold'
    },
    separator: {
        marginVertical: 8,
        width: '100%',
        height: 1,
        backgroundColor: '#b6b6b6'
    }
})