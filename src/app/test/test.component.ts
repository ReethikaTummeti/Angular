import { Component } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
})
export class TestComponent {
  demoData: string = 'Hey Gainster';
  showAlert() {
    alert('alert message:modifying content');
    this.demoData = 'hey reethika';
  }
}
