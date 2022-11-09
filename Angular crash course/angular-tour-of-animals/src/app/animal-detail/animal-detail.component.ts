import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { AnimalService } from '../animal.service';
import { Animal } from '../animal';

@Component({
  selector: 'app-animal-detail',
  templateUrl: './animal-detail.component.html',
  styleUrls: ['./animal-detail.component.css']
})
export class AnimalDetailComponent implements OnInit {

  @Input() animal?: Animal;

  constructor(
    private route: ActivatedRoute,
    private animalService: AnimalService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getAnimal();
  }

  getAnimal(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.animalService.getAnimal(id).subscribe(animal => this.animal = animal);
  }

  goBack(): void {
    this.location.back();
  }

}
