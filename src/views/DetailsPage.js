import React, { Component } from 'react';
import DetailsTemplate from 'templates/DetailsTemplate';
import withContext from 'hoc/withContext';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  fetchSingleItem as fetchSingleItemAction,
  clearErrors as clearErrorsAction,
  removeItem as removeItemAction,
} from 'actions';
import { routes } from 'routes';

class DetailsPage extends Component {
  componentDidMount() {
    const { match, fetchSingleItem } = this.props;
    const { id } = match.params;

    fetchSingleItem(id);
  }

  handleClearErrors = () => {
    const { history, clearErrors } = this.props;

    clearErrors();
    history.push(routes.home);
  }

  render() {
    const {
      singleItem, isLoading, errorInfo, removeItem,
    } = this.props;

    return (
      !singleItem || isLoading ? <DetailsTemplate isLoading={isLoading} />
        : (
          <DetailsTemplate
            errorInfo={errorInfo}
            handleClearErrors={this.handleClearErrors}
            id={singleItem.id}
            title={singleItem.title}
            dateInfo={singleItem.published_at}
            content={singleItem.content}
            articleUrl={singleItem.articleUrl}
            twitterName={singleItem.twitterName}
            handleRemove={removeItem}
          />
        )
    );
  }
}

DetailsPage.propTypes = {
  isLoading: PropTypes.bool,
  fetchSingleItem: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  removeItem: PropTypes.func.isRequired,
  singleItem: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    published_at: PropTypes.string,
    content: PropTypes.string,
    articleUrl: PropTypes.string,
    twitterName: PropTypes.string,
  }),
  errorInfo: PropTypes.shape({
    status: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    statusText: PropTypes.string,
  }),
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

DetailsPage.defaultProps = {
  isLoading: false,
  singleItem: {
    id: '',
    title: '',
    published_at: '',
    content: '',
    articleUrl: '',
    twitterName: '',
  },
  errorInfo: {
    status: '',
    statusText: '',
  },
};

const mapStateToProps = ({ singleItem, isLoading, errorInfo }) => (
  { singleItem, isLoading, errorInfo });

const mapDispatchToProps = (dispatch) => ({
  fetchSingleItem: (id) => dispatch(fetchSingleItemAction(id)),
  clearErrors: () => dispatch(clearErrorsAction()),
  removeItem: (itemType, id) => dispatch(removeItemAction(itemType, id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withContext(
  connect(null)(DetailsPage),
));
