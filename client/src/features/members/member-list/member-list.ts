import { Observable } from 'rxjs';
import { MemberService } from './../../../core/services/member.service';
import { Component, inject } from '@angular/core';
import { IMember } from '../../../interfaces/member';
import { AsyncPipe } from '@angular/common';
import { MemberCard } from '../member-card/member-card';

@Component({
  selector: 'app-member-list',
  imports: [AsyncPipe, MemberCard],
  templateUrl: './member-list.html',
  styleUrl: './member-list.css',
})
export class MemberList {
  private memberService = inject(MemberService);
  protected member$: Observable<IMember[]>;
  constructor() {
    this.member$ = this.memberService.getMembers();
  }
}
