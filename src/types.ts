export type RootStackParamList = {
  Onboarding: undefined;
  Walkthrough: undefined;
  Home: undefined;
  Login: undefined;
  Signup: undefined;
  Search: { searchInput: string };
  Article: { article: Article };
  AiPicks: undefined;
  Profile: undefined;
  EditProfile: undefined;
  SavedArticles: undefined;
  Community: undefined;
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

export type profileData = {
  name: string;
  email: string;
  bio?: string;
  facebookUrl?: string;
  instagramUrl?: string;
};

export type SavedArticle = {
  article_url: string;
  article_title: string;
  article_source: string;
  article_date: string;
  article_image?: string;
};

export type ProfileType = {
  id: string;
  username: string;
  email: string;
  bio: string;
  created_at: string;
  saved_articles: SavedArticle[];
  followers: string[];
  following: string[];
  avatar_url: string;
  facebook_url: string;
  instagram_url: string;
};

export type ProfileField = {
  name: keyof profileData;
  label: string;
};

export type AiPick = {
  index: number;
  published_at: string;
  source_name: string;
  title: string;
  url: string;
  url_to_image: string;
};
