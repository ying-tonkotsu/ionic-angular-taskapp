import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';

import { HelloKurePage } from '../pages/hello-kure/hello-kure';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloKurePage the root (or first) page
  rootPage = HelloKurePage;
  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen
  ) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'タスク登録', component: HelloKurePage },
      { title: 'タスク一覧', component:'TaskListPage'}
      // LasyLoadingするページは文字列として記述するルールがあるため''で囲む
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    // メニューを閉じる
    this.menu.close();
    // navigate to the new page if it is not the current page
    // メインコンテンツの入れ替え　pagesのcomponentにion-navを書き換える
    this.nav.setRoot(page.component);
  }
}
