import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IMember } from '../../../interfaces/member';

@Component({
  selector: 'app-member-profile',
  imports: [],
  templateUrl: './member-profile.html',
  styleUrl: './member-profile.css',
})
export class MemberProfile implements OnInit {
  ngOnInit(): void {
    this.route.parent?.data.subscribe((data) => {
      this.member.set(data['member']);
    });
  }
  private route = inject(ActivatedRoute);
  protected member = signal<IMember | undefined>(undefined);
}
