import {ACCOUNTSDATA} from "../common/ApiUrlConfig";
export default class accountsDataApi{
  static  getAccountsList(cb){
    fetch(ACCOUNTSDATA).then((response)=>{
      response.json().then((data)=> {
        cb(data);
      })
    })
  }
}