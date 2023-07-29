
export type whereType = {
  NOT?: {
    UnavailableDates?: {
      some: {
        from: {
          lte: Date;
        };
        to: {
          gte: Date;
        };
      };
    };
  };
  bedRooms?: number;
  address?: {
    contains: string;
  };
};
