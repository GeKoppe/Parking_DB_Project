import { conf } from './config';

const RestCommunicator = {
    baseUrl: `http://${conf.api.host}:${conf.api.port}`,

    getUsage: () : number => {
        const usage = fetch(RestCommunicator.baseUrl + `${conf.api.routes.usage}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(data => {
            return data.json() as Promise<{usage: number}>;
        })
        .then(data => data.usage);
        
        return -1;
    }
}