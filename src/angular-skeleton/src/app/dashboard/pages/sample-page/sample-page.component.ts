import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-sample-page',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './sample-page.component.html',
  styleUrls: ['./sample-page.component.scss'],
})
export class SamplePageComponent { }
