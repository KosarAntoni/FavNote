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
    const { activeItem, match } = this.props;
    console.log(match);

    if (activeItem) {
      this.setState({ activeItem });
    } else {
      const { id } = match.params;

      axios.get(`http://localhost:9000/api/note/${id}`)
        .then(({ data }) => this.setState({ activeItem: data }))
        .catch((err) => console.log(err));
    }
  }

  render() {
    const {
      activeItem: {
        _id: id, title, content, articleUrl, twitterName,
      },
    } = this.state;

    return (
      <DetailsTemplate
        id={id}
        title={title}
        content={content}
        articleUrl={articleUrl}
        twitterName={twitterName}
      />
    );
  }
}

DetailsPage.propTypes = {
  activeItem: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string,
    articleUrl: PropTypes.string,
    twitterName: PropTypes.string,
  }).isRequired,
  match: PropTypes.shape().isRequired,
};

const mapStateToProps = (state, ownProps) => {
  if (state[ownProps.pageContext]) {
    return {
      activeItem: state[ownProps.pageContext].filter((item) => (
        item.id === ownProps.match.params.id))[0],
    };
  }
  return null;
};

export default withContext(connect(mapStateToProps)(DetailsPage));
