export default ({
  tags,
  likeCount,
  createdAt,
  title,
  message,
  creator,
  onClickLike,
  onDelete,
  onEdit,
}) => {
  return (
    <div className="col-md-4">
      <div className="card mb-4 shadow-sm">
        <div className="card-header">
          <div className="card-title">
            {title}
            <button
              className="btn btn-primary float-right"
              onClick={onClickLike}
            >
              {likeCount}{" "}
              <i className="fa fa-thumbs-o-up" aria-hidden="true"></i>
            </button>
          </div>
        </div>
        <div className="card-body">
          <p className="card-text">{message}</p>
          <div className="d-flex justify-content-between align-items-center">
            <div className="btn-group">
              <button
                type="button"
                className="btn btn-sm btn-outline-danger"
                onClick={onDelete}
              >
                Delete
              </button>
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                onClick={onEdit}
              >
                Edit
              </button>
            </div>
            <small className="text-muted">9 mins</small>
          </div>
        </div>
        <div className="card-footer">
          {tags &&
            tags.map((tag) => (
              <span className="badge badge-warning mx-2">{tag}</span>
            ))}{" "}
          <br />
          Created By {creator} <br />
          <small>{createdAt}</small>
        </div>
      </div>
    </div>
  );
};
