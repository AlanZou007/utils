export const is_IOS = typeof window !== 'undefined' && /(iPhone|iPad|iPod|iOS)/i.test(window.navigator.userAgent);

export const is_Android = typeof window !== 'undefined' && /(Android)/i.test(window.navigator.userAgent);

export const is_Wechat = typeof window !== 'undefined' && /MicroMessenger\/([\d]+)/i.test(window.navigator.userAgent);
