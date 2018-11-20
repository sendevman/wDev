import React, { Component, Fragment } from 'react';
import Wrapper from '../components/Wrapper';
import Profile from '../components/ProfileView';
import IconInfo from '../components/IconInfo';
import Icons from '../components/Icon';
import ProfileImage from '../components/ProfileImage';


export default class Client extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wrapperType: true
    }
    this.changeList = this.changeList.bind(this);
  }

  changeList = () => {
    this.setState({ wrapperType: !this.state.wrapperType });
    console.log('lol');
  }

  render() {
    return (
      <Wrapper name={'Athlete/Agent'}>
        <div className="d-flex flex-row">
          <div className="btn-group mr-2" role="group">
            <button type="button" className={`btn border noBorder px-2 py-0 ${this.state.wrapperType ? 'active' : ''}`} onClick={this.changeList} style={{ backgroundColor: this.state.wrapperType ? '#ccc' : '', color: this.state.wrapperType ? '#FAFAFB' : '', height: 35 }}>
              <Icons name="grid-f" size="22" /><Icons name="grid-f" size="22" />
            </button>
            <button type="button" className={`btn border noBorder px-1 py-0 ${!this.state.wrapperType ? 'active' : ''}`} onClick={this.changeList} style={{ backgroundColor: this.state.wrapperType ? '' : '#ccc', color: this.state.wrapperType ? '' : '#FAFAFB', height: 35 }}>
              <Icons name="align-justify" size="32" /><Icons name="align-justify" size="32" />
            </button>
          </div>
        </div>
        <div className={this.state.wrapperType ? "d-flex flex-column mt-3 col-md-6" : "d-flex flex-row mt-3 col-md-6"}>
          <Profile src="/assets/img/4.jpg" title="Maria Hamilton" subtitle="Administrator" orientation={this.state.wrapperType ? true : false} >
            <div className={this.state.wrapperType ? "d-flex justify-content-end px-3 pt-3" : ""} style={{ flex: 1 }}>
              <IconInfo color="#2C3A41" hover="#777777" icon="eye">
                <Profile src="/assets/img/4.jpg" title="Maria Hamilton" subtitle="Administrator" />
              </IconInfo>
              <IconInfo color="#2C3A41" hover="#777777" icon="eyedropper px-1" />
              {!this.state.wrapperType ?
                <Fragment>
                  <IconInfo color="#2C3A41" hover="#777777" icon="shield" />
                  <IconInfo color="#2C3A41" hover="#777777" icon="document px-1" />
                  <IconInfo color="#2C3A41" hover="#777777" icon="envelope " />
                </Fragment>
                : null}
            </div>
          </Profile>
        </div>
      </Wrapper>
    );
  }
}
