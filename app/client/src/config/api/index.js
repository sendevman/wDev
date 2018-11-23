import FetchRequest from './request';
import * as c from './constants';

class ApiModel {
    Login = credentials => FetchRequest(c.LOGIN, 'POST', null, credentials);
    GetUser = token => FetchRequest(c.GETCURRENT, 'GET', token);
    GetUsers = token => FetchRequest(c.GETUSERS, 'GET', token);
    CreateUser = (token, user) => FetchRequest(c.CREATEUSER, 'POST', token, user, {});
    CreateTeam = (token, user) => FetchRequest(c.CREATETEAM, 'POST', token, user, {});
}

export default new ApiModel();