import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from 'components/molecules/Card/Card';
import GridTemplate from 'templates/GridTemplate';
import PropTypes from 'prop-types';
import { fetchItems as fetchItemsAction } from 'actions';
import penIcon from 'assets/pen-alt-solid.svg';

class Articles extends Component {
  componentDidMount() {
    const { fetchArticles } = this.props;
    fetchArticles();
  }

  render() {
    const { articles, isLoading } = this.props;
    return (
      <GridTemplate isEmpty={articles.length === 0 && !isLoading} icon={penIcon}>
        {articles.map(({
          id, title, content, articleUrl, published_at: publishedAt,
        }, i) => (
          <Card
            animationDelay={i * 0.15}
            id={id}
            dateInfo={publishedAt}
            title={title}
            content={content}
            articleUrl={articleUrl}
            key={id}
          />
        ))}
      </GridTemplate>
    );
  }
}

Articles.propTypes = {
  isLoading: PropTypes.bool,
  articles: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      published_at: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      articleUrl: PropTypes.string.isRequired,
    }),
  ),
  fetchArticles: PropTypes.func.isRequired,
};

Articles.defaultProps = {
  isLoading: false,
  articles: [],
};

const mapStateToProps = ({ articles, isLoading }) => ({ articles, isLoading });

const mapDispatchToProps = (dispatch) => ({
  fetchArticles: () => dispatch(fetchItemsAction('articles')),
});

export default connect(mapStateToProps, mapDispatchToProps)(Articles);
