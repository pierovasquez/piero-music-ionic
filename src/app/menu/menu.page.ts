import { Component } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage {

  constructor(
    private menu: MenuController,
    private navCtrl: NavController,
    private storage: Storage
  ) { }

  closeMenu() {
    this.menu.close();
  }

  logOut() {
    this.storage.remove('isUserLoggedIn');
    this.navCtrl.navigateRoot('/login');
  }

  goToSettings() {
    this.navCtrl.navigateRoot('menu/settings');
    this.closeMenu();
  }

  goToSports() {
    this.navCtrl.navigateRoot('menu/sports');
    this.closeMenu();
  }

  goToHome() {
    this.navCtrl.navigateRoot('menu/home');
    this.closeMenu();
  }
}
