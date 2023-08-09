export * from './constants';

export const getFormBody = (params) => {
    let formBody = [];

    for (let property in params) {
        let encodedKey = encodeURIComponent(property) // 'user name' => 'user%20name'
        let encodedValue = encodeURIComponent(params[property]) // 'akshit 123' => 'akshit%2020123

        formBody.push(encodedKey+"="+encodedValue);
    }

    return formBody.join('&'); // 'username=akshit&password=123123'
}