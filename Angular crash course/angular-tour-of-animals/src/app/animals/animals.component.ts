import { Component, OnInit } from '@angular/core';
import { Animal } from '../animal';
// import { ANIMALS } from '../mock-animals';
import { AnimalService } from '../animal.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-animals',
  templateUrl: './animals.component.html',
  styleUrls: ['./animals.component.css']
})
export class AnimalsComponent implements OnInit {

  // animals = ANIMALS
  animals: Animal[] = [];

  selectedAnimal?: Animal;

  constructor(private animalService: AnimalService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getAnimals();
  }

  // onSelect(animal: Animal): void {
  //   // Ternary operator meaning the above:
  //   this.selectedAnimal = this.selectedAnimal == animal ? undefined : animal
  //   this.messageService.add(`AnimalsComponent: Selected animal id=${animal.id}`);
  // }

  getAnimals(): void {
    // this.animals = this.animalService.getAnimals();
    this.animalService.getAnimals().subscribe(animals => this.animals = animals);
  }

}
