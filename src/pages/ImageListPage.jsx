import React, { useEffect, useState } from 'react';
import { imageApi } from '../api/imageApi';

const ImageListPage = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        setLoading(true);
        imageApi.getImages()
            .then(response => {
                setImages(response.data);
            })
            .catch(err => {
                setError('Failed to fetch images. Make sure you are logged in and the API is running.');
                console.error(err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const formatBytes = (bytes, decimals = 2) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    const getStatusBadge = (status) => {
        switch (status) {
            case 'DONE':
                return <span className="badge bg-success">Done</span>;
            case 'PROCESSING':
                return <span className="badge bg-warning text-dark">Processing</span>;
            case 'ERROR':
                return <span className="badge bg-danger">Error</span>;
            default:
                return <span className="badge bg-secondary">{status}</span>;
        }
    }

    if (loading) {
        return <div className="container mt-5 text-center"><h2>Loading Images...</h2></div>;
    }

    return (
        <div className="container mt-5">
            <h2>Your Images</h2>
            {error && <div className="alert alert-danger">{error}</div>}

            {images.length > 0 ? (
                <div className="table-responsive">
                    <table className="table table-hover align-middle">
                        <thead>
                            <tr>
                                <th>File Name</th>
                                <th>File Size</th>
                                <th>Upload Date</th>
                                <th>Status</th>
                                <th>Thumbnail</th>
                            </tr>
                        </thead>
                        <tbody>
                            {images.map(image => (
                                <tr key={image.id}>
                                    <td>{image.fileName}</td>
                                    <td>{formatBytes(image.fileSize)}</td>
                                    <td>{new Date(image.createdAt).toLocaleString()}</td>
                                    <td>{getStatusBadge(image.thumbnailStatus)}</td>
                                    <td>
                                        {image.thumbnailStatus === 'DONE' && image.thumbnailUrl ? (
                                            <a href={image.thumbnailUrl} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-primary">Download</a>
                                        ) : (
                                            <button className="btn btn-sm btn-secondary" disabled>N/A</button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                !error && <p>You haven't uploaded any images yet.</p>
            )}
        </div>
    );
};

export default ImageListPage;
