import { HttpService } from "./HttpService";

function ApiService(){
    return {
        create:(values) => {
            return HttpService.post(`api/shorten`, values);
        },
        index:() => {
            return HttpService.get(`api/shorten`);
        },
        update:(short_code, newUrl) => {
            return HttpService.put(`api/shorten/${short_code}`, newUrl);
        },        
        delete:(values) => {
            return HttpService.delete(`api/shorten/${values}`);
        },
    }
}

export default ApiService();