import {AUTHIRITYDATA} from "../common/ApiUrlConfig";
export default class authirityDataApi{
  static  getauthiritysList(cb){
    fetch(AUTHIRITYDATA).then((response)=>{
      response.json().then((data)=> {
        cb(data);
      })
    })
  }
}