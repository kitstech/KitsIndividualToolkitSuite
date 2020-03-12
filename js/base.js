/**
 * KITS
 * Individual
 * Toolkit
 * Suite
 * https://github.com/kitstech/KitsIndividualToolkitSuite
 */
const kits = {};

kits.ajax = function(url, param, callback) {
    const p = new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', url);
        xhr.onload = () => resolve(xhr);
        xhr.onerror = () => reject(xhr);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
        if(typeof param === 'string') {
            //key1=value1&key2=value2 ...
        } else {
            param = Object.keys(param).map(function(k) {
                return encodeURIComponent(k) + '=' + encodeURIComponent(param[k]);
            }).join('&');
        }
        xhr.send(param);
    });
    p.then(function(httpRequest) {
        const json = parseJsonString(httpRequest.responseText);
        if(typeof callback === 'function' && json !== null) {
            callback(json, httpRequest);
        }
    }).catch(function(httpRequest) {
        console.error(httpRequest.statusText, httpRequest);
    });

    const parseJsonString = function(s) {
        try {
            const json = JSON.parse(s);
            return (typeof json === 'object') ? json : null;
        } catch(e) {
            return null;
        }
    };
};