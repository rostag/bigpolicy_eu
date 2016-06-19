import { Component } from '@angular/core';
import { MdCard } from '@angular2-material/card/card';
import { MdButton } from '@angular2-material/button/button';
import { MdIcon, MdIconRegistry } from '@angular2-material/icon/icon';
import { MD_LIST_DIRECTIVES } from '@angular2-material/list/list';

@Component({
  moduleId: module.id,
  templateUrl: './project.list.component.html',
  styleUrls: ['./project.list.component.css'],
  directives: [MD_LIST_DIRECTIVES, MdCard, MdButton, MdIcon],
  providers: [MdIconRegistry]
})

export class ProjectListComponent {
  constructor() {}

  projects = [
    {
      title: 'Чому я йду до Ради',
      description: 'Prj 1 Description',
      cost: 120
    }, {
      title: 'Освітлити парки за 99 днів',
      description: 'Prj 2 Description',
      cost: 10
    }, {
      title: '100 робочих місць за 100 днів',
      description: 'Prj 3 Description',
      cost: 100
    }, {
      title: 'Освітлити парки за 99 днів',
      description: 'Prj 2 Description',
      cost: 10
    }, {
      title: '100 робочих місць за 100 днів',
      description: 'Prj 3 Description',
      cost: 100
    }, {
      title: 'Освітлити парки за 99 днів',
      description: 'Prj 2 Description',
      cost: 10
    }, {
      title: '100 робочих місць за 100 днів',
      description: 'Prj 3 Description',
      cost: 100
    }, {
      title: 'Освітлити парки за 99 днів',
      description: 'Prj 2 Description',
      cost: 10
    }
  ]
}
