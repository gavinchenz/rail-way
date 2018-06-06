import {MODELPARAMETERDATA} from "../common/ApiUrlConfig";
export default class modelParameterData{
  static  getmodelParameterList(cb){
    fetch(MODELPARAMETERDATA).then((response)=>{
      response.json().then((data)=> {
        cb(data);
      })
    })
  }
}