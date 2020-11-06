import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from 'components/molecules/Card/Card';
import GridTemplate from 'templates/GridTemplate';
import PropTypes from 'prop-types';
import { fetchItems as fetchItemsAction } from 'actions';

class Notes extends Component {
  componentDidMount() {
    const { fetchNotes } = this.props;

    fetchNotes();
  }

  render() {
    const { notes, isLoading } = this.props;
    return (
      <GridTemplate isLoading={isLoading}>
        {notes.map(({
          id, title, content,
        }) => (
          <Card
            id={id}
            title={title}
            content={content}
            key={id}
          />
        ))}
      </GridTemplate>

    );
  }
}

Notes.propTypes = {
  isLoading: PropTypes.bool,
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    }),
  ),
  fetchNotes: PropTypes.func.isRequired,
};

Notes.defaultProps = {
  isLoading: false,
  notes: [],
};

const mapStateToProps = ({ notes, isLoading }) => ({ notes, isLoading });

const mapDispatchToProps = (dispatch) => ({
  fetchNotes: () => dispatch(fetchItemsAction('notes')),
});

export default connect(mapStateToProps, mapDispatchToProps)(Notes);
