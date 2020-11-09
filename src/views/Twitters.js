import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Card from 'components/molecules/Card/Card';
import GridTemplate from 'templates/GridTemplate';
import { fetchItems as fetchItemsAction } from 'actions';

class Twitters extends Component {
  componentDidMount() {
    const { fetchTwitters } = this.props;

    fetchTwitters();
  }

  render() {
    const { twitters, isLoading } = this.props;

    return (
      <GridTemplate isLoading={isLoading}>
        {twitters.map(({
          id, title, content, twitterName, published_at: publishedAt,
        }, i) => (
          <Card
            animationDelay={i * 0.15}
            id={id}
            dateInfo={publishedAt}
            title={title}
            content={content}
            twitterName={twitterName}
            key={title}
          />
        ))}
      </GridTemplate>
    );
  }
}

Twitters.propTypes = {
  isLoading: PropTypes.bool,
  twitters: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      published_at: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      twitterName: PropTypes.string.isRequired,
    }),
  ),
  fetchTwitters: PropTypes.func.isRequired,
};

Twitters.defaultProps = {
  isLoading: false,
  twitters: [],
};

const mapStateToProps = ({ twitters, isLoading }) => ({ twitters, isLoading });

const mapDispatchToProps = (dispatch) => ({
  fetchTwitters: () => dispatch(fetchItemsAction('twitters')),
});

export default connect(mapStateToProps, mapDispatchToProps)(Twitters);
