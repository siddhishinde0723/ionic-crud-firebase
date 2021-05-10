import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoadingController, ToastController, NavController } from '@ionic/angular';
import {Post} from '../models/post.model';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.page.html',
  styleUrls: ['./add-post.page.scss'],
})
export class AddPostPage implements OnInit {

  post = {} as Post;

  constructor(private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private firestore: AngularFirestore) { }

  ngOnInit() {
  }
  async createPost(post: Post){
  if(this.formValidation()){
    const loader = this.loadingCtrl.create({
      message: 'Please Wait..'
  });
  (await loader).present();
  try{
    await this.firestore.collection('posts').add(post);

  }
  catch(e){
    this.showToast(e);
  }
  (await loader).dismiss();
  this.navCtrl.navigateRoot('home');

  }
}
  formValidation(){
    if(!this.post.title){
      this.showToast('Enter title');
      return false;
    }
    if(!this.post.details){
      this.showToast('Enter details');
      return false;
    }
    return true;
  }



  showToast(message: string){
    this.toastCtrl
    .create({
      message,
      duration: 1000
    })
    .then(toastData => toastData.present());
  }


}
