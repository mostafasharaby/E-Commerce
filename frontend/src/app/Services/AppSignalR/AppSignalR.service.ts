// import { Injectable } from '@angular/core';
// import * as signalR from '@microsoft/signalr';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root',
// })
// export class AppSignalRService {
//   private hubConnection: signalR.HubConnection;

//   constructor() {
//     this.hubConnection = new signalR.HubConnectionBuilder()
//       .withUrl('https://localhost:7243/studentHub') // Use your actual backend URL here
//       .build();
//   }

//   // startConnection(): Observable<void> {
//   //   return new Observable<void>((observer) => {
//   //     this.hubConnection
//   //       .start()
//   //       .then(() => {
//   //         console.log('Connection established with SignalR hub');
//   //         observer.next();
//   //         observer.complete();
//   //       })
//   //       .catch((error) => {
//   //         console.error('Error connecting to SignalR hub:', error);
//   //         observer.error(error);
//   //       });
//   //   });
//   // }

//   // AppSignalR.service.ts
// startConnection(): Observable<void> {
//   return new Observable<void>((observer) => {
//     if (this.hubConnection.state === signalR.HubConnectionState.Disconnected) {
//       this.hubConnection.start().then(() => {
//         console.log('SignalR connection started');
//         observer.next();
//         observer.complete();
//       }).catch(err => {
//         console.error('Error starting SignalR connection:', err);
//         observer.error(err);
//       });
//     } else {
//       console.warn('Connection is already started');
//       observer.complete(); // Connection is already started, no need to restart.
//     }
//   });
// }

//   receiveMessage(): Observable<{ user: string; message: string }> {
//     return new Observable<{ user: string; message: string }>((observer) => {
//       this.hubConnection.on('ReceiveMessage', (user: string, message: string) => {
//         observer.next({ user, message });
//       });
//     });
//   }

//   sendMessage(user: string, message: string): void {
//     this.hubConnection.invoke('SendMessage', user, message).catch((err) => {
//       console.error(err.toString());
//     });
//   }


  
// //   deleteInvoke(id:number): void {    
// //      this.hubConnection.invoke("DeleteStudent",id )
// //          .then(() => {
// //              console.log("Student Deleted successfully.");
// //          })
// //          .catch(err => {
// //              console.error("Error invoking DeleteStudent: " + err.toString());
// //          });
// //  }

//  deleteInvoke(id: number): void {
//   if (this.hubConnection.state === signalR.HubConnectionState.Connected) {
//     console.log("i am deleting");
//     this.hubConnection.invoke("DeleteStudent", id)
//       .then(() => {
//         console.log("Student Deleted successfully.");
//       })
//       .catch(err => {
//         console.error("Error invoking DeleteStudent: " + err.toString());
//       });
//   } else {
//     console.error("Cannot invoke delete. Hub is not connected.");
//   }
// }

//  deleteOn(): Observable<number> {
//   return new Observable<number>((observer) => {
//     this.hubConnection.on('DeleteData', (student_id: number) => {
//       observer.next(student_id); // Emit the student_id to subscribers
//     });
//   });
// }

// ngOnDestroy(): void {
//   if (this.hubConnection.state !== signalR.HubConnectionState.Disconnected) {
//     this.hubConnection.stop().then(() => {
//       console.log('SignalR connection stopped');
//     }).catch(err => {
//       console.error('Error stopping SignalR connection:', err);
//     });
//   }
// }


// }
