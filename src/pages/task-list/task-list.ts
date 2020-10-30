import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController } from 'ionic-angular';
import { from } from 'rxjs/observable/from';

/**
 * Generated class for the TaskListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//  LazyLoadingを実現するため
@IonicPage()
@Component({
  selector: 'page-task-list',
  templateUrl: 'task-list.html',
})
export class TaskListPage {
  tasks: {name: string}[]= [
    {name: 'タスク1'},
    {name: 'タスク2'},
  ];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    public alertCtrl: AlertController
    ) {}
  ionViewWillEnter(){
    if(localStorage.getItem('tasks')){
      this.tasks = JSON.parse(localStorage.getItem('tasks'));
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TaskListPage');
  }
// (アクションシートコントローラー)changeTaskを定義
// 引数をindexとして受け取る。型はnumber
  changeTask(index: number){
    let actionSheet = this.actionSheetCtrl.create({
      title: 'タスクの変更',
      buttons: [
        {
          text: '削除',
          role: 'destructive',
          handler: () => {
            // 削除の処理　splice=削除処理
            // index番目を削除する処理 →　localStorageの値を上書き
            this.tasks.splice(index, 1);
            localStorage.setItem('tasks', JSON.stringify(this.tasks));
          }
        },{
          text: '変更',
          handler: () =>{
             this._renameTask(index);
          }
        },{
          text: '閉じる',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  // タスク変更のアラート処理
  // actionSheetの中に書くとインデントが深くなってしまうので、別に書いて呼び出す
  _renameTask(index: number){
    let prompt = this.alertCtrl.create({
      title: '変更後のタスク',
      inputs: [
        {
          name: 'task',
          placeholder: 'タスク',
          value: this.tasks[index].name
        },
      ],
      buttons: [
        {
          text: '閉じる'
        },
        {
          text: '保存',
          handler: data => {
            // タスクのindex番目を書き換える
            this.tasks[index] = { name:data.task };
            // localStorageに保存する
            localStorage.setItem('tasks', JSON.stringify(this.tasks));
          }
        }
      ]
    });
    prompt.present();
  }

}


