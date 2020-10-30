import { Component } from '@angular/core';

@Component({
  selector: 'page-hello-kure',
  templateUrl: 'hello-kure.html'
})
export class HelloKurePage {
  title: string = 'タスク登録';
  task: string;
  tasks: {name: string}[] = [
    {name: 'タスク1'},
    {name: 'タスク2'}
  ];
  constructor(){

  }

  // このページを読み込む時にlocalStrageから値を読み込む必要がある（既に登録されたタスクを読み込み表示する）
  // ionViewWillEnter :ページ読み込みサイクル（自動実行されるメソッド）
  ionViewWillEnter(){
    if(localStorage.getItem('tasks')){
      this.tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    // localstorageにtasksが保存されている場合、tasksを取り出してくれる
    // JSON文字列になったtasksをJSON.parse()を使って配列に戻し、プロパティtasksを上書きしてくれる
  }
  // タスクの追加
  addTask(){
    // プロパティにメソッド内からアクセスするためにはthisをつける必要がある
    this.tasks.push({
      name: this.task
    });
    // WebStrageにデータを追加して保持させる
    localStorage.setItem('tasks' ,JSON.stringify(this.tasks));
    // taskを空にすることによって、,ion-inputを空にする
    this.task = '';
  }
}


