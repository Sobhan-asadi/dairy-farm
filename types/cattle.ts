export type CattleGender = "female" | "male";

export type CattleStatus = "active" | "sold" | "dead" | "removed";

export type Cattle = {
  id: string;

  tagNumber: string;

  name: string | null;

  gender: CattleGender;

  breed: string;

  birthDate: string | null;

  entryDate: string;

  motherTagNumber: string | null;

  fatherTagNumber: string | null;

  status: CattleStatus;

  notes: string | null;

  createdAt: string;
  updatedAt: string;
};
