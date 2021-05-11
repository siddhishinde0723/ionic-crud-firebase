import { Component } from '@angular/core';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { AngularFirestore }from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  posts=[];
  constructor(private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth,
    private navCtrl: NavController,) {}

  ionViewWillEnter(){
    this.getPosts();
  }
  async getPosts(){
    const loader =  this.loadingCtrl.create({
      message: 'Please Wait...'
    });
     (await loader).present();
    try{
      this.firestore.collection('posts')
      .snapshotChanges()
      .subscribe(data => {
        this.posts = data.map(e => ({
            id: e.payload.doc.id,
            title: e.payload.doc.data(),
            details: e.payload.doc.data()
          }));console.log(this.posts);
        });
       (await loader).dismiss();
    }
    catch(e){
      this.showToast(e);

    }
  }

  async deletePost(id: string){
    const loader = this.loadingCtrl.create({
      message: 'Please Wait...'
    });
    (await loader).present();
    await this.firestore.doc('posts/' + id).delete();

    (await loader).dismiss();
  }
  showToast(message: string){
    this.toastCtrl
    .create({
      message,
      duration: 3000
    })
    .then(toastData => toastData.present());
  }
  logout(){
  this.afAuth.signOut().then(() => {
    // Sign-out successful.
    this.navCtrl.navigateRoot('login');
  })
  .catch(error => {
    this.showToast(error.message);
  });

}
}
