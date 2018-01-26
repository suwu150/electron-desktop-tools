/**
 * Created by jkwu on 18-1-23.
 */
class baseModel {
  constructor(options = { private: false }, data = []) { // class constructor，node.js 5.6暂时不支持options = {}, data = []这样传参
    this.name = 'Base';
    this.url = 'http://azat.co/api';
    this.data = data;
    this.options = options;
  }

  getName() { // class method
    console.log(`Class name: ${this.name}`);
  }
}

class AccountModel extends baseModel {
  constructor(options, data) {
    super({private: true}, ['32113123123', '524214691']); //call the parent method with super
    this.name = 'Account Model';
    this.url +='/accounts/';
  }
}


const accountModel = new AccountModel();
console.log(accountModel.options);
console.log(accountModel.data);
console.log(accountModel.name);
console.log(accountModel.url);

///
console.log('////////////////');
// const baseModelObj = new baseModel({ private: 'base'}, ['12133', '32323']);
const baseModelObj = new baseModel();
console.log(baseModelObj.options);
console.log(baseModelObj.data);
console.log(baseModelObj.name);
console.log(baseModelObj.url);