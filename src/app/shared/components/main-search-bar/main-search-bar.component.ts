import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

interface AutocompleteOptionGroups {
  title: string;
  count?: number;
  children?: AutocompleteOption[];
}

interface AutocompleteOption {
  title: string;
  price: number;
  imageUrl: string;
}

@Component({
  selector: 'app-main-search-bar',
  templateUrl: './main-search-bar.component.html',
  styleUrls: ['./main-search-bar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MainSearchBarComponent implements OnInit {

  constructor(private router: Router){

  }
  
  inputValue?: string;
  optionGroups: AutocompleteOptionGroups[] = [];
  filteredOptionGroups: AutocompleteOptionGroups[] = [];

  onSearchChange(value: string): void {
    this.filterOptions(value);
  }

  onFilterClick(): void {
    this.router.navigate(['/product',1])
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.optionGroups = [
        {
          title: 'Produits populaires',  
          children: [
            {
              title: 'Chaise en bois',
              price: 150,
              imageUrl: 'https://picsum.photos/50/50?random=1'
            },
            {
              title: 'Canapé moderne',
              price: 450,
              imageUrl: 'https://picsum.photos/50/50?random=2'
            }
          ]
        },
        {
          title: 'Nouveaux produits',
          children: [
            {
              title: 'Table à manger en verre',
              price: 250,
              imageUrl: 'https://picsum.photos/50/50?random=3'
            },
            {
              title: 'Lampe design',
              price: 75,
              imageUrl: 'https://picsum.photos/50/50?random=4'
            }
          ]
        },
        {
          title: 'Produits en promotion',
          children: [
            {
              title: 'Étagère modulaire',
              price: 100,
              imageUrl: 'https://picsum.photos/50/50?random=5'
            }
          ]
        }
      ];
      // Initially, set filteredOptionGroups to all optionGroups
      this.filteredOptionGroups = this.optionGroups;
    }, 1000);
  }

  // Function to filter the options based on the search value
  filterOptions(value: string): void {
    if (!value) {
      // If no search value, reset the filtered options to show all
      this.filteredOptionGroups = this.optionGroups;
      return;
    }

    // Filter option groups and their children based on the search term
    this.filteredOptionGroups = this.optionGroups.map(group => ({
      ...group,
      children: group.children?.filter(item =>
        item.title.toLowerCase().includes(value.toLowerCase())
      )
    })).filter(group => group.children!.length > 0);  // Keep only groups with matching items
  }

  onChange(e: Event): void {
    const value = (e.target as HTMLInputElement).value;
    this.filterOptions(value);
  }

  private getRandomInt(max: number, min: number = 0): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
