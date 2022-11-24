class LocalCache {
  setCache(key: string, val: any) {
    window.localStorage.setItem(key, JSON.stringify(val));
  }
  getCache(key: string) {
    const val = window.localStorage.getItem(key);
    if (val) {
      return JSON.parse(val);
    }
  }
  removeCache(key: string) {
    window.localStorage.removeItem(key);
  }
  clearCache() {
    window.localStorage.clear();
  }
}

class SessionCache {
  setCache(key: string, val: any) {
    window.sessionStorage.setItem(key, JSON.stringify(val));
  }
  getCache(key: string) {
    const val = window.sessionStorage.getItem(key);
    if (val) {
      return JSON.parse(val);
    }
  }
  removeCache(key: string) {
    window.sessionStorage.removeItem(key);
  }
  clearCache() {
    window.sessionStorage.clear();
  }
}

export const localCache = new LocalCache();
export const sessionCache = new SessionCache();
