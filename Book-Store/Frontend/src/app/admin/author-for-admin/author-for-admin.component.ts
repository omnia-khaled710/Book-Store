
import { Component } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import {FormBuilder, FormControl,FormGroup,Validators} from '@angular/forms';
import { AuthorService } from 'src/app/services/author.service';

@Component({
  selector: 'app-author-for-admin',
  templateUrl: './author-for-admin.component.html',
  styleUrls: ['./author-for-admin.component.scss']
})
export class AuthorForAdminComponent {

  imagefile!:File;
  updatedCurrentElementId:any;
  currentPage = 1; // start with the first page
  itemsPerPage = 4; // show 5 items per page

  allAuthores:any;
  constructor(private __authServices: AuthorService,private fbuilder:FormBuilder)
  {
    this.__authServices.getAuthor().subscribe((res)=>
    {
      this.allAuthores = res;
    })

  }

  addAuthorForm:FormGroup = new FormGroup(
    {
      firstName: new FormControl('',[Validators.required]),
      lastName: new FormControl('',[Validators.required]),
      dateOfBirth :  new FormControl('',[Validators.required]),
      breif : new FormControl('',[Validators.required]),
      Image : new FormControl('',[Validators.required]),
    }
  )

  updateAuthorForm:FormGroup = new FormGroup(
    {
      firstName: new FormControl('',[Validators.required]),
      lastName: new FormControl('',[Validators.required]),
      dateOfBirth :  new FormControl('',[Validators.required]),
      breif : new FormControl('',[Validators.required]),
      Image : new FormControl('',[Validators.required]),
    }
  )


  addphoto(event:any){
    if(event.target.files.length>0){
     console.log(event.target.files.length);
      this.imagefile=event.target.files[0];
      this.addAuthorForm.patchValue({
        photo:this.imagefile
      });
    }
  }

  addAuthor()
  {
    const formdata=new FormData();
      formdata.append('firstName',this.addAuthorForm.get('firstName')?.value)
      formdata.append('lastName',this.addAuthorForm.get('lastName')?.value)
      formdata.append('dateOfBirth',this.addAuthorForm.get('dateOfBirth')?.value)
      formdata.append('breif',this.addAuthorForm.get('breif')?.value)
      formdata.append('Image',this.imagefile)
        this.__authServices.addAuthor(formdata).subscribe(
      {
        
   next: res => {
        alert('Added Successfully');
        let layer:any = document.getElementById("layer");
        layer.style.display = "none";
        location.replace("admin/authors");
      },
      error: err => console.log(`${err} Author is already exist`),
      complete: () => {

     }
    
    })

    }

    showAddBox()
    {
      let layer:any = document.getElementById("layer");
      layer.style.display = "block";
    }
    closeAddBox()
    {
      let layer:any = document.getElementById("layer");
      layer.style.display = "none";
    }

    showUpdateBox(id:any)
    {
      let updatelayer:any = document.getElementById("updatelayer");
      updatelayer.style.display = "block";
      let updatedAuhtor = this.allAuthores.filter((res:any)=>{
        return res._id == id;
      })
      this.updateAuthorForm.setValue({
        'firstName':updatedAuhtor[0].firstName,
        'lastName':updatedAuhtor[0].lastName,
        'dateOfBirth':updatedAuhtor[0].dateOfBirth,
        'breif':updatedAuhtor[0].breif,
        'Image':updatedAuhtor[0].Image,


      })

      this.updatedCurrentElementId = updatedAuhtor;
    }
    closeUpdateBox()
    {
      let updatelayer:any = document.getElementById("updatelayer");
      updatelayer.style.display = "none";
    }

    updateAuthor(form:any)
    {
      let formValue:object = form.value

      this.__authServices.updateAuthor(this.updatedCurrentElementId[0]._id,formValue).subscribe(
        {
        next: res => {
          alert('Update Successfully')
          let updatelayer:any = document.getElementById("updatelayer");
          updatelayer.style.display = "none";
          location.replace("/admin/authors");
        },
        error: err => alert(`${err.error.status} Author is already exist`),
        complete: () => {
  
        }
      })
    }

    deleteAuthor(id:any)
    {
     let prompt:any = window.prompt("Are You Sure to delete plz write yes or no");
     if(prompt == "yes" ||prompt == "Yes" || prompt == "YES" )
     {
        this.__authServices.deleteAuthor(id).subscribe(
          {
          next: res => {
            alert('Deleted Successfully');
            location.replace("/admin/authors");
          },
          error: err => console.log(`PLZ tray again`),
          complete: () => {
    
         }
        })
     }
    }
}