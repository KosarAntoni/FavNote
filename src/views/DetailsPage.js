import React, { Component } from 'react';
import DetailsTemplate from 'templates/DetailsTemplate';
import withContext from 'hoc/withContext';
import { connect } from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';

class DetailsPage extends Component {
  state = {
    activeItem: {
      title: '',
      content: '',
      articleUrl: '',
      twitterName: '',
    },
  };

  componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;

    axios.get(`http://localhost:1337/notes/${id}`)
      .then(({ data }) => this.setState({
        activeItem: data,
      }));
  }

  render() {
    const {
      activeItem: {
        id, title, content, articleUrl, twitterName, published_at: publishedAt,
      },
    } = this.state;

    return (
      <DetailsTemplate
        id={id}
        title={title}
        dateInfo={publishedAt}
        content={content}
        articleUrl={articleUrl}
        twitterName={twitterName}
      />
    );
  }
}

DetailsPage.propTypes = {
  match: PropTypes.shape().isRequired,
};

export default withContext(connect(null)(DetailsPage));
