import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from 'components/molecules/Card/Card';
import GridTemplate from 'templates/GridTemplate';
import PropTypes from 'prop-types';
import { fetchItems as fetchItemsAction } from 'actions';
import noteIcon from 'assets/sticky-note-solid.svg';

class Notes extends Component {
  componentDidMount() {
    const { fetchNotes } = this.props;
    fetchNotes();
  }

  render() {
    const { notes, isLoading } = this.props;
    return (
      <GridTemplate isEmpty={notes.length === 0 && !isLoading} icon={noteIcon}>
        {notes.map(({
          id, title, content, published_at: publishedAt,
        }, i) => (
          <Card
            animationDelay={i * 0.15}
            id={id}
            dateInfo={publishedAt}
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
      id: PropTypes.string.isRequired,
      published_at: PropTypes.string.isRequired,
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
