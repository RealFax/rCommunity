import { IsSafe } from '@/misc/safe'
import { Request } from '@/module/request'
import { API } from '@/env'

async function Login (username, password, token, captcha = false) {
    if (!username || !password || !token) {
        return null;
    }
    const send = IsSafe.LoginPackage({
        username: username,
        password: password,
        token: token,
    });
    if (!send) {
        return null;
    }
    Object.assign(send, { captcha: captcha });
    let req = new Request(API.base + API.url.login, send, null);
    return await req.POST();
}

export{
    Login
}
