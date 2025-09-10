import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent {

  payments: any[] = [];
  payment: any = {};
  editingIndex: number | null = null;

  methods = ['Cash', 'Card', 'Bkash', 'Nagad'];

  // Add or Update Payment
  addOrUpdatePayment(data: any) {
    // Basic validation
    if (!data.guest || !data.amount || !data.method || !data.date) {
      Swal.fire('Error', 'All fields are required!', 'error');
      return;
    }

    // Method-specific validation
    if (data.method === 'Card') {
      if (!data.bankName || !data.cardNumber || !data.expiryDate) {
        Swal.fire('Error', 'All card details are required!', 'error');
        return;
      }
    }
    if (data.method === 'Bkash' || data.method === 'Nagad') {
      if (!data.accountNumber || !data.transactionId) {
        Swal.fire('Error', 'All transaction details are required!', 'error');
        return;
      }
    }

    if (this.editingIndex !== null) {
      this.payments[this.editingIndex] = { ...data };
      Swal.fire('Updated!', `Payment for ${data.guest} updated successfully.`, 'success');
      this.editingIndex = null;
    } else {
      this.payments.push({ ...data });
      Swal.fire({
        title: 'Payment Added!',
        html: `<b>${data.guest}</b> paid <b>${data.amount}</b> via <b>${data.method}</b>`,
        icon: 'success',
        confirmButtonText: 'OK'
      });
    }

    // Reset form
    this.payment = {};
  }

  // Edit Payment
  editPayment(index: number) {
    this.editingIndex = index;
    this.payment = { ...this.payments[index] };
  }

  // Delete Payment
  deletePayment(index: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to delete payment of ${this.payments[index].guest}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.payments.splice(index, 1);
        Swal.fire('Deleted!', 'Payment has been removed.', 'success');
        if (this.editingIndex === index) {
          this.payment = {};
          this.editingIndex = null;
        }
      }
    });
  }

  // Total amount
  get totalAmount() {
    return this.payments.reduce((sum, p) => sum + Number(p.amount), 0);
  }

  // Card color for method
  getMethodColor(method: string) {
    switch(method) {
      case 'Cash': return 'success';
      case 'Card': return 'primary';
      case 'Bkash': return 'warning';
      case 'Nagad': return 'info';
      default: return 'secondary';
    }
  }
}
