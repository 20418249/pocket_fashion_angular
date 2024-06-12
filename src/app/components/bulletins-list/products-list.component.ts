// Import necessary Angular modules and services
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ProductsService } from '../../services/bulletin.service';
import { Bulletin } from '../../classes/Bulletin';
import { MatTableDataSource } from '@angular/material/table';
import { MaterialModule } from '../../shared/material.module';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-products-list', // Define component selector
  standalone: true,
  imports: [MaterialModule, CommonModule], // Import necessary modules
  templateUrl: './products-list.component.html', // Template URL
  styleUrl: './products-list.component.scss' // Style URL
})
export class ProductsListComponent implements AfterViewInit, OnInit { 

  // Define columns to be displayed in the table
  displayedColumns: string[] = ['image', 'name', 'price', 'brand', 'productTypeName', 'description'];
  dataSource = new MatTableDataSource<Bulletin>(); // Data source for the table

  constructor(private service: ProductsService, private snackBar: MatSnackBar) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator; // ViewChild for paginator
  @ViewChild(MatSort) sort!: MatSort; // ViewChild for sorting

  ngOnInit(): void {
    // Fetch products on component initialization
    this.service.getBulletins().subscribe({
      next: (bulletins) => {
        this.dataSource.data = bulletins; // Assign fetched products to data source
        this.snackBar.open('Success', 'success', { duration: 2000 }); // Show success message
      },
      error: (error) => {
        this.snackBar.open(error.error, 'error', { duration: 2000 }); // Show error message
      }
    });
  }

  ngAfterViewInit() {
    // Initialize paginator and sorting after view initialization
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // Apply filter to the table data
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase(); // Filter data source based on input value
  }
}
