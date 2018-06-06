import {CLUSTEROPERATIONDATA} from "../common/ApiUrlConfig";
export default class clusterOperationDataApi{
  static  getClusterOperationList(cb){
    fetch(CLUSTEROPERATIONDATA).then((response)=>{
      response.json().then((data)=> {
        cb(data);
      })
    })
  }
}