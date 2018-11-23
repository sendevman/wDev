import React, { Component } from 'react';
import Wrapper from '../../components/Wrapper';
import Input from '../../components/Input';
import Label from '../../components/Label';
import Button from '../../components/Button';
import { connect } from 'react-redux';
import _ from 'lodash';
import Api from '../../config/api';
import Error from '../../components/Error';

class Register extends Component {

  state = {
    name: '',
    errors: {},
    id: this.props.match.params.id || '',
  }

  componentDidMount() {
    const { id } = this.state;
    if(id !== '') this.getTeam(id);
  }

  validateForm() {
    let { name, errors } = this.state;
    if (_.isEmpty(name)) errors.name = 'Name is required';

    this.setState({ errors });
    if (Object.keys(errors).length > 0) return false;

    return { name }
  }

  onChange(e) {
    const { name, value } = e.target;
    let { errors } = this.state;
    delete errors[name]
    this.setState({ [name]: value, errors });
  }

  onSubmit(e) {
    e.preventDefault();
    this.setState({ errors: {} });
    const { account } = this.props;
    const data = this.validateForm();
    console.log(data);

    if (data) {
      //TODO:Add loading stuff
      Api.CreateTeam(account.tokenAuth, data).then(res => {
        if (status === 201) {

        }
        console.log('res :', res);
      }).catch(err => {
        //TODO: show error
        console.log('err :', err);
      });
    }
  }

  getTeam = id => {
    const { account } = this.props;
    console.log('ID: ', id);
    Api.GetTeam(account.tokenAuth, id).then(res => {
      if (status === 201) {

      }
      console.log('res :', res);
    }).catch(err => {
      //TODO: show error
      console.log('err :', err);
    });
  }

  render() {
    const { errors } = this.state;
    const links = [
      { name: 'Team', link: '/team' },
    ];
    return (
      <Wrapper name='Create a new team' breadcrumb={links}>
        <div className='d-flex flex-column'>
          <form onSubmit={this.onSubmit.bind(this)}>
            <div className="col-md-12">
              <Label label='Name' />
              <Input name='name' onChange={this.onChange.bind(this)} error={!_.isEmpty(errors.name)} />
              <Error text={errors.name} />
            </div>
            <hr />
            <div className='mr-3'>
              <Button text='Send' bigSize />
            </div>
          </form>
        </div>
      </Wrapper>
    );
  }
}
export default connect(s => ({ account: s.account }))(Register)