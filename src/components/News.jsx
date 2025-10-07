import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const apiKey = import.meta.env.VITE_NEWS_API;


  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updateNews = async () => {
    props.setProgress(10);
   const url = `/api/news?page=${page}&country=${props.country}&category=${props.category}`;
let data = await fetch(url);
let parsedData = await data.json();
setArticles(parsedData.articles || []);
setTotalResults(parsedData.totalResults || 0);

    setLoading(false);
    props.setProgress(100);
  };

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`
    updateNews();
    // eslint-disable-next-line
  }, []);

  const handlePrevClick = async () => {
    setPage(page - 1);
    updateNews();
  };

  const handleNextClick = async () => {
    setPage(page + 1);
    updateNews();
  };

  const fetchMoreData = async () => {
    setPage(page + 1);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=e42c588f37e94f2daa36746cbdd4a0a2&page=${page + 1}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
  };

  return (
    <>
      <h1 className='text-center' style={{ margin: '35px 0px',marginTop: '30px' }}>
        NewsMonkey - Top Headlines on {capitalizeFirstLetter(props.category)}
      </h1>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles ? articles.length : 0}   // ✅ safe check
  next={fetchMoreData}
  hasMore={articles && articles.length < totalResults} // ✅ safe check
  loader={<Spinner />}
      >
        <div className="container">
          <div className='row'>
            {
              articles.map((element) => {
                return (
                  <div className='col-md-4' key={element.url ? element.url : Math.random()}>
                    <NewsItem
                      title={element.title ? element.title.slice(0, 45) : ''}
                      description={element.description ? element.description.slice(0, 88) : ''}
                      imageUrl={element.urlToImage}
                      newUrl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

News.defaultProps = {
  country: 'us',
  pageSize: 8,
  category: 'technology',
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
