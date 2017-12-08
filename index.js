const localName = 'clinic__'

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
