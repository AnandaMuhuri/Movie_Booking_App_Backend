export interface Theatre {
  name: string;
  description: string;
  city: string;
  pinCode: number;
  address?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}
