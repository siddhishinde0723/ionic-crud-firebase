import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { User } from '../models/user.mode';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import firebase from 'firebase/app';
import 'firebase/auth';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
   user ={} as User;

   public userProfile: any = null;
    constructor(private toastCtrl: ToastController,
      private loadingCtrl: LoadingController,
      private afAuth: AngularFireAuth,
    //  private firebaseservice: FirebaseServiceProvider,
      private navCtrl: NavController,
     private fb: Facebook
      ) { }

    ngOnInit() {
    }
   facelogin(){
    this.fb.login(['email'])
    .then((response: FacebookLoginResponse) => {
      this.onLoginSuccess(response);
      console.log(response.authResponse.accessToken);
    }).catch((error) => {
      console.log(error);
      alert('error:' + error);
    });
   }
   onLoginSuccess(res: FacebookLoginResponse) {
    // const { token, secret } = res;
    const credential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
    this.afAuth.signInWithCredential(credential)
      .then((response) => {
        this.navCtrl.navigateRoot('home');
      });
    }
   loginGoogle(){
    this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    .then(res => {
    console.log(res);
    this.navCtrl.navigateRoot('home');
    });
    }

    async login(user: User){
      if(this.formValidation()){
        const loader = this.loadingCtrl.create({
          message: 'Please Wait..'
      });
      (await loader).present();
      try{
        await this.afAuth.
        signInWithEmailAndPassword(user.email,user.password).then(data =>{
          console.log(data);
          this.navCtrl.navigateRoot('home');
        });

      }catch(e){
        this.showToast(e);
      }
      (await loader).dismiss();
    }
  }
    formValidation(){
      if(!this.user.email){
        this.showToast('Enter email');
        return false;
      }
      if(!this.user.password){
        this.showToast('Enter password');
        return false;
      }
      return true;
    }



    showToast(message: string){
      this.toastCtrl
      .create({
        message,
        duration: 3000
      })
      .then(toastData => toastData.present());
    }


  }
