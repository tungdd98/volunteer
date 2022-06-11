export interface ArticleDef {
  id: string;
  title: string;
  thumbnail: string;
  content: string;
  maxDonate: number;
  currentDonate: number;
  status: number;
  albums: string[];
  tags: string[];
  senderAddress: string;
  provinceCode: string;
  categoryId: string;
}

export type ArticleForm = Omit<
  ArticleDef,
  "id" | "currentDonate" | "thumbnail" | "maxDonate"
> & {
  thumbnail: string | File;
  maxDonate: string;
};

export interface ReceivedOrai {
  fromAddress: string;
  toAddress: string;
  amount: string;
}

export interface CategoryArticleDef {
  id: string;
  title: string;
  articles: ArticleDef[];
}

export interface ProvinceDef {
  code: string;
  name: string;
}

export interface ArticleParams {
  provinceCode: string;
}
