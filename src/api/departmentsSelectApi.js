import {DEPARTMENTSELECTDATA} from "../common/ApiUrlConfig";
export default class departmentSelectDataApi{
  static  getDepartmentSelectList(cb){
    fetch(DEPARTMENTSELECTDATA).then((response)=>{
      response.json().then((data)=> {
        cb(data);
      })
    })
  }
}