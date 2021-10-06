
class Request {

    constructor (url = null, data = null, headers = null) {
        this.url = url;
        this.data = data;
        this.headers = headers;
        let param = {
            url: url,
            data: data,
        };
        if(headers){
            Object.assign(param, { headers: headers });
        }
        this.request = param;
    }

    _Request(request_) {
        if(!request_){
            return null;
        }
        this.$axios(request_).then(function(response){
            return {
                status: true,
                data: response.data
            };
        }).catch(function(error){
            return {
                status: false,
                data: error
            };

        });
    }
    
    POST() {
        let request = this.request;
        Object.assign(request, { method: 'POST'});
        let response = this._Request(request);
        if(!response){
            return {
                status: false,
                data: '[POST]bad request, unknown error'
            };
        }
        return response;
    }
    
}

export{
    Request
}