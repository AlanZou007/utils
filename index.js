import {cookieConfig} from "XX";

const localName = 'clinic__' // 存入localStorage属性名

export const is_IOS = typeof window !== 'undefined' && /(iPhone|iPad|iPod|iOS)/i.test(window.navigator.userAgent)
export const is_Android = typeof window !== 'undefined' && /(Android)/i.test(window.navigator.userAgent)

export function setTitle(title) {
    document.title = title
    if (is_IOS) {
        let i = document.createElement('iframe')
        i.src = './favicon.ico'
        i.style.display = 'none'
        i.onload = () => {
            setTimeout(() => {
                i.remove()
            }, 0)
        }
        document.body.appendChild(i)
    }
}

export function saveToLocal(id, key, value) {
    let store = window.localStorage[localName];
    if (!store) {
        store = {};
        store[id] = {};
    } else {
        store = JSON.parse(store);
        if (!store[id]) {
            store[id] = {};
        }
    }
    store[id][key] = value;
    window.localStorage[localName] = JSON.stringify(store);
};

export function loadFromLocal(id, key, def) {
    let store = window.localStorage[localName];
    if (!store) {
        return def;
    }
    store = JSON.parse(store)[id];
    if (!store) {
        return def;
    }
    let ret = store[key];
    return ret || def;
};

export function readCookie(name) {
    let nameEQ = `${cookieConfig.prefix}_${name}=`;
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        // eslint-disable-next-line
        if (c.charAt(0) == ' ') {
            c = c.substring(1, c.length);
        }
        if (c.indexOf(nameEQ) === 0) {
            return c.substring(nameEQ.length, c.length);
        }
    }
    return null;
}

export function removeCookie(name) {
    let nameEQ = `${cookieConfig.prefix}_${name}`;
    saveCookie(nameEQ, "", -1);
}

export function urlParse() {
    const url = window.location.search;
    const obj = {};
    const reg = /[?&][^?&]+=[^?&]+/g;
    const arr = url.match(reg);
    // ['?id=12345', '&a=b']
    if (arr) {
        arr.forEach((item) => {
            const tempArr = item.substring(1).split('=');
            /* 编码decodeURIComponent */
            const key = decodeURIComponent(tempArr[0]);
            const val = decodeURIComponent(tempArr[1]);
            obj[key] = val;
        });
    }
    return obj;
}
