import {DEPARTMENTDATA} from "../common/ApiUrlConfig";
export default class departmentDataApi{
  static  getDepartmentList(cb){
    fetch(DEPARTMENTDATA).then((response)=>{
      response.json().then((data)=> {
        cb(data);
      })
    })
  }
}