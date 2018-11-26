import React, { Component } from 'react';
import Wrapper from '../../components/Wrapper';
import Button from '../../components/Button';
import IconInfo from '../../components/IconInfo';
import Profile from '../../components/ProfileView';
import { connect } from 'react-redux';
import Api from '../../config/api';
import SweetAlert from 'sweetalert-react';
import { COLORS } from '../../config/constants';

class Teams extends Component {

  state = {
    teams: [],
    alertProps: { title: 'Alert' },
    alertShow: false,
  }

  componentWillMount() {
    this.getTeams();
  }

  getTeams = () => {
    const { account } = this.props;
    Api.GetTeams(account.tokenAuth).then(res => {
      if (res.status === 201) {
        this.setState({ teams: res.data });
      }
    }).catch(err => {

    });
  }

  newTeam() {
    const { history } = this.props;
    history.push('/team/new');
  }

  editTeam(id) {
    const { history } = this.props;
    history.push('/team/edit/' + id);
  }

  deleteTeam = id => {
    const { account } = this.props;
    if (id) {
      Api.DeleteTeam(account.tokenAuth, {_id: id} ).then(res => {
        if (res.status === 201) { 
          this.setState({ alertShow: false });
          this.getTeams();
        }
        this.setState({ alertShow: false });
        console.log('res :', res);
      }).catch(err => {
        //TODO: show error
        console.log('err :', err);
        this.setState({ alertShow: false });
      });
    }
  }

  alertTeam = id => {
    this.setState({ alertShow: true, alertProps: this.getDeleteAlertProps(id) });
  }

  getDeleteAlertProps(id) {
    return {
      title: 'Delete Team',
      text: 'Are you sure to delete the team',
      showCancelButton: true,
      confirmButtonColor: COLORS.Success,
      onConfirm: this.deleteTeam.bind(this, id),
      onCancel: () => this.setState({ alertShow: false })
    };
  }

  render() {
    const { teams, alertProps, alertShow } = this.state;
    const links = [
      { name: 'Team', link: '/team' },
      { name: 'New', link: '/team/new' },
    ];
    return (
      <Wrapper name='List of Teams' breadcrumb={links}>
        <Button text='Add new user' onClick={this.newTeam.bind(this)} />
        {teams.map(t =>
          <div key={t._id} className="d-flex flex-row mt-3 col-md-6">
            <Profile src="/assets/img/4.jpg" title={t.name} subtitle="Team" orientation noImage>
              <div className="d-flex justify-content-end align-items-center px-3">
                <IconInfo color="#2C3A41" hover="#777777" icon="eye" />
                <IconInfo color="#2C3A41" hover="#777777" icon="eyedropper px-1" onClick={this.editTeam.bind(this, t._id)} />
                <IconInfo color="#2C3A41" hover="#777777" icon="trash" onClick={this.alertTeam.bind(this, t._id)} />
              </div>
            </Profile>
          </div>
        )}
        <SweetAlert show={alertShow} {...alertProps} />
      </Wrapper>
    );
  }
}

export default connect(s => ({ account: s.account }))(Teams)
