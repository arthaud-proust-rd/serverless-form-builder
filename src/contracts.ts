export type Form = {
  identity: {
    lastName: string;
    firstName: string;
    birthDate: Date;
  };
  likeChocolate: boolean;
};

export type Files = {
  identity: {
    card: File | null;
  };
};
