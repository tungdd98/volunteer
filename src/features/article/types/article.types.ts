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
