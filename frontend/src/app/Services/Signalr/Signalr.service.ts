// import { Injectable, OnInit } from '@angular/core';
// import * as signalR from '@microsoft/signalr';
// import { ProductsService } from '../Products/Products.service';
// import { IProduct } from '../../Models/IProduct';

// @Injectable({
//   providedIn: 'root'
// })
// export class SignalrService  implements OnInit{

//   private connection: signalR.HubConnection;
//   ProductChangesByCatID:IProduct[] = [];
//   constructor(private proService : ProductsService) {
//     this.connection = new signalR.HubConnectionBuilder()
//       .withUrl("https://localhost:7243/studentHub")  // This should match your server-side SignalR endpoint.
//       .build();

//     // Start the SignalR connection
//     this.connection.start().then(() => {
//       console.log("SignalR connection started");
//     }).catch(err => console.error("Error starting SignalR connection: " + err.toString()));

//     // Listen for "DeleteData" events from the server
//     this.connection.on("DeleteData", (student_id: number) => {
//       console.log("Student deleted:", student_id);
//       this.removeStudentFromTable(student_id);
//     });

//   }
//   ngOnInit(): void {
//     this.proService.getAllProducts().subscribe((data)=>{
//       this.ProductChangesByCatID = data;
//       console.log("in initialize");
//     });
    
//   }

//   // Call the server-side DeleteStudent method
//   public deleteStudent(student_id: number) {
//     console.log("in deleteStudent"  + student_id);
//     return this.connection.invoke("DeleteStudent", student_id)
//       .then(() => console.log("DeleteStudent invoked successfully"))
//       .catch(err => console.error("Error invoking DeleteStudent:", err.toString()));
//   }

  

//   // Function to remove a student row from the table by student_id
//   private removeStudentFromTable(student_id: number) {
//   const row = document.querySelector(`tr[data-student-id='${student_id}']`);
//     //this.ProductChangesByCatID = this.ProductChangesByCatID.filter(product => product.id !== student_id);

//     console.log("RowWW  "+row);
//     if (row) {
//       row.remove();
//     } else {
//       console.error("Student row not found for ID:", student_id);
//     }
//   }
// }
