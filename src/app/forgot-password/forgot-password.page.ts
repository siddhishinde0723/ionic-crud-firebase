import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoadingController, NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  email: any;
  constructor(   private auth: AngularFireAuth,
    private navCtrl: NavController ) { }

  ngOnInit() {
  }

  reset() {
    if (this.email) {
      this.auth.sendPasswordResetEmail(this.email).then((r) => {
        console.log('Email Reset');
        this.navCtrl.navigateRoot('login');

      }).catch(e => {
        console.log(e);
      });
    }
  }
}
