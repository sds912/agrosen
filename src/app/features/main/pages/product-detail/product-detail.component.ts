import { ViewportScroller } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {
  productId: string | null;
  product: any | undefined;
  isInCart: boolean = false;
  showFullDescription = false;


  constructor(private route: ActivatedRoute, private router: Router,  private viewportScroller: ViewportScroller) {
    this.productId = this.route.snapshot.paramMap.get('id');
  }
  quantity: number = 1; // Default quantity


  ngOnInit(): void {
    this.loadProduct();
    this.route.params.subscribe(() => {
      this.loadProduct(); // Reload product when the route changes
    });

    this.router.events.subscribe((event) =>{
      if (event instanceof NavigationEnd) {
        this.viewportScroller.scrollToPosition([0, 0]);
      }
    })
  
    
  }

  loadProduct() {
    const productId = this.route.snapshot.paramMap.get('id');
    // Simulate API call or service to fetch product by ID
    this.product = this.relatedProducts.find((p) => p.id == productId) || null;
  }

  reloadPage() {
    const productId = this.route.snapshot.paramMap.get('id');
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/product', productId]);
     
    });
  }

  // List of related products
  relatedProducts = [
    {
      id: "2",
      title: 'Organic Potatoes',
      price: 19.99,
      image: 'https://picsum.photos/240/240?random=2',
      available: true,
      description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                  Reprehenderit veniam mollitia eos sit magnam voluptatem iure pariatur eligendi tempora impedit? 
                  Est cum debitis enim a dolore mollitia nam similique sunt.`,
    },
    {
      id: "3",
      title: 'Farm Fresh Apples',
      price: 24.99,
      image: 'https://picsum.photos/240/240?random=3',
      available: true,
      description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                  Reprehenderit veniam mollitia eos sit magnam voluptatem iure pariatur eligendi tempora impedit? 
                  Est cum debitis enim a dolore mollitia nam similique sunt.`,
    },
    {
      id: "4",
      title: 'Juicy Oranges',
      price: 39.99,
      image: 'https://picsum.photos/240/240?random=4',
      available: true,
      description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                  Reprehenderit veniam mollitia eos sit magnam voluptatem iure pariatur eligendi tempora impedit? 
                  Est cum debitis enim a dolore mollitia nam similique sunt.`,
    },
    // Add more related products here...
  ];

   // Navigate back to the product list
   goBackToList(): void {
    this.router.navigate(['/product-list']);
  }

  // Increment the quantity
  increment() {
    this.quantity++;
  }

  // Decrement the quantity
  decrement() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  // Add the product to the cart
  addToCart() {
    console.log(`${this.product.title} added to the cart with quantity ${this.quantity}`);
    // Implement your logic for adding to the cart here

    this.isInCart = true;
  }

  // Remove the product from the cart
  removeFromCart() {
    console.log(`${this.product.title} removed from the cart`);
    // Implement your logic for removing from the cart here
    this.isInCart = false;

  }

  toggleDescription() {
    this.showFullDescription = !this.showFullDescription;
  }
}
