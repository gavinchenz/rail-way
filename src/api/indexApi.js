import {INDEXNAVDATA} from "../common/ApiUrlConfig";
export default class IndexNavDataApi{
  static  getNavList(cb){
    fetch(INDEXNAVDATA).then((response)=>{
      response.json().then((data)=> {
        cb(data);
      })
    })
  }
}