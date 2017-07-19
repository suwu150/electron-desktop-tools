/**
 * Created by liuqiang on 2017/4/10.
 */
function generateUuid() {
  // 以当前的毫秒数作为唯一ID
  let uuid = '';
  uuid = new Date().getTime();
  return uuid;
}
export {
  generateUuid
};
