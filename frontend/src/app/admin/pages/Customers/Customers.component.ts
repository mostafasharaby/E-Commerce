import { Component, OnInit } from '@angular/core';
import { User } from '../../../user/pages/models/IProduct';
import { Subscription } from 'rxjs';
import { CustomerService } from '../Services/Customer.service';
@Component({
  selector: 'app-Customers',
  templateUrl: './Customers.component.html',
  styleUrls: ['./Customers.component.css']
})
export class CustomersComponent implements OnInit {

  constructor(private CustomerService: CustomerService) {}

  users: User[] = [];
  selectedUser: User | null = null;
  private userSubscription!: Subscription;
  ngOnInit() {
    this.loadUsers();
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
      console.log('User subscription has been unsubscribed');
    }
  }

  loadUsers(): void {
    this.userSubscription = this.CustomerService.getUsers().subscribe(
      (data: User[]) => {
        this.users = data;
        //console.log( "users " ,this.users);
      },
      (error) => {
        console.error('Error loading users:', error);
      }
    );
  }

  onSelectUser(user: User): void {
    this.selectedUser = user;
  }
  confirmDelete(userId: string): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.CustomerService.deleteUser(userId).subscribe(
        () => {
          this.loadUsers(); 
        },
        (error) => {
          console.error('Error deleting user:', error);
        }
      );
    }
  }

}
