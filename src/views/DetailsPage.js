import React, { Component } from 'react';
import DetailsTemplate from 'templates/DetailsTemplate';
import withContext from 'hoc/withContext';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  fetchSingleItem as fetchSingleItemAction,
  removeItem as removeItemAction,
} from 'actions';

class DetailsPage extends Component {
  componentDidMount() {
    const { match, fetchSingleItem } = this.props;
    const { id } = match.params;

    fetchSingleItem(id);
  }

  render() {
    const {
      singleItem, removeItem,
    } = this.props;

    return (
      <DetailsTemplate
        id={singleItem.id}
        title={singleItem.title}
        dateInfo={singleItem.published_at}
        content={singleItem.content}
        articleUrl={singleItem.articleUrl}
        twitterName={singleItem.twitterName}
        handleRemove={removeItem}
      />
    );
  }
}

DetailsPage.propTypes = {
  fetchSingleItem: PropTypes.func.isRequired,
  removeItem: PropTypes.func.isRequired,
  singleItem: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    published_at: PropTypes.string,
    content: PropTypes.string,
    articleUrl: PropTypes.string,
    twitterName: PropTypes.string,
  }),
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

DetailsPage.defaultProps = {
  singleItem: {
    id: '',
    title: '',
    published_at: '',
    content: '',
    articleUrl: '',
    twitterName: '',
  },
};

const mapStateToProps = ({ singleItem }) => (
  { singleItem });

const mapDispatchToProps = (dispatch) => ({
  fetchSingleItem: (id) => dispatch(fetchSingleItemAction(id)),
  removeItem: (itemType, id) => dispatch(removeItemAction(itemType, id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withContext(
  connect(null)(DetailsPage),
));
