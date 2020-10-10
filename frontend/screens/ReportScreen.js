import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Button,
  Picker,
  ToastAndroid,
  Platform,
  StyleSheet,
} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import PropTypes from 'prop-types';
import NavigationService from '../NavigationService';
import instance from '../settings';
import Input from '../_components/Input';

const style = `<style>
.v100 {
    width: 100%;
}
th {
    text-align: center;
}
.border,
.border th,
.border td {
    border: 1px solid black;
    border-collapse: collapse;
}
th, td {
    padding: 5px;
}
</style>`;

class ReportScreen extends React.Component {
  state = {
    showDateStart: false,
    showDateEnd: false,
    dateStart: moment().subtract(1, 'months').toDate(),
    dateEnd: moment().toDate(),
    mode: 'date',
    error: false,
    car: '',
    isProcessing: false,
  };

  setDateStart = (event, date) => {
    this.setState((prevProps) => ({
      showDateStart: Platform.OS === 'ios',
      dateStart: date || prevProps.dateStart,
    }));
  };

  setDateEnd = (event, date) => {
    this.setState((prevProps) => ({
      showDateEnd: Platform.OS === 'ios',
      dateEnd: date || prevProps.dateEnd,
    }));
  };

  newToast = (message, interval = ToastAndroid.SHORT) => {
    ToastAndroid.showWithGravityAndOffset(
      `${message}`,
      interval,
      ToastAndroid.BOTTOM,
      0,
      50
    );
    this.setState({isProcessing: false});
  };

  getReport = (car) => {
    instance
      .post(
        '/route/report',
        {
          dateStart: this.state.dateStart,
          dateEnd: this.state.dateEnd,
          licensePlate: car.licensePlate,
          vin: car.vin,
        },
        {
          headers: {Authorization: `Bearer ${this.props.token}`},
        }
      )
      .then((res) => {
        this.setState({error: false});
        this.createPDF(res.data, car);
      })
      .catch((error) => {
        this.setState({error: true});
        this.createPDF({}, car);
        console.log(error);
      });
  };

  handleBack = () => {
    NavigationService.goBack();
  };

  handleSubmit = () => {
    let find = false;
    this.setState({isProcessing: true});
    this.props.cars.forEach((element) => {
      const {vin, licensePlate, engineSize} = element;
      if (vin === this.state.car) {
        const car = {
          vin,
          licensePlate,
          engineSize,
        };
        this.getReport(car);
        find = true;
      }
    });
    if (!find) {
      this.newToast('Wystąpił błąd!');
    }
  };

  async createPDF(data, car) {
    if (this.state.error) {
      this.newToast('Wystąpił błąd!');
    } else {
      const options = {
        html: `${style}
          <table class="v100">
            <tr>
                <td style="width: 50%;">(dane podatnika)</td>
                <td style="width: 50%;">Numer rejestracyjny pojazdu: ${
                  car.licensePlate
                }<br/>
            Pojemność silnika: ${car.engineSize} cm</td>
            </tr>
          </table>
          <h1 style="text-align: center; font-size: 16pt;">EWIDENCJA PRZEBIEGU POJAZDU</h1>
          <h3 style="text-align: center;">od ${moment(
            this.state.dateStart
          ).format('DD.MM.YYYY')}
          do ${moment(this.state.dateEnd).format('DD.MM.YYYY')}</h3>`,
        fileName: `${car.licensePlate}_${moment(this.state.dateStart).format(
          'DD-MM-YYYY'
        )}`,
        directory: 'Downloads',
        width: 595,
        height: 842,
      };
      options.html += `<table class="border v100">
            <tr>
                <th>Lp</th>
                <th>Data wyjazdu</th>
                <th>Cel wyjazdu</th>
                <th>Liczba przejechanych <br>kilometrów</th>
                <th>Imię i nazwisko <br>osoby kierującej</th>
            </tr>`;

      let i = 0;
      for (const {
        startTrace,
        purpose,
        distance,
        driver: {firstName, lastName},
      } of data) {
        options.html += `<tr>
                <td>${(i += 1)}</td>
                <td>${moment(startTrace).format('DD.MM.YYYY')}</td>
                <td>${purpose}</td>
                <td>${distance.toFixed(2)}</td>
                <td>${firstName} ${lastName}</td>
            </tr>`;
      }
      options.html += `</table>`;

      const file = await RNHTMLtoPDF.convert(options);
      this.newToast(`Zapisano: ${file.filePath}`, ToastAndroid.LONG);
    }
  }

  render() {
    const {
      dateStart,
      dateEnd,
      mode,
      showDateStart,
      showDateEnd,
      car,
    } = this.state;

    const carsList = this.props.cars.map(({licensePlate, name, vin}) => {
      return (
        <Picker.Item
          label={`${licensePlate} - ${name}`}
          key={vin}
          value={vin}
        />
      );
    });

    return (
      <View style={{flex: 1}}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.headerTouchable}
            onPress={this.handleBack}>
            <Icon name="keyboard-backspace" size={24} color="#000" />
            <Text style={styles.headerTitle}>Generowanie Raportu</Text>
          </TouchableOpacity>
        </View>
        <View style={{flex: 1, padding: 20}}>
          <Input
            pickerTag
            name="Wybierz samochód:"
            value={car}
            onChangeFn={(itemValue) => this.setState({car: itemValue})}>
            {carsList}
          </Input>
          <View style={styles.separator} />
          <Text>Wybierz datę początkową:</Text>
          <TouchableOpacity
            onPress={() => this.setState({showDateStart: true})}>
            <Text style={{padding: 8, fontSize: 16}}>
              {moment(dateStart).format('DD/MM/YYYY')}
            </Text>
          </TouchableOpacity>
          <View style={styles.separator} />
          <Text>Wybierz datę końcową:</Text>
          <TouchableOpacity onPress={() => this.setState({showDateEnd: true})}>
            <Text style={{padding: 8, marginBottom: 6, fontSize: 16}}>
              {moment(dateEnd).format('DD/MM/YYYY')}
            </Text>
          </TouchableOpacity>
          <Button
            title={
              this.state.isProcessing ? 'Generowanie...' : 'Generuj raport'
            }
            onPress={this.handleSubmit}
            disabled={this.state.isProcessing}
          />
        </View>
        {showDateStart && (
          <DateTimePicker
            value={dateStart}
            mode={mode}
            display="default"
            onChange={this.setDateStart}
          />
        )}
        {showDateEnd && (
          <DateTimePicker
            value={dateEnd}
            mode={mode}
            display="default"
            onChange={this.setDateEnd}
          />
        )}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.user.token,
    cars: state.car.cars,
  };
};

export default connect(mapStateToProps)(ReportScreen);

ReportScreen.propTypes = {
  cars: PropTypes.arrayOf(
    PropTypes.shape({
      licensePlate: PropTypes.string,
      vin: PropTypes.string,
      mleage: PropTypes.number,
      engineSize: PropTypes.number,
      name: PropTypes.string,
    })
  ).isRequired,
  token: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e3e3e3',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTouchable: {
    paddingHorizontal: 10,
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    marginLeft: 15,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 8,
    width: '100%',
    height: 1,
    backgroundColor: '#b6b6b6',
  },
});
