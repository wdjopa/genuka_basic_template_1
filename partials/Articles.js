import React, { useEffect } from "react";
import ArticleCard from "../components/ArticleCard";
import {
  getArticles,
  useGenukaDispatch,
  useGenukaState,
} from "../utils/genuka.store";

function Articles({ company }) {
  const dispatch = useGenukaDispatch();
  const {
    articles_search_mode,
    searched_articles,
    articles,
    articles_list_pagination,
  } = useGenukaState();
  const _articles = articles_search_mode ? searched_articles : articles;

  useEffect(() => {
    if (company) {
      getArticles(dispatch, company.id, articles_list_pagination);
    }
  }, [company]);

  if (!_articles || !company) {
    return <></>;
  }
  return (
    <div className="grid sm:grid-cols-2 ">
      {_articles.length === 0 && <>Aucun article disponible</>}
      {_articles.map((article) => (
        <ArticleCard key={"article_card" + article.id} article={article} />
      ))}
    </div>
  );
}

export default Articles;
