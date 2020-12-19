import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

interface Slide {
  title: string;
  subTitle: string;
  description: string;
  icon: string;
  imageSrc: string;
  imageAlt: string;
}

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {
  slideOps = {
    initialSlide: 0,
    slidesPerView: 1,
    centeredSlides: true,
    speed: 400
  };

  slides: Slide[] = [
    {
      title: 'Escucha tu música',
      subTitle: 'EN CUALQUIER LUGAR',
      description: 'Los mejores álbumes, las mejores canciones. Escucha y comparte cualquier momento, a todas horas.',
      icon: 'play',
      imageSrc: 'assets/img/logo.png',
      imageAlt: 'Piero Music Logo'
    },
    {
      title: 'Disfruta de nuestro reproductor',
      subTitle: 'DE VIDEOS INCREIBLES',
      description: 'Los mejores álbumes, las mejores canciones. Escucha y comparte cualquier momento, a todas horas.',
      icon: 'videocam',
      imageSrc: 'assets/img/logo.png',
      imageAlt: 'Piero Music Logo'
    },
    {
      title: 'Accede al exclusivo',
      subTitle: 'MODO DEPORTE',
      description: 'Los mejores álbumes, las mejores canciones. Escucha y comparte cualquier momento, a todas horas.',
      icon: 'play',
      imageSrc: 'assets/img/logo.png',
      imageAlt: 'Piero Music Logo'
    }
  ];
  constructor(
    private router: Router,
    private storage: Storage
  ) { }

  ngOnInit() {
  }

  finish() {
    this.storage.set('isIntroShowed', true);
    this.router.navigateByUrl('/menu');
  }
}
