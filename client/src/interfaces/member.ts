export interface IMember {
  id: string;
  dateOfBirth: string;
  imageUrl?: string;
  displayName: string;
  created: string;
  lastActive: string;
  gender: string;
  description?: string;
  city: string;
  country: string;
}

export interface IPhoto {
  id: number;
  url: string;
  publicId?: string;
  memberId: string;
  isApproved: boolean;
}

export interface IEditableMember {
  displayName: string;
  description?: string;
  city: string;
  country: string;
}

export class IMemberParams {
  gender?: string;
  minAge = 18;
  maxAge = 100;
  pageNumber = 1;
  pageSize = 10;
  orderBy = 'lastActive';
}
