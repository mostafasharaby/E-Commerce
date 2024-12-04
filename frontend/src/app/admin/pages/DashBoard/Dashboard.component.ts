import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Chart } from 'chart.js/auto';

import { Subscription } from 'rxjs';

import { OrderDetails } from '../Model/order-model';
import { CustomerService } from '../Services/Customer.service';
import { OrderDetailsService } from '../Services/OrderDetails.service';
@Component({
  selector: 'app-Dashboard',
  templateUrl: './Dashboard.component.html',
  styleUrls: ['./Dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  salesData = [
    { data: [120, 150, 170, 200, 220], label: 'Sales ($)' }
  ];

  salesLabels = ['January', 'February', 'March', 'April', 'May'];

  chartOptions = {
    responsive: true,
  };

  @Output() settingsEvent = new EventEmitter<void>();
  private customerSubscription!: Subscription;
  private orderDetailsSubscription!: Subscription;


  ngAfterViewInit(): void {
    this.initializeCharts();
  }
  initializeCharts() {
    this.createSalesChart();
    this.createPerformanceChart();
  }



  createSalesChart() {
    const ctx = (document.getElementById('salesChart') as HTMLCanvasElement).getContext('2d');
    if (ctx) {
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June'],
          datasets: [{
            label: 'Sales',
            data: [65, 59, 80, 81, 56, 55],
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            fill: false
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }
  createPerformanceChart() {
    const ctx = (document.getElementById('performanceChart') as HTMLCanvasElement).getContext('2d');
    if (ctx) {
      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Completed', 'Pending', 'In Progress', 'On Hold'],
          datasets: [{
            label: 'Performance',
            data: [300, 50, 100, 20],
            backgroundColor: ['#28a745', '#ffc107', '#17a2b8', '#dc3545'],
            hoverOffset: 4
          }]
        },
        options: {
          responsive: true
        }
      });
    }
  }
  emitSettingsEvent() {
    this.settingsEvent.emit();
  }
  totalOrders: number = 0;
  totalCustomers: number = 0;
  totalSales: number = 0;
  orderDetails: OrderDetails[] = [];
  constructor(private customerService: CustomerService, private orderDetailsService: OrderDetailsService) { }

  ngOnInit(): void {
    this.fetchOrders();
    this.fetchCustomers();
  }


  fetchCustomers(): void {
    this.customerSubscription = this.customerService.getUsers().subscribe((customers) => {
      this.totalCustomers = customers.length;
    });
  }

  fetchOrders(): void {
    this.orderDetailsSubscription = this.orderDetailsService.getOrderDetails().subscribe(
      (orders) => {
        this.totalOrders = orders.length;
        this.totalSales = orders.reduce((sum, order) => sum + (order.total || 0), 0);
        this.orderDetails = orders.slice(-2);  // Get the last 2 new orders
      },
      (error) => {
        console.error('Error loading order details:', error);
      }
    );
  }


  ngOnDestroy(): void {
    if (this.customerSubscription) {
      this.customerSubscription.unsubscribe(); 
      //console.log('Customer subscription has been unsubscribed');
    }

    if (this.orderDetailsSubscription) {
      this.orderDetailsSubscription.unsubscribe(); 
      //console.log('Order details subscription has been unsubscribed');
    }
  }


}
