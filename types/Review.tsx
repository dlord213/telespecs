export type Review = {
  id: string;
  title: string;
  description: string;
  updated: string;
  pictures: string[];
  expand: {
    user: {
      name: string;
    };
  };
};

export type ReviewsResponse = {
  items: Review[];
  totalItems: number;
  page: number;
  perPage: number;
};
