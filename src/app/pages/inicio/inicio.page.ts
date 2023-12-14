import { Component, OnInit } from '@angular/core';
import {DataService} from "../../services/data.service";
import {Post} from "../../common/interfaces";
import {PopoverController} from "@ionic/angular";
import {idCard} from "ionicons/icons";
import {PopoverContentPage} from "../popover-content/popover-content.page";

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

  constructor(private dataService: DataService, private popoverController: PopoverController) { }

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
      this.skeleton = true;
      event.target.complete();
    }, 1000);
    this.skeleton = false;
  }


  //Popover

  async presentPopover(post: Post){
    const popover = await this.popoverController.create(
      {
        component: PopoverContentPage,
        componentProps:{
          title: post.title,
          message: post.body,
        },
      }
    );
    return await  popover.present();
  }

}
