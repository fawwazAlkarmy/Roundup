export type RootStackParamList = {
  Onboarding: undefined;
  Walkthrough: undefined;
  Home: undefined;
  Login: undefined;
  Signup: undefined;
  Search: { searchInput: string };
  Article: { article: Article };
  AiPicks: undefined;
};

export type Article = {
  author: string;
  title: string;
  description: string;
  url: string;
  image: string;
  category: string;
  language: string;
  country: string;
  source: string;
  published_at: string;
};

export type FormData = {
  name?: string;
  email: string;
  password: string;
};

export type AiPick = {
  index: number;
  published_at: string;
  source_name: string;
  title: string;
  url: string;
  url_to_image: string;
};
