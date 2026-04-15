import React from "react";
import PropTypes from "prop-types";
import NullImage from "../../components/Images/nullImage.png";
import Loading from "../Loading/Loading";
import NewsItem from "../NewsItem/NewsItem";
import { v4 as uuidv4 } from "uuid";
import { Col, Row } from "react-bootstrap";
import { header } from "../../config/config";
import { endpointPath } from "../../config/api";
import { Container, Header, card } from "./index";
import { useQuery } from "@tanstack/react-query";


function News(props) {
  const { newscategory, country } = props;

  const capitaLize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const category = newscategory;
  const title = capitaLize(category);
  document.title = `${capitaLize(title)} - News`;

  const fetchNews = async () => {
    const response = await fetch(endpointPath(country, category));
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    const data = await response.json();
    return data.articles ?? [];
  };

  const {
    data: articles = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["news", country, category],
    queryFn: fetchNews,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <Loading />;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <>
      <Header>{header(capitaLize(category))}</Header>
      <Container>
        <Row>
          {articles.map((element) => (
            <Col sm={12} md={6} lg={4} xl={3} style={card} key={uuidv4()}>
              <NewsItem
                title={element.title}
                description={element.description}
                published={element.publishedAt}
                channel={element.source.name}
                alt="News image"
                publishedAt={element.publishedAt}
                imageUrl={element.image === null ? NullImage : element.image}
                urlNews={element.url}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

News.defaultProps = {
  country: "us",
  newscategory: "general",
};

News.propTypes = {
  country: PropTypes.string,
  newscategory: PropTypes.string,
};

export default News;
