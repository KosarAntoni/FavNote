import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from 'components/molecules/Card/Card';
import GridTemplate from 'templates/GridTemplate';
import PropTypes from 'prop-types';
import { fetchItems as fetchItemsAction } from 'actions';

class Articles extends Component {
  componentDidMount() {
    const { fetchArticles } = this.props;
    fetchArticles();
  }

  render() {
    const { articles, isLoading } = this.props;
    return (
      <GridTemplate isLoading={isLoading}>
        {articles.map(({
          id, title, content, articleUrl,
        }, i) => (
          <Card
            animationDelay={i * 0.15}
            id={id}
            title={title}
            content={content}
            articleUrl={articleUrl}
            key={title}
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
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      articleUrl: PropTypes.string.isRequired,
    }),
  ),
  fetchArticles: PropTypes.func.isRequired,
};

Articles.defaultProps = {
  articles: [],
  isLoading: false,
};

const mapStateToProps = ({ articles, isLoading }) => ({ articles, isLoading });

const mapDispatchToProps = (dispatch) => ({
  fetchArticles: () => dispatch(fetchItemsAction('articles')),
});

export default connect(mapStateToProps, mapDispatchToProps)(Articles);
