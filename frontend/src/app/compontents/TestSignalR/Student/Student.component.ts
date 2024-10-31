// import { Component } from '@angular/core';
// //import { SignalrService } from '../../../Services/Signalr/Signalr.service';


// @Component({
//   selector: 'app-student',
//   templateUrl: './student.component.html',
//   styleUrls: ['./student.component.css']
// })
// export class StudentComponent {

//  // student_id: number=1;

//   //constructor(private signalRService: SignalrService) {}

//   // Function to delete a student by ID
//   deleteStudent(student_id: number) {
//     if (!isNaN(student_id)) {
//       this.signalRService.deleteStudent(student_id)
//         .then(() => {
//           console.log("Student deleted successfully.");
//         })
//         .catch(err => {
//           console.error("Error deleting student:", err.toString());
//         });
//     } else {
//       console.error("Invalid student ID.");
//     }
//   }
// }
