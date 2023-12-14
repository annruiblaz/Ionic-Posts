import { Component, OnInit } from '@angular/core';
import {DataService} from "../../services/data.service";
import {Post} from "../../common/interfaces";
import {PopoverController} from "@ionic/angular";
import {idCard} from "ionicons/icons";

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  infoPost: Post[] = [];
  skeleton = false;
  title = '';
  message = '';

  constructor(private dataService: DataService, public popoverController: PopoverController) { }

  ngOnInit() {
    this.cargarPosts();
    this.doRefresh(null);
  }

  //Api
  private cargarPosts() {
    return this.dataService.getPosts().subscribe(
      {
        next: data => {
          this.infoPost = data;
        },
        error: err => {
          console.log(err);
        },
        complete: () => {
          console.log('Completado')
        }
      }
    )
  }

  //Refresher
  doRefresh(event: any){
    setTimeout(() => {
    //  this.infoPost.push(...Array(10));
      this.skeleton = true;
      event.target.complete();
    }, 1000);
    this.skeleton = false;
    console.log('REgresejd acabado')
  }


  //Popover

  async presentPopover(post: Post){
    const popover = await this.popoverController.create(
      {
        component: InicioPage,
        componentProps:{
          title: post.title,
          message: post.body,
        },
      }
    );
    return await  popover.present();
  }
 /* async presentPopover(e: Event){
    const popover = await this.popoverController.create({
      component: InicioPage,
      event: e,
      componentProps: {
        titulo: this.title,
        mensaje: this.message,
      },
      side: "bottom",
      alignment: "center"
    });

    await popover.present();

    const result = await popover.onDidDismiss();
    // if(result.data){
    //   this.title = 'Dunciona';
    //   this.message = 'Pepe';
    // }
  }*/
}
