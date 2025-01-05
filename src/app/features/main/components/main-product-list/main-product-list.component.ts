import { Component } from '@angular/core';

@Component({
  selector: 'app-main-product-list',
  templateUrl: './main-product-list.component.html',
  styleUrl: './main-product-list.component.css'
})
export class MainProductListComponent {
  products = [
    {
      id: 1,
      title: 'Fresh Carrots',
      price: 29.99,
      image: 'https://picsum.photos/240/240?random=1', // Random image from Picsum
      available: true,
    },
    {
      id: 2,
      title: 'Organic Potatoes',
      price: 19.99,
      image: 'https://picsum.photos/240/240?random=2', // Random image from Picsum
      available: false,
    },
    {
      id: 3,
      title: 'Farm Fresh Apples',
      price: 24.99,
      image: 'https://picsum.photos/240/240?random=3', // Random image from Picsum
      available: true,
    },
    {
      id: 4,
      title: 'Juicy Oranges',
      price: 39.99,
      image: 'https://picsum.photos/240/240?random=4', // Random image from Picsum
      available: true,
    },
    {
      id: 5,
      title: 'Ripe Strawberries',
      price: 14.99,
      image: 'https://picsum.photos/240/240?random=5', // Random image from Picsum
      available: true,
    },
    {
      id: 6,
      title: 'Green Lettuce',
      price: 9.99,
      image: 'https://picsum.photos/240/240?random=6', // Random image from Picsum
      available: false,
    },
    {
      id: 7,
      title: 'Cucumber Freshness',
      price: 16.99,
      image: 'https://picsum.photos/240/240?random=7', // Random image from Picsum
      available: true,
    },
    {
      id: 8,
      title: 'Tomato Harvest',
      price: 25.99,
      image: 'https://picsum.photos/240/240?random=8', // Random image from Picsum
      available: true,
    },
    {
      id: 9,
      title: 'Organic Bananas',
      price: 19.99,
      image: 'https://picsum.photos/240/240?random=9', // Random image from Picsum
      available: true,
    },
    {
      id: 10,
      title: 'Fresh Mangoes',
      price: 34.99,
      image: 'https://picsum.photos/240/240?random=10', // Random image from Picsum
      available: true,
    },
  ];
  
  addToCart(product: any): void {
    console.log(`Added ${product.title} to cart.`);
  }
}
