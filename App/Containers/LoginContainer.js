
import React from 'react'
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Keyboard,
  Button,
  LayoutAnimation
} from 'react-native'

import { connect } from 'react-redux'
import Styles from './Styles/LoginScreenStyle'
import {Images, Metrics, Colors} from '../Themes'
import LoginActions from '../Redux/LoginRedux'
import CustomerActions from '../Redux/CustomerRedux'
import { Actions as NavigationActions } from 'react-native-router-flux'
import Config from 'react-native-config'

import { Sae } from 'react-native-textinput-effects'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import Reactotron from 'reactotron-react-native'

import Auth0Lock from 'react-native-lock'

class LoginContainer extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      visibleHeight: Metrics.screenHeight,
      download: 'download',
      downloadProgress: 0,
    }
    this.lock = new Auth0Lock({clientId: 'e7Cg7lClPf4Tky0Z27iz83E732KPVnXX', domain: 'eliotjunior.auth0.com'})
  }

  componentDidMount() {
    this.lock.show({closable: true}, (err, profile, token) => {
      if (err) {
        return
      }
      this.props.setName(profile.name)
      Reactotron.log(profile)
      Reactotron.log(token)
    })
  }

  handleTextChange(txt, whichState) {
    let obj = {}
    obj[whichState] = txt
    this.setState(obj)
  }
  
  render() {
    const inputProps = {
      labelStyle: styles.label,
      inputStyle: styles.input,
      iconClass: FontAwesomeIcon,
      iconName: 'pencil',
      iconColor: Colors.app1,
    }

    return (
      <ScrollView 
        contentContainerStyle={{justifyContent: 'center'}} 
        style={[Styles.container, { backgroundColor: Colors.backgroundLight },{height: this.state.visibleHeight}]} 
        keyboardShouldPersistTaps>
        <View style={[styles.card2, { backgroundColor: Colors.backgroundLight }]}>
          <Text style={styles.title}>Login</Text>
          <Sae {...inputProps} label={'Email Address'} value={this.state.email} onChangeText={(txt) => this.handleTextChange(txt, 'email')} />
          <Sae {...inputProps} label={'Password'} secureTextEntry={true} value={this.state.password} onChangeText={(txt) => this.handleTextChange(txt, 'password')} />
        </View>
        <Button
          title="Submit"
          color={ Colors.app1}
          accessibilityLabel="Submit Login"
        />
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    // fetching: state.login.fetching
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setName: name => dispatch(CustomerActions.setName(name))
    // attemptLogin: (username, password) => dispatch(LoginActions.loginRequest(username, password))
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24,
    backgroundColor: '#0A1612',
  },
  content: {
    // not cool but good enough to make all inputs visible when keyboard is active
    paddingBottom: 300,
  },
  card2: {
    padding: 16,
  },
  input: {
    marginTop: 4,
    color: Colors.app1,
  },
  label: {
    marginTop: 4,
    color: Colors.app1,
  },
  title: {
    paddingBottom: 16,
    textAlign: 'center',
    color: Colors.app1,
    fontSize: 20,
    fontWeight: 'bold',
    opacity: 0.8,
  },
  top: {
    backgroundColor: Colors.backgroundLight,
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer)
