
import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthorService } from 'src/app/services/author.service';
import { BooksService } from 'src/app/services/books.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-book-for-admin',
  templateUrl: './book-for-admin.component.html',
  styleUrls: ['./book-for-admin.component.scss']
})
export class BookForAdminComponent {
  categories!:any;
  authors!:any;

  imageFile!:File;
  updatedCurrentElementId:any;
  currentPage = 1; // start with the first page
  itemsPerPage = 5; // show 5 items per page
  allBook:any;
  constructor(private __bookServices: BooksService , private _categoryServices:CategoryService , private _authorServices:AuthorService)
  {
    this.__bookServices.getBooks().subscribe((res)=>
    {
      this.allBook = res.data.book;
    });
    this._categoryServices.getCategory().subscribe((res)=>{
      this.categories = res.data.categories;
    })
    this._authorServices.getAuthor().subscribe((res)=>{
      // console.log(res);
      this.authors = res;
    })
  }


  addBookForm:FormGroup = new FormGroup(
    {
      title: new FormControl('',[Validators.required]),
      categoryId: new FormControl('',[Validators.required]),
      AuthorId :  new FormControl('',[Validators.required]),
      desc : new FormControl('',[Validators.required]),
      photo : new FormControl('',[Validators.required]),
    }
  )

  updateBookForm:FormGroup = new FormGroup(
    {
      title: new FormControl('',[Validators.required]),
      categoryId: new FormControl('',[Validators.required]),
      AuthorId :  new FormControl('',[Validators.required]),
      desc : new FormControl('',[Validators.required]),
      photo : new FormControl('',[Validators.required]),
    }
  )

  addphoto(event:any)
  {     
    if(event.target.files.length>0){
       this.imageFile=event.target.files[0];
       this.addBookForm.patchValue({
         photo:this.imageFile
       });
  }
  }
  
  addBook()
  {

      const formdata=new FormData();
      formdata.append('title',this.addBookForm.get('title')?.value)
      formdata.append('categoryId',this.addBookForm.get('categoryId')?.value)
      formdata.append('AuthorId',this.addBookForm.get('AuthorId')?.value)
      formdata.append('desc',this.addBookForm.get('desc')?.value)

      formdata.append('photo',this.imageFile)
      

    this.__bookServices.addBook(formdata).subscribe(
      {
      next: res => {
        alert('Added Successfully')
        let layer:any = document.getElementById("layer");
        layer.style.display ="none";
        location.replace("/admin/book");
      },
      error: err => console.log(`Failed to Add Book`),
      complete: () => {

     }
    })
    }

    showAddBox()
    {
  console.log(this.addBook)

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

      let updatedbook = this.allBook.filter((res:any)=>{
        return res._id == id;
      })
      this.updateBookForm.setValue({
        'title':updatedbook[0].title,
        'photo':updatedbook[0].photo,
        'desc':updatedbook[0].desc,
        'categoryId':updatedbook[0].categoryId._id,
        'AuthorId':updatedbook[0].AuthorId._id
      })

      this.updatedCurrentElementId = updatedbook;
    }

    closeUpdateBox()
    {
      let updatelayer:any = document.getElementById("updatelayer");
      updatelayer.style.display = "none";
    }

    updateBook(form:any)
    {
      let formValue:object = form.value
      
      this.__bookServices.updateBook(this.updatedCurrentElementId?.[0]._id,formValue).subscribe(
        {
        next: res => {
          alert('Update Successfully')
          let updatelayer:any = document.getElementById("updatelayer");
          updatelayer.style.display = "none";
          location.replace("/admin/book");
        },
        error: err => alert(`${err.error.status} Failed to update`),
        complete: () => {
  
        }
      })
    }
    deleteBook(id:any)
    {
     let prompt:any = window.prompt("Are You Sure to delete plz write yes or no");
     if(prompt == "yes" ||prompt == "Yes" || prompt == "YES" )
     {
        this.__bookServices.deleteBook(id).subscribe(
          {
          next: res => {
            alert('Deleted Successfully');
            location.replace("/admin/book");
          },
          error: err => alert(`${err.error.status} Failed to update`),
          complete: () => {
    
          }
        })
            
     }
    }
}








