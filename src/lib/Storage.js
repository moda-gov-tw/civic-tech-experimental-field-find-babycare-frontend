import isEmpty from 'lodash.isempty';

export default class Storage {
  static setWithExpiry({
    key,
    value,
    ttl, // time to live (ms)
  }) {
    const now = new Date();
    const item = {
      value,
      expiry: ttl === Infinity
        ? 'Infinity'
        : now.getTime() + ttl,
    };
    try {
      window.localStorage.setItem(key, JSON.stringify(item));
    } catch (err) {
      console.error(err);
    }
  }

  /**
   * @param {string} key
   */
  static getWithExpiry(key) {
    try {
      const itemStr = window.localStorage.getItem(key);
      if(!itemStr) {
        return null;
      }

      const item = JSON.parse(itemStr);
      const now = new Date();

      if(item.expiry !== 'Infinity' && now.getTime() > item.expiry) {
        window.localStorage.removeItem(key);
        return null;
      }
      return item.value;
    } catch (err) {
      console.error(err);
    }
  }

  /**
   * @param {string} key
   */
  static getSessionStorage(key) {
    try {
      const data = window.sessionStorage.getItem(key);
      return !isEmpty(data) ? JSON.parse(data) : '';
    } catch (err) {
      console.error(err);
    }
  }

  static removeLocalStorage(key) {
    window.localStorage.removeItem(key);
  }

  static setSessionStorage(key, value) {
    try {
      window.sessionStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.error(err);
    }
  }

  static removeSessionStorage(key) {
    try {
      return window.sessionStorage.removeItem(key);
    } catch (err) {
      console.error(err);
    }
  }
}
