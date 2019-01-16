import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { ToastContainer, ToastStore } from "react-toasts";
import Api from "../config/api";
import Wrapper from "../components/Wrapper";
import Sidebar from "../components/Sidebar";
<<<<<<< HEAD
import Loading from '../components/Loading';
import { ToastContainer, ToastStore } from 'react-toasts';

=======
>>>>>>> b9e857599710d2b966c9f4328fc46156013d907c

class Admin extends Component {
  state = {
    people: [],
    developers: [],
    active: {},
    isGoing: false,
    process: 0,
    loading: true
  };

  async componentWillMount() {
    // const { account } = this.props;
    // const resPeople = await Api.GetPeople(account.tokenAuth);
    // const resDeveloper = await Api.GetAllDeveloper(account.tokenAuth);
    // this.setState({ people: resPeople, developers: resDeveloper });

    // await Api.CreateDeveloper(account.tokenAuth, { apiId: "123456", active: true, fullTime: true });

<<<<<<< HEAD
    // ToastStore.info('Hey, it worked !'); //BLUE ADD //WHITE REMOVE
=======
    // ToastStore.info('Hey, it worked !');
>>>>>>> b9e857599710d2b966c9f4328fc46156013d907c
    this.allDeveloper()



  }

  async allDeveloper() {
    const { account } = this.props;
    const resPeople = await Api.GetPeople(account.tokenAuth);
    const resDeveloper = await Api.GetAllDeveloper(account.tokenAuth);
    this.setState({ people: resPeople, developers: resDeveloper });


  }

  onLogout() {
    localStorage.removeItem("tokenAuth");
    window.location.reload();
  }

  async onChangeActive(e, id, prev) {
    const { account } = this.props;

    if (e.target.checked) {
      const dev = await Api.GetDeveloperByApiId(account.tokenAuth, { apiId: id.toString() });
      if (dev.data != null) {
        if (dev.data.fullTime) {
          await Api.DeleteDeveloper(account.tokenAuth, { apiId: id.toString() });
          await Api.CreateDeveloper(account.tokenAuth, { apiId: id.toString(), active: true, fullTime: true });
          ToastStore.success('Team member has been updated');
        }
        else {
          await Api.CreateDeveloper(account.tokenAuth, { apiId: id.toString(), active: true, fullTime: false });
          ToastStore.success('Team member has been added');
        }
      } else {
        await Api.CreateDeveloper(account.tokenAuth, { apiId: id.toString(), active: true, fullTime: false });
        ToastStore.success('Team member has been added');
      }
    } else {
      const dev = await Api.GetDeveloperByApiId(account.tokenAuth, { apiId: id.toString() });
      if (dev.data.fullTime) {
        await Api.DeleteDeveloper(account.tokenAuth, { apiId: id.toString() });
        await Api.CreateDeveloper(account.tokenAuth, { apiId: id.toString(), active: false, fullTime: true });
        ToastStore.success('Team member has been updated');
      } else {
        await Api.DeleteDeveloper(account.tokenAuth, { apiId: id.toString() });
        ToastStore.success('Team member has been removed');
      }
    }



    // this.allDeveloper()

  }

  async onChangeFullTime(e, id) {
    const { account } = this.props;

    if (e.target.checked) {
      const dev = await Api.GetDeveloperByApiId(account.tokenAuth, { apiId: id.toString() });
      if (dev.data != null) {
        if (dev.data.active) {
          await Api.DeleteDeveloper(account.tokenAuth, { apiId: id.toString() });
          await Api.CreateDeveloper(account.tokenAuth, { apiId: id.toString(), active: true, fullTime: true });
          ToastStore.success('Team member has been updated');

        } else {
          await Api.CreateDeveloper(account.tokenAuth, { apiId: id.toString(), active: false, fullTime: true });
          ToastStore.success('Team member has been added');
        }
      } else {
        await Api.CreateDeveloper(account.tokenAuth, { apiId: id.toString(), active: false, fullTime: true });
        ToastStore.success('Team member has been added');
      }
    } else {
      await Api.DeleteDeveloper(account.tokenAuth, { apiId: id.toString() });
      ToastStore.success('Team member has been removed');

    }
  }

  render() {
    const { people } = this.state;
    const developers = this.state.developers;

    if (people.data) {
      let ppl = people.data.people
      let counter = 0;
      this.setState({ process: 0, loading: true });

      var peopleList = ppl.map((r, i) => {
        let fullName = r["first-name"] + " " + r["last-name"]
        var active = false;
        var fullTime = false;

        // counter++;
        // let process = ((counter * 100) / ppl.length).toFixed(0);
        // if (process < 100) this.setState({ process });

        developers.data.map((a) => {
          if (r.id === a.apiId) {
            if (a.active) {
              active = true
            }
            if (a.fullTime) {
              fullTime = true
            }
          }
        })
        return (
          <tr key={i}>
            <td>{fullName}</td>
            <td style={styles.sizeRow} align="center">
              <input
                //style={styles.checkBoxWidth}
                className="mt-1"
                type="checkbox"
                id={r.id + "A"}
                value={r.id + "A"}
                {...(active ? { checked: true } : {})}
                onChange={e => this.onChangeActive(e, r["id"])}
              />
            </td>
            <td style={styles.sizeRow} align="center">
              <input
                //style={styles.checkBoxWidth}
                className="mt-1"
                type="checkbox"
                id={r.id + "F"}
                value={r.id + "F"}
                {...(fullTime ? { checked: true } : {})}
                onChange={e => this.onChangeFullTime(e, r["id"])}

              />
            </td>
          </tr>
        );
      });

      this.setState({loading: false });
    }

    const loading = this.state.loading;
    const process = this.state.process;
    return (
      
      <Fragment>
        <Sidebar admin='admin' />
        <Wrapper title="Admin" onClick={this.onLogout} hideLink>
<<<<<<< HEAD
          {!loading ?
            <div className="d-flex flex-row table-responsive tableProjects">
              <table ref="table" className="table table-striped table-hover table-borderless d-flex flex-column" style={{ overflowX: "scroll" }}>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th style={styles.sizeRow} className="text-right">Active</th>
                    <th style={styles.sizeRow} className="text-right">Full-Time</th>
                  </tr>
                </thead>
                <tbody style={{ overflowY: "scroll", overflowX: 'hidden' }}>
                  {peopleList}
                </tbody>
              </table>
              <div>
                <ToastContainer store={ToastStore} position={ToastContainer.POSITION.TOP_RIGHT} lightBackground />
              </div>
            </div> : <Loading show text={`LOADING: ${process}%`} />}

=======
          <div className="d-flex flex-row table-responsive tableProjects">
            <table ref="table" className="table table-striped table-hover table-borderless d-flex flex-column" style={{ overflowX: "scroll" }}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th style={styles.sizeRow} className="text-right">Active</th>
                  <th style={styles.sizeRow} className="text-right">Full-Time</th>
                </tr>
              </thead>
              <tbody style={{ overflowY: "scroll", overflowX: 'hidden' }}>
                {peopleList}
              </tbody>
            </table>
            <div>
              <ToastContainer store={ToastStore} position={ToastContainer.POSITION.TOP_RIGHT} lightBackground />
            </div>
          </div>
>>>>>>> b9e857599710d2b966c9f4328fc46156013d907c
        </Wrapper>
      </Fragment>
    );
  }
}

const styles = {
  sizeRow: {
    minWidth: '250px'
  }
}

export default connect(s => ({ account: s.account }))(Admin);
