import Axios from 'axios'
//import { Message } from 'element-ui'

class Request {

    constructor (url = null, data = null, headers = null) {
        this.url = url;
        this.data = data;
        this.headers = headers;
        let param = {
            url: url,
        };
        if (data) {
            Object.assign(param, { data: data});
        }
        if(headers){
            Object.assign(param, { headers: headers });
        }
        this.request = param;
    }

    async _Request(request_) {
        if(!request_){
            return null;
        }
        let response__;
        //let this_ = this;
        await Axios(request_).then(function(response){
            response__ = {
                status: true,
                data: response.data
            };
        }).catch(function(error){
            //this_.$message.error(error);
            //console.log(error.response.data.msg);
            //Message.error(error);
            //Message.error(error.response.data.msg);
            response__ =  {
                status: false,
                data: error
            };
        });
        return await response__;
    }

    POST() {
        let request = this.request;
        Object.assign(request, { method: 'POST'});
        return this._Request(request);
    }

    GET() {
        let request = this.request;
        Object.assign(request, { method: 'GET'});
        return this._Request(request);
        /**
         * response = {
                status: false,
                data: '[GET]bad request, unknown error'
            };
         */
    }

    Customize(method = "GET") {
        let request = this.request;
        Object.assign(request, { method: method});
        return this._Request(request);
    }

}

export {
    Request
}