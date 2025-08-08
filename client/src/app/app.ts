import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Nav } from "../layout/nav/nav";
import { KENDO_INPUTS } from "@progress/kendo-angular-inputs";

@Component({
  selector: 'app-root',
  imports: [Nav, KENDO_INPUTS],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App implements OnInit {


  private http = inject(HttpClient);

  protected readonly title = ('client');

  protected members = signal<any>([]);

  async ngOnInit() {
   this.members.set(await this.getMembers());
  }

  async getMembers() {
    try {
      return lastValueFrom (this.http.get('https://localhost:5001/api/members'));
     
    } catch (error) {
      console.error('Error fetching members:', error);
      throw error;
    }
  }
}
