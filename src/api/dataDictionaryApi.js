import {DATADICTIONARYDATA} from "../common/ApiUrlConfig";
export default class dataDictionaryDataApi{
  static  getDataDictionaryList(cb){
    fetch(DATADICTIONARYDATA).then((response)=>{
      response.json().then((data)=> {
        cb(data);
      })
    })
  }
}