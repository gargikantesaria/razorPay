import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { LoadingController } from 'ionic-angular';


@Injectable()
export class WebserviceProvider {

  data;
  constructor(public http: Http,public loadingCtrl: LoadingController) {}

  callPost(url,data) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let options = new RequestOptions({ headers: headers });

    let load=this.loadingCtrl.create({});
    load.present();

    return new Promise((resolve,reject) => {
      this.http.post("SERVER_URL"+ url,data).subscribe((res) => {
        load.dismissAll();
          resolve(res);  
      },(err)=>{
        reject(err);
        load.dismissAll()
      })
    });
  }

  callGet(url){
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let options = new RequestOptions({ headers: headers });

    let load=this.loadingCtrl.create({});
    load.present();

    return new Promise((resolve,reject) => {
      this.http.get("SERVER_URL"+ url).subscribe((res) => {
        load.dismissAll();
          resolve(res);  
      },(err)=>{
        reject(err);
        load.dismissAll()
      })
    });
  }

}
