import {LAWENFORCEMENTLOGDATA} from "../common/ApiUrlConfig";
export default class lawEnforcementLogDataApi{
  static  getlawEnforcementLogList(cb){
    fetch(LAWENFORCEMENTLOGDATA).then((response)=>{
      response.json().then((data)=> {
        cb(data);
      })
    })
  }
}