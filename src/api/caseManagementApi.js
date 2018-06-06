import {CASEMANAGEMENTDATA} from "../common/ApiUrlConfig";
export default class caseManagementDataApi{
  static  getCaseManagementList(cb){
    fetch(CASEMANAGEMENTDATA).then((response)=>{
      response.json().then((data)=> {
        cb(data);
      })
    })
  }
}