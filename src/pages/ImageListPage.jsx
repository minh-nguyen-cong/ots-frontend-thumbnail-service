import React, { useEffect, useState } from 'react';
import { imageApi } from '../api/imageApi';

const ImageListPage = () => {
    const [images, setImages] = useState([]);
    const [listLoading, setListLoading] = useState(true);
    const [error, setError] = useState('');
    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState('');

    const fetchImages = () => {
        setListLoading(true);
        imageApi.getImages()
            .then(response => {
                setImages(response.data);
            })
            .catch(err => {
                setError('Failed to fetch images. Make sure you are logged in and the API is running.');
                console.error(err);
            })
            .finally(() => {
                setListLoading(false);
            });
    };

    useEffect(() => {
        fetchImages();
    }, []);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (!file) {
            return;
        }

        // Client-side validation for file size (10MB)
        const MAX_SIZE = 10 * 1024 * 1024;
        if (file.size > MAX_SIZE) {
            setUploadError('File is too large. The maximum size is 10MB.');
            // Clear the file input
            event.target.value = null;
            return;
        }

        // Client-side validation for file type
        const allowedTypes = ['image/png', 'image/jpeg'];
        if (!allowedTypes.includes(file.type)) {
            setUploadError('Invalid file type. Please upload a PNG or JPEG image.');
            return;
        }

        handleUpload(file);
    };

    const handleUpload = async (file) => {
        setUploading(true);
        setUploadError('');
        try {
            await imageApi.uploadImage(file);
            // Refresh the list to show the new image (which will likely be in a 'PENDING' or 'PROCESSING' state)
            fetchImages();
        } catch (err) {
            setUploadError('Upload failed. Please try again.');
            console.error(err);
        } finally {
            setUploading(false);
        }
    };

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

    if (listLoading) {
        return <div className="container mt-5 text-center"><h2>Loading Images...</h2></div>;
    }

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Your Images</h2>
                <div>
                    <button className="btn btn-secondary me-2" onClick={fetchImages} disabled={listLoading}>
                        <i className="bi bi-arrow-clockwise"></i> Reload
                    </button>
                    <label className={`btn btn-primary ${uploading ? 'disabled' : ''}`}>
                        <i className="bi bi-upload"></i> {uploading ? 'Uploading...' : 'Upload Image'}
                        <input type="file" hidden onChange={handleFileChange} disabled={uploading} accept="image/png, image/jpeg" />
                    </label>
                </div>
            </div>

            {error && <div className="alert alert-danger">{error}</div>}
            {uploadError && <div className="alert alert-danger">{uploadError}</div>}

            {listLoading && images.length === 0 ? (
                <div className="text-center">
                    <div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div>
                </div>
            ) : images.length > 0 ? (
                <div className="table-responsive">
                    <table className="table table-hover align-middle">
                        <thead>
                            <tr>
                                <th>Thumbnail Image</th>
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
                                    <td>
                                        {image.thumbnailStatus === 'DONE' && image.thumbnailUrl ? (
                                            <img src={image.thumbnailUrl} alt={image.fileName} className="rounded" style={{ width: '60px', height: '60px', objectFit: 'cover' }} />
                                        ) : (
                                            <div style={{ width: '60px', height: '60px', backgroundColor: '#e9ecef' }} className="rounded d-flex align-items-center justify-content-center text-muted">
                                                <i className="bi bi-image" style={{ fontSize: '24px' }}></i>
                                            </div>
                                        )}
                                    </td>
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
