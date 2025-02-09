// import { NgClass } from "@angular/common";
// import { Component } from "@angular/core";

// @Component({
//   selector: 'synchro-toast',
//   standalone: true,
//   imports: [NgClass],
//   template: `
//   <div
//     class="toast"
//     [ngClass]="toast.type"
//     [@toastAnimation]
//   >
//     <div class="toast-icon">
//       <img
//         [src]="'/icons/' + toast.type + '.png'"
//         alt="{{ toast.type }} icon"
//       />
//     </div>
//     <div class="toast-content">
//       <div class="toast-title">{{ toast.title }}</div>
//       <div class="toast-message">{{ toast.message }}</div>
//     </div>
//     <button
//       class="close-btn"
//       (click)="removeToast(toast.id)"
//     >
//       X
//     </button>
//     <div class="toast-loader"></div>
//   </div>
//   `,
//   styleUrl: './register.component.scss',
// })
// export class RegisterComponent {
