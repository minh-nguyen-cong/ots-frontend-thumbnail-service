import React from 'react';
import { useTranslation } from 'react-i18next';

const ConfirmationModal = ({ show, onHide, onConfirm, title, body, isProcessing }) => {
    const { t } = useTranslation();

    if (!show) {
        return null;
    }

    return (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{title}</h5>
                        <button type="button" className="btn-close" onClick={onHide}></button>
                    </div>
                    <div className="modal-body"><p>{body}</p></div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onHide}>{t('images.deleteConfirmation.close')}</button>
                        <button type="button" className="btn btn-danger" onClick={onConfirm} disabled={isProcessing}>{isProcessing ? 'Deleting...' : t('images.deleteConfirmation.confirm')}</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;