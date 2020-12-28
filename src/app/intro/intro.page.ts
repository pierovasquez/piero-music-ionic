import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

interface Slide {
  title: string;
  subTitle: string;
  description: string;
  icon: string;
  imageSrc: string;
  imageAlt: string;
  backgroundImage: string;
}

function initSlideOps() {
  return {
    initialSlide: 0,
    slidesPerView: 1,
    centeredSlides: true,
    speed: 400
  };
}

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage {
  slideOps = initSlideOps();

  slides: Slide[] = [
    {
      title: 'Play your music',
      subTitle: 'ANYWHERE YOU WANT',
      description: 'The best albums, the best songs. Listen and share at any time, at all hours.',
      icon: 'play',
      imageSrc: 'assets/img/logo.png',
      imageAlt: 'Piero Music Logo',
      backgroundImage: 'assets/img/microphone-640.jpg'
    },
    {
      title: 'Enjoy our player',
      subTitle: 'OF INCREDIBLE VIDEOS',
      description: 'Enter the video mode of our player and get access to clips, documentaries and making incredible offs of your favorite artist.',
      icon: 'videocam',
      imageSrc: 'assets/img/logo.png',
      imageAlt: 'Piero Music Logo',
      backgroundImage: 'assets/img/concert1.jpg'
    },
    {
      title: 'Access the exclusive',
      subTitle: 'SPORTS MODE',
      description: 'Create a playlist based on your physical activity. Have reports and access to what you need, integrated with GPS!',
      icon: 'bicycle',
      imageSrc: 'assets/img/logo.png',
      imageAlt: 'Piero Music Logo',
      backgroundImage: 'assets/img/vinyl-records.jpg'
    }
  ];
  constructor(
    private router: Router,
    private storage: Storage
  ) { }

  finish() {
    this.storage.set('isIntroShowed', true);
    this.router.navigateByUrl('/menu');
  }
}
