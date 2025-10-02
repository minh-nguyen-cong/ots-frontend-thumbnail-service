import React from 'react';
import { useTranslation } from 'react-i18next';

const HomePage = () => {
    const { t } = useTranslation();
    return (
        <div className="container mt-5">
            <h1>{t('home.title')}</h1>
        </div>
    );
};

export default HomePage;
