/**
 * 判断dom是否有该类名
 *
 * @param {dom} el
 * @param {string} className
 */
export function hasClass(el, className) {
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)');
  return reg.test(el.className);
}

/**
 * 添加类名
 *
 * @param {dom} el
 * @param {string} className
 */
export function addClass(el, className) {
  if (hasClass(el, className)) {
    return;
  }
  let newClass = el.className.split(' ');
  newClass.push(className);
  el.className = newClass.join(' ');
}

/**
 * 删除类名
 *
 * @param {dom} el
 * @param {string} className
 */
export function removeClass(el, className) {
  if (!hasClass(el, className)) {
    return;
  }

  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)', 'g');
  el.className = el.className.replace(reg, ' ');
}

/**
 * 设置过去自定义属性
 *
 * @param {dom} el
 * @param {string} name
 * @param {*} val
 */
export function getData(el, name, val) {
  let prefix = 'data-';
  if (val) {
    return el.setAttribute(prefix + name, val);
  }
  return el.getAttribute(prefix + name);
}

/**
 * 获取元素大小 位置信息
 *
 * @param {dom} el
 */
export function getRect(el) {
  if (el instanceof window.SVGElement) {
    let rect = el.getBoundingClientRect();
    return {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height
    };
  } else {
    return {
      top: el.offsetTop,
      left: el.offsetLeft,
      width: el.offsetWidth,
      height: el.offsetHeight
    };
  }
}


