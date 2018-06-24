
export default {
  get(key) {
    const record = JSON.parse(localStorage.getItem(key));
    if (!record || new Date().getTime() > record.expires) { return ''; }
    return unescape(record.value);
  },

  set(key, value, expiredays) {
    const expireDate = new Date();
    expireDate.setDate(expireDate.getDate() + expiredays);
    localStorage.setItem(key, JSON.stringify({ value: escape(value), expires: expireDate.getTime() }));
  },

  check(key, expiredays) {
    const value = this.get(key);
    if (value) {
      this.set(key, value, expiredays);
      return true;
    }
    return false;
  }
};
