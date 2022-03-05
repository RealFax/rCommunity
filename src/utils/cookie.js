
const SetCookie = (key, value, path, expires) => {
    let cookie = key + '=' + escape(value) + '; domain=' + path;
    if (expires > 0) {
        let date = new Date();
        date.setTime(date.getTime() + expires * 1000);
        cookie += "; expires=" + date.toGMTString();
    }
    document.cookie = cookie;
}

const GetCookie = (key) => {
    let cookie = document.cookie.split('; ')
    for (let i = 0; i < cookie.length; i++) {
        let temp = cookie[i].split('=');
        if (temp[0] === key) {
            return unescape(temp[1]);
        }
    }
    return null;
}

export {
    SetCookie,
    GetCookie
}