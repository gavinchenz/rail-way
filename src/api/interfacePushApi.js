import {INTERFACEPUSHDATA} from "../common/ApiUrlConfig";
export default class interfacePushDataApi{
  static  getInterfacePushList(cb){
    fetch(INTERFACEPUSHDATA).then((response)=>{
      response.json().then((data)=> {
        cb(data);
      })
    })
  }
}