import React, { Component, Fragment } from 'react';
import { COLORS, FONTS } from '../config/constants';
import Api from '../config/api';
import Input from '../components/Input';
import Button from '../components/Button';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      revealPass: false,
      email: '',
      password: ''
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    const { email, password } = this.state;
    //TODO:Add loading stuff
    Api.Login({ email, password }).then(res => {
      const { status, data } = res;
      if (status === 201) {
        localStorage.setItem('tokenAuth', data.token);
        this.props.history.push('/');
      }
    }).catch(err => {
      //TODO: show error
    });
  }

  onChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <Fragment>
        <div style={styles.around} className='w-100 gradient'></div>
        <div id="loginBox" className="d-flex flex-wrap justify-content-center align-items-center" style={styles.formBox}>
          <div className="col-md-6 col-lg-6 col-xl-3">
            <div className='col-md-11' >
              <img src='assets/img/hypergolic-logoWhite.png' className='img-fluid' />
            </div>
            <div>
              <h1 style={styles.titleBox} className="mb-3 mt-5 text-white">Admin</h1>
              <div>
                <form onSubmit={this.onSubmit}>
                  <div className="form-group" style={styles.mb}>
                  <a style={styles.icon} href="#" onClick={() => this.setState({ revealPass: !this.state.revealPass })}>
                        {/* <i className={!this.state.revealPass ? "far fa-eye" : "far fa-eye-slash"}></i> */}
                        {/* <span class={!this.state.revealPass ? "far eye-f" : "far eye-close-f"}></span> */}
                        <span className="eye-f"></span>
                    </a>
                    <Input name='email' onChange={this.onChange} showPassword disableAutoComplete bigSize/>
                  </div>
                  <div className="form-group">
                    <Input name='password' onChange={this.onChange} disableAutoComplete password bigSize />
                  </div>
                  <Button text="Login" bigSize/>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
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
    position: 'fixed'
  }
}
