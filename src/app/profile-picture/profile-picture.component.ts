import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-picture',
  templateUrl: './profile-picture.component.html',
  styleUrls: ['./profile-picture.component.scss']
})
export class ProfilePictureComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  getImgPath(){
    let imgPath:string = JSON.parse(sessionStorage.getItem("user")!).picturePath;
    if(
      imgPath == undefined || imgPath == null || imgPath == "Nista"
    ){
      return ""
    }
    else {
      let concreteImg = imgPath.split("imgs")[1].replace("\\", "/");
      return `https://localhost:44339/imgs/${concreteImg}`;
    }
  }

}
