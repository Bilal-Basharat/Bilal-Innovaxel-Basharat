import { HttpService } from "./HttpService";

function ApiService(){
    return {
        create:(values) => {
            return HttpService.post(`api/shorten`, values);
        },
    }
}

export default ApiService();