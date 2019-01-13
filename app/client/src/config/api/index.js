import FetchRequest from './request';
import * as c from './constants';

class ApiModel {
    Login = credentials => FetchRequest(c.LOGIN, 'POST', null, credentials);
    GetUserToken = token => FetchRequest(c.GETCURRENT, 'GET', token);
    CreateUser = (token, data) => FetchRequest(c.CREATEUSER, 'POST', token, data);
    GetAllUser = token => FetchRequest(c.GETALLUSERS, 'GET', token);
    GetProjects = token => FetchRequest(c.GETPROJECT, 'GET', token);
    GetPeople = token => FetchRequest(c.GETPEOPLE, 'GET', token);
    GetTimeByUser = (token, data) => FetchRequest(c.GETTIMEBYUSER, 'POST', token, data);
    GetTimeAll = (token, data) => FetchRequest(c.GETTIMEALL, 'POST', token, data);
    GetTotalTimeByDate = (token, data) => FetchRequest(c.GETTOTALTIMEBYDATE, 'POST', token, data);
    GetAllDeveloper = token => FetchRequest(c.GETALLDEVELOPER, 'GET', token);
    GetDeveloperByApiId = (token, data) => FetchRequest(c.DETDEVELOPERBYAPIID, 'POST', token, data);
    CreateDeveloper = (token, data) => FetchRequest(c.CREATEDEVELOPER, 'POST', token, data);
    DeleteDeveloper = (token, data) => FetchRequest(c.DELETEDEVELOPER, 'POST', token, data);
    UpdateDeveloper = (token, data) => FetchRequest(c.UPDATEDEVELOPER, 'POST', token, data);



}

export default new ApiModel();