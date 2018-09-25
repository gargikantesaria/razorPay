import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WebserviceProvider } from '../../providers/webservice/webservice';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  name; amount; email; mobileNumber;
  constructor(public navCtrl: NavController, private webService: WebserviceProvider) {}

  ionViewDidLodad() {}

  callPaymentMethod(){
    var options = {
      description: 'Credits towards consultation',
      // image: 'https://i.imgur.com/3g7nmJC.png',
      currency: 'INR',
      key: 'rzp_test_mgcXD3iQ0yDSVD',
      amount: this.amount,
      name: this.name,
      prefill: {
        email: this.email,
        contact: this.mobileNumber,
        name: this.name
      },
      theme: {
        color: '#F37254'
      },
      modal: {
        ondismiss: function() {
          console.log('dismissed')
        }
      }
    };

    var successCallback = function(payment_id) {
      callApi(payment_id, options.amount);
    };

    var cancelCallback = function(error) {
      console.log(error.description + ' (Error ' + error.code + ')');
    };

    RazorpayCheckout.open(options, successCallback, cancelCallback);

    var callApi = (payment_id, amount) => {
      let data = {
        'payment_id' : payment_id,
        'amount' : amount
      };
      // api to capture the payment
      this.webService.callPost('paymentCapture',data).then((response) => {
        console.log("Response is",response);
      }).catch((error) => {
        console.log(error);
      })
    }

  }
  getPaymentData(){
    // You will get all the payment transactions 
    this.webService.callGet('getallpayments').then((response) => {
      console.log("Response is",response);    
    }).catch((error) => {
      console.log(error);
    })
  }
  
}
