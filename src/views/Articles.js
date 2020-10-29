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
    const { articles } = this.props;
    return (
      <GridTemplate>
        {articles.map(({
          _id: id, title, content, articleUrl,
        }) => (
          <Card
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
  articles: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      articleUrl: PropTypes.string.isRequired,
    }),
  ),
  fetchArticles: PropTypes.func.isRequired,
};

Articles.defaultProps = {
  articles: [],
};

const mapStateToProps = ({ articles }) => ({ articles });

const mapDispatchToProps = (dispatch) => ({
  fetchArticles: () => dispatch(fetchItemsAction('articles')),
});

export default connect(mapStateToProps, mapDispatchToProps)(Articles);
