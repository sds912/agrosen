import { Component } from '@angular/core';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrl: './cart-details.component.scss'
})
export class CartDetailsComponent {
  cartItems = [
    { id: 1, title: 'Product 1', price: 29.99, image: 'https://via.placeholder.com/100', quantity: 1 },
    { id: 2, title: 'Product 2', price: 49.99, image: 'https://via.placeholder.com/100', quantity: 2 },
    { id: 3, title: 'Product 3', price: 19.99, image: 'https://via.placeholder.com/100', quantity: 1 },
  ];

  incrementQuantity(index: number): void {
    this.cartItems[index].quantity++;
  }

  decrementQuantity(index: number): void {
    if (this.cartItems[index].quantity > 1) {
      this.cartItems[index].quantity--;
    } else {
      this.removeItem(index);
    }
  }

  removeItem(index: number): void {
    this.cartItems.splice(index, 1);
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  checkout(): void {
    // Implement your checkout logic here
    alert('Proceeding to checkout!');
  }
}
