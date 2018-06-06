import {SYSTEMCONFIGURATIONDATA} from "../common/ApiUrlConfig";
export default class systemConfigurationDataApi{
  static  getSystemConfigurationList(cb){
    fetch(SYSTEMCONFIGURATIONDATA).then((response)=>{
      response.json().then((data)=> {
        cb(data);
      })
    })
  }
}