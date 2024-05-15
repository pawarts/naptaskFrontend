


export const Request = (url, params, responseType, dataSend, resultProccessingFunction, method = "GET") => {

    //Set your local backend localhost port
    const PORT = 10000

    const domainBackend = process.env.BACKEND_HOST || `http://localhost:${PORT}`

    const responseSwitch = (response) => {
        switch (responseType) {
            case 'JSON':
                return response.json();
            case "status":
                return response.statusText();
            case "text":
                return response.text()
        }
    }

    const chooseParamsObject = () => {
        switch (method) {
            case "GET":
                return { method: method }

            default:
                return { method: method, ...params, body: JSON.stringify(dataSend) }
        }
    }



    fetch(`${domainBackend}${url}`, chooseParamsObject())
        .then(response => responseSwitch(response))
        .then(result => resultProccessingFunction(result))
        .catch(error => console.error(error))
}