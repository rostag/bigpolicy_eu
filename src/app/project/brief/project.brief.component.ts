import { Component } from '@angular/core';
import { MdCard } from '@angular2-material/card/card';
import { MdButton } from '@angular2-material/button/button';
import { MdToolbar } from '@angular2-material/toolbar/toolbar';
import { MdIcon, MdIconRegistry } from '@angular2-material/icon/icon';
import { MD_GRID_LIST_DIRECTIVES } from '@angular2-material/grid-list/grid-list';

@Component({
  moduleId: module.id,
  templateUrl: './project.brief.component.html',
  styleUrls: ['./project.brief.component.css'],
  directives: [MD_GRID_LIST_DIRECTIVES, MdCard, MdButton, MdIcon, MdToolbar],
  providers: [MdIconRegistry]
})

export class ProjectBriefComponent {
  constructor() {}
}
