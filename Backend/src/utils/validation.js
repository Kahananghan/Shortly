import validator from 'validator';

export const validateUrl = (url) => {
    if (!url || typeof url !== 'string') {
        throw new Error('URL is required and must be a string');
    }
    
    let formattedUrl = url;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        formattedUrl = 'https://' + url;
    }
    
    if (!validator.isURL(formattedUrl, { protocols: ['http', 'https'] })) {
        throw new Error('Invalid URL format');
    }
    
    return formattedUrl;
};

export const validateSlug = (slug) => {
    if (!slug) return true; 
    
    if (typeof slug !== 'string') {
        throw new Error('Slug must be a string');
    }
    
    if (slug.length < 3 || slug.length > 50) {
        throw new Error('Slug must be between 3 and 50 characters');
    }
    
    if (!/^[a-zA-Z0-9_-]+$/.test(slug)) {
        throw new Error('Slug can only contain letters, numbers, hyphens, and underscores');
    }
    
    return true;
};

export const validateEmail = (email) => {
    if (!email || !validator.isEmail(email)) {
        throw new Error('Valid email is required');
    }
    return true;
};

export const validatePassword = (password) => {
    if (!password || password.length < 6) {
        throw new Error('Password must be at least 6 characters long');
    }
    return true;
};