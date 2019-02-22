import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Api from "../config/api";
import Wrapper from "../components/Wrapper";
import Sidebar from "../components/Sidebar";
import Loading from '../components/Loading';
import Input from '../components/Input';
import SelectInputGoals from '../components/SelectInputGoals';
import Button from '../components/Button';
import UserGoals from '../components/UserGoals';
import _ from "lodash";
import SweetAlert from "sweetalert-react";
import { COLORS, FONTS } from "../config/constants";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

var moment = require("moment");
class DailyGoals extends Component {
  state = {
    users: [],
    tasks: [],
    active: {},
    isGoing: false,
    process: 0,
    loading: false,
    wrapperWidth: 'calc(100% - 16.7%)',
    task: '',
    taskDate: '',
    alertProps: { title: "Alert" },
    alertShow: false,
    errorMessage: "",
    showCustom: false,
    customDate: new Date(),
    isChecked: false
  };

  handleCollapse(e) {
    let wrapperWidth = 'calc(100% - 16.7%)';
    if (!e) wrapperWidth = 'calc(100% - 50px)';
    this.setState({ wrapperWidth });
  }

  async componentWillMount() {
    this.allData()
  }

  async allData() {
    const { account } = this.props;
    this.setState({ loading: true })
    const allTask = await Api.GetGoalsToday(account.tokenAuth);
    const allUser = await Api.GetAllUser(account.tokenAuth);
    this.setState({ tasks: allTask, users: allUser, loading: false });
  }

  onLogout() {
    localStorage.removeItem("tokenAuth");
    window.location.reload();
  }

  onSubmit(e, value) {
    e.preventDefault();
    if (e) e.preventDefault();
    let dates = []

    switch (value.toLowerCase()) {
      case "today": {
        dates = moment().format("YYYYMMDD");
        break;
      }
      case "tomorrow": {
        dates = moment().add(1, "days").format("YYYYMMDD");
        break;
      }
      case "monday": {
        dates = moment().startOf('isoWeek').add(1, 'week').format("YYYYMMDD");
        break;
      }
      case "custom": {
        dates = moment(this.state.customDate).format("YYYYMMDD");
        break;
      }
    }
    const { task, taskDate } = this.state;
    if (_.isEmpty(task)) return this.setState({ errorMessage: 'Task is required' });
    this.setState({ alertShow: true, alertProps: this.getSaveAlertProps(), taskDate: dates });
  }

  saveTask() {
    const { account } = this.props;
    const userId = account._id;
    const { task, taskDate } = this.state;
    const data = { userId, task, taskDate };
    console.log('Data ', data);
    this.setState({ loading: true });
    Api.CreateGoal(account.tokenAuth, data)
      .then(res => {
        console.log('LOL',res.data);
        if (res.status === 201) {
          this.setState({ loading: false, alertShow: true });
          const alertProps = this.getSuccessAlertProps(() => {
            this.setState({ alertShow: false, });
          });
          this.setState({ alertProps, errorMessage: "" });
          this.allData();
        } else {
          this.setState({
            errorMessage: res.message,
            alertShow: false,
            loading: false,
          });
        }
      })
      .catch(err => {
        this.setState({
          errorMessage: err.message,
          loading: false
        });
      });
  }



  onChange(e) {
    let showCustom = false;
    const { name, value } = e.target;
    console.log(name, value)
    if (e.target.value.toLowerCase() === "custom") showCustom = true;

    this.setState({ [name]: value, errorMessage: "", showCustom });
  }

  fromChange(date) {
    this.setState({ taskDate: date });
  }

  showDeleteUserAlert(id) {
    const alertProps = this.getDeleteAlertProps(id);
    this.setState({ alertShow: true, alertProps });
  }

  deleteUser(_id) {
    const { account } = this.props;
    const closeProcess = errorMessage =>
      this.setState({ alertShow: false, errorMessage });
    if (_id) {
      Api.LogicDeleteGoal(account.tokenAuth, {_id})
        .then(res => {
          if (res.status === 201) {
            this.setState({ alertProps: this.getSuccessDeleteAlertProps() });
            this.allData();
          } else closeProcess(res.message);
        })
        .catch(err => {
          if (err.message) closeProcess(err.message);
        });
    } else closeProcess("Error Id Required");
  }

  onChecked(e, _id){
    console.log('Daily ',e.target.checked, _id)
    const { account } = this.props;
    const checked = e.target.checked;
    const data = { checked, _id };
    console.log('Data ', data);
    Api.UpdateGoal(account.tokenAuth, data)
      .then(res => {
        console.log(res);
        if (res.status === 201) {
          this.allData();
        }
      })
      .catch(err => {
        console.log(err.message)
      });

  }

  render() {
    const { account } = this.props;
    const { loading, wrapperWidth, alertShow, alertProps, taskDate, showCustom, tasks, users, customDate } = this.state;
    let listUsers = [];
    if (Object.keys(users).length > 0) {
      listUsers = users.data.map((x, i) => {
        let userGoals = tasks.data.filter(t => t.userId === x._id)
        if (userGoals.length > 0) return <UserGoals key={i} data={userGoals} user={x} onDelete={this.showDeleteUserAlert.bind(this)} onChecked={this.onChecked.bind(this)}/>
      })
    }

    let custom = showCustom ? (<DatePicker style={styles.datepicker} selected={customDate} onChange={this.fromChange.bind(this)} />) : undefined
    return (

      <Fragment>
        <Sidebar />
        <Wrapper maxWidth={wrapperWidth} title="Daily Goals" onClick={this.onLogout} hideLink>
          <div>
            <div className='goalsBox mb-3'>
              {listUsers}
            </div>
            <form className='formTask' onSubmit={e => this.onSubmit(e, taskDate)} >
              <Input name='task' placeholder='Type in Your Goals' onChange={this.onChange.bind(this)} />
              <div className='mt-2 d-md-flex flex-md-row justify-content-md-end'>
                <div className='col-md-12 d-flex flex-row justify-content-end'>
                  {custom}
                  <div className='d-md-flex flex-md-row col-sm-12 col-md-4'>
                    <SelectInputGoals onChange={this.onChange.bind(this)} name='taskDate' />
                    <Button text='Add Goal' filter classes='ml-md-2' />
                  </div>
                </div>
              </div>
            </form>
          </div>
          <SweetAlert show={alertShow} {...alertProps} />
          <Loading
            show={loading}
            absolute
            backgroundClass="bg-gray"
            textColor="#020202"
            text="LOADING.."
          />
        </Wrapper>
      </Fragment>
    );
  }

  getSaveAlertProps() {
    return {
      title: "Create Task",
      text: "Are you sure to create the task?",
      showCancelButton: true,
      confirmButtonColor: COLORS.Success,
      onConfirm: this.saveTask.bind(this),
      onCancel: () => this.setState({ alertShow: false })
    };
  }

  getSuccessAlertProps(onClick) {
    return {
      title: "Task Created",
      text: `The task has been created successfully`,
      type: "success",
      confirmButtonColor: COLORS.Success,
      onConfirm: onClick.bind(this)
    };
  }

  getDeleteAlertProps(id) {
    return {
      title: "Delete Task",
      text: "Are you sure to delete the task?",
      showCancelButton: true,
      type: "info",
      confirmButtonColor: COLORS.Danger,
      onConfirm: this.deleteUser.bind(this, id),
      onCancel: () => this.setState({ alertShow: false })
    };
  }

  getSuccessDeleteAlertProps() {
    return {
      title: "Task Deleted",
      text: "The task has been deleted",
      type: "success",
      confirmButtonColor: COLORS.Success,
      onConfirm: () => this.setState({ alertShow: false, loading: false })
    };
  }

}

const styles = {
  titleDate: {
    fontFamily: FONTS.RobotoLight,
    fontSize: 14,
    paddingLeft: 10
  },
  calendarOne: {
    top: 55,
    left: 10,
    width: '20px',
    height: '100%',
    position: "relative",
    zIndex: 1
  },
  datepicker: {
    zIndex: 2
  }
};

export default connect(s => ({ account: s.account }))(DailyGoals);
