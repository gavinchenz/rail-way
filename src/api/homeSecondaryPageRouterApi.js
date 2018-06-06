import {SECONDARYPAGEROUTERDATA} from "../common/ApiUrlConfig";
export default class SecondaryPageRouterDataApi{
  static  getSecondaryPageRouterDataList(cb){
    fetch(SECONDARYPAGEROUTERDATA).then((response)=>{
      response.json().then((data)=> {
        cb(data);
      })
    })
  }
}