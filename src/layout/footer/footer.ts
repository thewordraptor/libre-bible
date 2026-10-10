import { Component } from '@angular/core';
import pkg from '../../../package.json';

@Component({
  imports: [],
  selector: 'app-footer',
  styleUrl: './footer.scss',
  templateUrl: './footer.html',
})
export class Footer {
  protected year = new Date().getFullYear();
  version = pkg.version;
}
