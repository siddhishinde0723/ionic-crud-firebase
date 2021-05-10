import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import{User} from '../models/user.mode';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  user ={} as User;
  constructor(private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private afAuth: AngularFireAuth,
    private navCtrl: NavController ) { }

  ngOnInit() {
  }
  async register(user: User){
    if(this.formValidation()){
      const loader = this.loadingCtrl.create({
        message: 'Please Wait..'
      });
      (await loader).present();
      try{
        await this.afAuth.
        createUserWithEmailAndPassword(user.email,user.password)
        .then(data => {
          console.log(data);
          this.navCtrl.navigateBack('login');


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
