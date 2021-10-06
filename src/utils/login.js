import { LoginPackage } from '../misc/safe'
import { Request } from '../action/request'
import { API } from '../env'

const Login = (username, password, token) => {
    if (!username || !password || !token) {
        return null;
    }
    var sendData = LoginPackage({
        username: username,
        password: password,
        token: token
    });
    if(!sendData) {
        return null;
    }
    let request = new Request(API.base + API.url.login, sendData);
    let response = request.POST();
    return response;
}

export{
    Login
}