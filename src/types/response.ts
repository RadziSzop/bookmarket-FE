interface ApiResponseSuccess<T> {
  success: boolean;
  data: T;
}
export interface Token {
  accessToken: {
    token: string;
    expireDate: number;
  };
  refreshToken: {
    token: string;
    expireDate: number;
  };
}
export interface ApiResponseFailure {
  success: false;
  errors: {
    message: string;
    errorCode: number;
    field?: string;
  }[];
}
export type RegisterResponse = ApiResponseSuccess<{
  message: string;
}>;

export type ProfileUpdateResponse = {
  success: boolean;
};

export type RefreshResponse = ApiResponseSuccess<{
  message: string;
  token: Token;
}>;

export type ProfileResponse = ApiResponseSuccess<{
  email: string;
  role: "USER" | "ADMIN";
  profile: {
    name: string;
    phoneNumber?: string;
    contactEmail?: string;
  };
}>;
type Subject =
  | "Matematyka"
  | "Polski"
  | "Angielski"
  | "Niemiecki"
  | "Historia"
  | "Biologia"
  | "Chemia"
  | "Fizyka"
  | "Geografia"
  | "WOS"
  | "Informatyka"
  | "Plastyka"
  | "Muzyka"
  | "Religia"
  | "WF"
  | "Technika"
  | "Przyroda"
  | "Inne";
export type StoreResponse = ApiResponseSuccess<
  {
    class: number;
    condition: number;
    id: number;
    image: string;
    price: number;
    subject: Subject | null;
    title: string;
  }[]
>;
export type MineBooksResponse = ApiResponseSuccess<
  {
    class: number;
    condition: number;
    id: number;
    bookId: number;
    image: string;
    price: number;
    subject: Subject | null;
    title: string;
    reservation: {
      select: {
        reservationEnd: Date;
        userId: true;
      };
    } | null;
  }[]
>;
export type BookResponse = ApiResponseSuccess<{
  class: number;
  condition: number;
  id: number;
  image: string;
  price: number;
  subject: Subject | null;
  title: string;
}>;
