export enum ArticlePathsEnum {
  ARTICLE_LIST = "/articles/:categoryId",
  ARTICLE_DETAIL = "/article/:articleId",
  DONATE_PROGRESS = "/donate/progress/:articleId",
  ARTICLE_CREATE = "/admin/article/create",
  ARTICLE_EDIT = "/admin/article/edit/:articleId",
  ARTICLE_LIST_ADMIN = "/admin/articles",
  DONATE_SUCCESS = "/donate/success/:articleId",
}
