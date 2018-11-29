import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import SweetAlert from 'sweetalert-react';
import Api from '../../config/api';
import { COLORS } from '../../config/constants';

import Wrapper from '../../components/Wrapper';
import Label from '../../components/Label';
import Input from '../../components/Input';
import Button from '../../components/Button';
import FileInput from '../../components/FileInput';
import RadioButton from '../../components/RadioButton';
import Error from '../../components/Error';
import Loading from '../../components/Loading';

class RegisterUser extends Component {
  state = {
    alertProps: { title: 'Alert' },
    alertShow: false,
    loading: false,
    id: this.props.match.params.id || '',
    name: '',
    email: '',
    phone: '',
    password: '',
    userType: '',
    confirmPassword: '',
    fileImage: {},
    errors: {},
    errorMessage: '',
    formData: false,
    modified: false
  }

  componentDidMount() {
    this.verifyUser();
  }

  verifyUser() {
    const { account, history } = this.props;
    const { id } = this.state;

    if (id) {
      this.setState({ loading: true });
      Api.GetUser(account.tokenAuth, id).then(res => {
        if (res.status === 201) {
          this.setState({ loading: false });
        } else history.push('/user');
        console.log('res :', res);
      }).catch(err => {
        history.push('/user');
      });
    }
  }

  validateForm() {
    const byteFileAllowed = 5 * 1000000;
    const validMimetypes = ['image/jpeg', 'image/png', 'image/gif'];
    const formData = new FormData();
    let { name, email, phone, password, userType, confirmPassword, fileImage, errors } = this.state;

    if (_.isEmpty(name)) errors.name = 'Name is required';
    if (_.isEmpty(email)) errors.email = 'Email is required';
    if (_.isEmpty(phone)) errors.phone = 'Phone is required';
    if (_.isEmpty(password)) errors.password = 'Password is required';
    if (_.isEmpty(confirmPassword)) errors.confirmPassword = 'Confirm Password is required';
    if (_.isEmpty(userType)) errors.userType = 'User Type is required';

    if (!errors.email && !email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i))
      errors.email = `Email format is invalid: ${email}`;
    if (!errors.phone && phone.length < 10)
      errors.phone = 'Phone length must be higher or equal than 10';
    if (!errors.password && password.length < 6)
      errors.password = 'Password length must be higher or equal than 6';
    if (!errors.confirmPassword && !_.isEqual(password, confirmPassword))
      errors.confirmPassword = 'Password confirmation must match with password field';

    if (fileImage.type) {
      const { type, size } = fileImage;
      if (size > byteFileAllowed)
        errors.picture = 'File requires to be lower than 5mb';
      if (!validMimetypes.includes(type.toLowerCase()))
        errors.picture = 'File must be an image';
    }

    this.setState({ errors });
    if (Object.keys(errors).length > 0) return false;

    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('password', password);
    formData.append('type', userType && userType.length > 0 ? Number.parseInt(userType) : 1);
    formData.append('image', fileImage);

    this.setState({ formData, alertShow: true, alertProps: this.getSaveAlertProps(), modified: true });
  }

  createUser() {
    this.setState({ errors: {}, loading: true, errorMessage: "" });
    const { account } = this.props;
    const { formData } = this.state;
    const closeProcess = msg => this.setState({ formData: false, alertShow: false, loading: false, errorMessage: msg || "" });

    if (formData) {
      Api.CreateUser(account.tokenAuth, formData).then(res => {
        if (res.status === 201) {

          const alertProps = this.getSuccessAlertProps(() => {
            this.setState({ alertShow: false }, () => this.props.history.push('/user'));
          });
          this.setState({ formData: false, alertProps, loading: false });

        } else closeProcess(res.message)
      }).catch(err => closeProcess(err.message));
    } else closeProcess();
  }

  onChange(e) {
    const { name, value } = e.target;
    let { errors } = this.state;
    delete errors[name]
    this.setState({ [name]: value, errors, modified: true });
  }

  onChangeFileImage(nameField, e) {
    const { name, files } = e.target;
    let { errors } = this.state;
    delete errors[name]
    this.setState({ [nameField]: files[0], errors, modified: true });
  }

  phoneSet(value, next) {
    const hasPlus = value.substring(0, 1) === '+';
    value = hasPlus ? value.substring(1, value.length) : value;
    if (!isNaN(value) || _.isEmpty(value)) next();
  }

  onSubmit(e) {
    e.preventDefault();
    this.validateForm();
  }

  onCancel() {
    if (this.state.modified) {
      const onClickCancel = () => this.setState({ alertShow: false }, () => this.props.history.push('/user'))
      this.setState({ alertShow: true, alertProps: this.getCancelAlertProps(onClickCancel) });
    } else this.props.history.push('/user');
  }

  render() {
    const links = [
      { name: 'Users', link: '/user', onClick: this.onCancel.bind(this) },
      { name: 'New User', link: '/user/new' },
    ];
    const { fileImage, errorMessage, errors, alertProps, alertShow, loading, userType } = this.state;
    return (
      <Wrapper name='Add new user' breadcrumb={links}>
        <div className="d-flex flex-column">
          <form onSubmit={this.onSubmit.bind(this)}>
            <div className="row">
              <div className="col-md-6">
                <div className="mt-3">
                  <Label label="Full Name" />
                  <Input ref="name" name="name" onChange={this.onChange.bind(this)} error={!_.isEmpty(errors.name)} />
                  <Error text={errors.name} />
                </div>
                <div className=" mt-3">
                  <Label label="Email Address" />
                  <Input ref="email" name="email" disableSpaces onChange={this.onChange.bind(this)} error={!_.isEmpty(errors.email)} />
                  <Error text={errors.email} />
                </div>
                <div className="mt-3">
                  <Label label="Phone Number" />
                  <Input ref="phone" name="phone" onChange={this.onChange.bind(this)} error={!_.isEmpty(errors.phone)} type="tel" disableSpaces max={13} beforeSet={this.phoneSet} />
                  <Error text={errors.phone} />
                </div>
                <div className="col-md-9 pl-0 mt-3">
                  <Label label="Picture" />
                  <FileInput placeholder={fileImage.name} name="picture" onChange={this.onChangeFileImage.bind(this, "fileImage")} error={!_.isEmpty(errors.picture)} />
                  <Error text={errors.picture} />
                </div>
              </div>

              <div className="col-md-6">
                <div className="mt-3">
                  <Label label="Password" />
                  <Input name="password" onChange={this.onChange.bind(this)} error={!_.isEmpty(errors.password)} password />
                  <Error text={errors.password} />
                </div>
                <div className="mt-3">
                  <Label label="Confirm Password" />
                  <Input name="confirmPassword" onChange={this.onChange.bind(this)} error={!_.isEmpty(errors.confirmPassword)} password />
                  <Error text={errors.confirmPassword} />
                </div>
                <div className="mt-4">
                  <h4>User Type</h4>
                  <hr />
                  <RadioButton checked={userType === '1'} onChange={this.onChange.bind(this)} value='1' name="userType" text="Administrator" />
                  <RadioButton checked={userType === '2'} onChange={this.onChange.bind(this)} value='2' name="userType" text="Manager" />
                  <Error text={errors.userType} />
                </div>
              </div>
            </div>

            <div className="mt-3">
              <hr />
              <span className="text-danger">{errorMessage}</span>
              <Button text="Create User" bigSize />
              <Button text="Cancel" bigSize link onClick={this.onCancel.bind(this)} />
            </div>
          </form>
        </div>
        <SweetAlert show={alertShow} {...alertProps} />
        <Loading show={loading} absolute />
      </Wrapper>
    );
  }

  getSaveAlertProps() {
    return {
      title: "Create User",
      text: "Are you sure to save the user?",
      showCancelButton: true,
      confirmButtonColor: COLORS.Success,
      onConfirm: this.createUser.bind(this),
      onCancel: () => this.setState({ formData: false, alertShow: false })
    };
  }

  getSuccessAlertProps(onClick) {
    return {
      title: "User Created",
      text: "The user has been created successfully",
      type: "success",
      confirmButtonColor: COLORS.Success,
      onConfirm: onClick.bind(this)
    };
  }

  getCancelAlertProps(onClickCancel) {
    return {
      title: "Cancel",
      text: "Are you sure to cancel the new user?",
      type: "info",
      showCancelButton: true,
      confirmButtonColor: COLORS.Danger,
      onConfirm: onClickCancel.bind(this),
      onCancel: () => this.setState({ alertShow: false })
    };
  }
}
export default connect(s => ({ account: s.account }))(RegisterUser)