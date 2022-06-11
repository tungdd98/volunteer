export enum ArticlePathsEnum {
  ARTICLE_LIST = "/articles/:categoryId",
  ARTICLE_DETAIL = "/article/:articleId",
  DONATE_PROGRESS = "/donate/progress/:articleId",
  ARTICLE_CREATE = "/admin/article/create/:categoryId",
  ARTICLE_EDIT = "/admin/article/edit/:articleId/:categoryId",
  ARTICLE_LIST_ADMIN = "/admin/articles/:categoryId",
  DONATE_SUCCESS = "/donate/success/:articleId",
}
