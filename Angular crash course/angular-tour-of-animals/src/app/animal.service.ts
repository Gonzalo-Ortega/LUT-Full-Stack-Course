import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Animal } from './animal';
import { ANIMALS } from './mock-animals';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {
  constructor(private messageService: MessageService) { }

  // Synchronous getter:
  // getAnimals(): Animal[] {
  //   return ANIMALS;
  // }

  // Asynchronous getter:
  getAnimals(): Observable<Animal[]> {
    const animals = of(ANIMALS);
    this.messageService.add('AnimalService: fetched animals');
    return animals;
  }

  getAnimal(id: number): Observable<Animal> {
    // For now, assume that a hero with the specified `id` always exists.
    // Error handling will be added in the next step of the tutorial.
    const animal = ANIMALS.find(h => h.id === id)!;
    this.messageService.add(`AnimalService: fetched animal id=${id}`);
    return of(animal);
  }
}
