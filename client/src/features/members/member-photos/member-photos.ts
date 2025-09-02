import { Component, inject } from '@angular/core';
import { MemberService } from '../../../core/services/member.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IPhoto } from '../../../interfaces/member';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-member-photos',
  imports: [AsyncPipe],
  templateUrl: './member-photos.html',
  styleUrl: './member-photos.css',
})
export class MemberPhotos {
  private memberService = inject(MemberService);
  private route = inject(ActivatedRoute);
  protected photos$?: Observable<IPhoto[]>;
  constructor() {
    const memberId = this.route.parent?.snapshot.paramMap.get('id');
    if (memberId) {
      this.photos$ = this.memberService.getMemberPhotos(memberId);
    }
  }
  get photoMocks() {
    return Array.from({ length: 20 }, (_, i) => ({
      url: 'https://i1.rgstatic.net/ii/profile.image/910315399159815-1594047512957_Q512/Ahmad-Abu-Maizar.jpg',
    }));
  }
}
