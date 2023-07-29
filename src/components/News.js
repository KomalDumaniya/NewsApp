import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setarticles] = useState([])
  const [page, setpage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const updateNews = async () => {
    props.setProgress(10);

    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}& pagesize=${props.pagesize}`;
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json()
    props.setProgress(70);
    setarticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    props.setProgress(100);
  }

  useEffect(() => {
  document.title = `Newsapp`;
    updateNews();
  }, [])

  const fetchMoreData = async () => {
    setpage(page + 1)
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page + 1}& pagesize=${props.pagesize}`;

    let data = await fetch(url);
    let parsedData = await data.json()
    setarticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
  };
  return (
    <>
      <h1 className="text-center" style={{ margin: '35px 0px' , marginTop: '90px' }}>Newsapp - Top {capitalizeFirstLetter(props.category)} Headline </h1>
      <InfiniteScroll
        dataLength={articles?.length ?? 0}
        next={fetchMoreData}
        hasMore={articles?.length !== totalResults}
        >
        <div className="container">
          <div className="row">
            {articles?.map((element) => {
              return <div className="col-md-4" key={element.url}> <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageurl={element.urlToImage} newsurl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
              </div>
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  )
};

News.defaultProps = {
  country: 'in',
  pagesize: 8,
  category: 'general'
}

News.propTypes = {
  country: PropTypes.string,
  pagesize: PropTypes.number,
  category: PropTypes.string,
}

export default News