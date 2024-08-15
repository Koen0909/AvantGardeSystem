import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { map } from 'rxjs';

@Component({
  selector: 'app-admin-reports',
  templateUrl: './admin-reports.component.html',
  styleUrl: './admin-reports.component.css'
})
export class AdminReportsComponent implements OnInit{
  salesData: { month: string, totalSales: number }[] = [];

  constructor(private firestore: Firestore) { }

  ngOnInit(): void {
    this.loadSalesData();
  }

  loadSalesData(): void {
    const salesCollection = collection(this.firestore, 'sales'); // Adjust path as needed
    collectionData(salesCollection, { idField: 'id' })
      .pipe(
        map(sales => this.aggregateSalesByMonth(sales))
      )
      .subscribe(aggregatedData => {
        this.salesData = aggregatedData;
      });
  }

  aggregateSalesByMonth(sales: any[]): { month: string, totalSales: number }[] {
    const salesByMonth: { [key: string]: number } = {};

    sales.forEach(sale => {
      const saleDate = new Date(sale.date); // Adjust date field as needed
      const month = `${saleDate.getFullYear()}-${saleDate.getMonth() + 1}`;
      salesByMonth[month] = (salesByMonth[month] || 0) + sale.amount; // Adjust amount field as needed
    });

    return Object.keys(salesByMonth).map(month => ({
      month,
      totalSales: salesByMonth[month]
    }));
  }
}
