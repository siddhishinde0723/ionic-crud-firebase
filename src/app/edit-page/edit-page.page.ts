import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { Post } from '../models/post.model';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.page.html',
  styleUrls: ['./edit-page.page.scss'],
})
export class EditPagePage implements OnInit {

  post = {} as Post;
  id: any;

  constructor(private actRoute: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private firestore: AngularFirestore,
    private toastCtrl: ToastController,
    private navCtrl: NavController) {
    this.id = this.actRoute.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.getPostById(this.id);
  }
  async getPostById(id: string){
    const loader = this.loadingCtrl.create({
      message: 'Please Wait..'
    });
    (await loader).present();

    this.firestore
    .doc('posts/' + id)
    .valueChanges()
    .subscribe(data =>{
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      this.post.title;
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      this.post.details;
    });
    (await loader).dismiss();

  }
  async updatePost(post: Post){
    if (this.formValidation()){
      const loader = this.loadingCtrl.create({
        message: 'Pleasw wait..'
      });
      (await loader).present();
      try{
        await this.firestore.doc('posts/' + this.id).update(post);
      }catch(e){
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
      duration: 3000
    })
    .then(toastData => toastData.present());
  }
}
