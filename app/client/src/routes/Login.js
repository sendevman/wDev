import React, { Component, Fragment } from 'react';
import Api from '../config/api';
import Input from '../components/Input';
import Button from '../components/Button';
import Loading from '../components/Loading';
import Alert from '../components/Alert';

export default class Login extends Component {

  state = {
    errorMessage: '',
    loading: false,
    revealPass: false,
    email: '',
    password: ''
  }

  onSubmit(e) {
    e.preventDefault();
    const { email, password } = this.state;
    this.setState({ loading: true });

    Api.Login({ email, password }).then(res => {
      const { status, data } = res;
      let errorMessage = '';
      if (status === 201) {
        if (data.user.type > 2) errorMessage = "User not authorized";
        else {
          localStorage.setItem('tokenAuth', data.token);
          this.props.history.push('/');
        }
      } else errorMessage = res.message;
      this.setState({ loading: false, errorMessage });
    }).catch(err => {
      this.setState({ loading: false, errorMessage: err.message });
    });
  }

  onChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value, errorMessage: '' });
  }

  render() {
    const { loading, errorMessage } = this.state;

    return (
      <Fragment>
        <div style={styles.around} className='w-100 gradient'></div>
        <div id="loginBox" className="d-flex flex-wrap justify-content-center align-items-center" style={styles.formBox}>
          <div className="col-md-6 col-lg-6 col-xl-3">
            <div className='col-md-11' >
              <img src='assets/img/hypergolic-logoWhite.png' height="70" />
            </div>
            <div>
              <h1 style={styles.titleBox} className="mb-3 mt-5 text-white">Admin</h1>
              <div>
                <form onSubmit={this.onSubmit.bind(this)}>
                  <div className="form-group" style={styles.mb}>
                    <Input name='email' onChange={this.onChange.bind(this)} showPassword disableAutoComplete bigSize />
                  </div>
                  <div className="form-group">
                    <Input name='password' onChange={this.onChange.bind(this)} disableAutoComplete password bigSize />
                  </div>
                  <Alert type="danger" hide={!errorMessage}>{errorMessage}</Alert>
                  <Button text="Login" bigSize />
                </form>
              </div>
            </div>
          </div>
          <Loading show={loading} absolute backgroundClass="bg-gray" textColor="#fff" text="LOGIN IN.." />
        </div>
      </Fragment >
    );
  }
}

const styles = {
  formBox: {
    paddingTop: 70
  },
  mb: {
    marginBottom: -10,
  },
  around: {
    height: 70,
    position: 'fixed',
    zIndex: 1100
  }
}
