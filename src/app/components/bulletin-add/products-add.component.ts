// Import necessary Angular modules and services
import { Component } from '@angular/core';
import { MaterialModule } from '../../shared/material.module';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductsService } from '../../services/bulletin.service';
import { Bulletin, Category } from '../../classes/Bulletin';

@Component({
  selector: 'app-products-add', // Define component selector
  standalone: true,
  imports: [MaterialModule, CommonModule, ReactiveFormsModule], // Import necessary modules
  templateUrl: './products-add.component.html', // Template URL
  styleUrl: './products-add.component.scss' // Style URL
})
export class ProductsAddComponent {

  formData = new FormData(); // Initialize form data for file upload
  bulletinData: Bulletin[] = []; // Array to hold brand data
  categoresData: Bulletin[] = []; // Array to hold brand data
  fileNameUploaded = ''; // Store the uploaded file name

  // Define form group for product addition
  productForm: FormGroup = this.fb.group({
    name: ['', Validators.required], // Product name with required validator
    file: ['', Validators.required], // File input with required validator
    price: ['', Validators.required], // Price with required validator
    brand: [null, Validators.required], // Brand with required validator
    producttype: [null, Validators.required], // Product type with required validator
    description: ['', Validators.required] // Description with required validator
  })

  constructor(
    private service: ProductsService, // Products service
    private fb: FormBuilder, // Form builder
    private router: Router, // Router service
    private snackBar: MatSnackBar // Snack bar service
  ) { }

  ngOnInit(): void {
    this.GetCategories(); // Fetch brands on component initialization
  }

  // Method to fetch brand data
  GetCategories() {
    this.service.getAllCategories().subscribe(result => {
      let brandList: any[] = result;
      brandList.forEach((element) => {
        this.categoresData.push(element); // Add each brand to brandsData array
      });
    });
  }

  // Method to handle file upload
  uploadFile = (files: any) => {
    let fileToUpload = <File>files[0];
    this.formData.append('file', fileToUpload, fileToUpload.name); // Append file to formData
    this.fileNameUploaded = fileToUpload.name; // Store the uploaded file name
  }

  // Method to handle form submission
  onSubmit() {
    if (this.productForm.valid) { // Check if form is valid
      this.formData.append('bulletinId', this.productForm.get('name')!.value);
      this.service.addBulletin(this.formData).subscribe(
        () => {
          this.navigateToProducts(); // On success, navigate to products
        },
        (error) => {
          if (error.error.text === 'Added a new product!') {
            this.navigateToProducts(); // Handle specific error case
          } else {
            this.snackBar.open(error.error, 'error', { duration: 2000 }); // Show error message
          }
        });
    }
  }

  // Method to handle navigation after product addition
  navigateToProducts() {
    let name = this.formData.append('name', this.productForm.get('name')!.value);
    this.clearData(); // Clear form data
    this.router.navigateByUrl('products').then((navigated: boolean) => {
      if (navigated) {
        this.snackBar.open(name + ' created successfully', 'X', { duration: 5000 }); // Show success message
      }
    });
  }

  // Method to clear form data
  clearData() {
    this.formData.delete('file');
    this.formData.delete('name');
    this.formData.delete('price');
    this.formData.delete('description');
    this.formData.delete('brand');
    this.formData.delete('producttype');
  }
}
