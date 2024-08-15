import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styles: ``
})
export class ImageComponent implements OnInit{
imgSrc : string = '../../assets/images/Default-uploadImage.png'
selectedImage: any = null;

  formTemplate = new  FormGroup({
    artname : new FormControl(''),
    size : new FormControl(''),
    price : new FormControl(''),
    description : new FormControl(''),
    imageUrl : new FormControl(''),
  })

  constructor() {}

  ngOnInit() {
  }

  showPreview(event:any){
    if(event.target.files && event.target.files[0]){
      const reader = new FileReader();
      reader.onload = (e:any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    }
    else{
      this.imgSrc ='../../assets/images/Default-uploadImage.png';
      this.selectedImage = null;
    }
  }

}
