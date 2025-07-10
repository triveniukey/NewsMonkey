import React from 'react';

const NewsItem = (props) => {
  let { title, description, imageUrl, newUrl, author, date, source } = props;

  return (
    <div className='my-3'>
      <div className="card">
        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          position: 'absolute',
          right: '0'
        }}>
          <span className="badge rounded-pill bg-danger" style={{ left: '90%', zIndex: '1' }}>
            {source}
          </span>
        </div>

        <img
          src={imageUrl ? imageUrl : "https://images.unsplash.com/photo-1750969315593-36b04578208c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMHx8fGVufDB8fHx8fA%3D%3D"}
          className="card-img-top"
          alt="news"
        />

        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}...</p>
          <p className="card-text">
            <small className="text-body-secondary">
              By {!author ? "Unknown" : author} on {new Date(date).toGMTString()}
            </small>
          </p>
          <a href={newUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark">
            Read more
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
