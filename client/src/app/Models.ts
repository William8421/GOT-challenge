export interface HouseMember {
  name: string;
  slug: string;
}

export interface House {
  members: HouseMember[];
  name: string;
  slug: string;
}

interface CharacterHouse {
  name: string;
  slug: string;
}

export interface Person {
  house?: CharacterHouse;
  quotes?: string[];
  name?: string;
  slug?: string;
}
