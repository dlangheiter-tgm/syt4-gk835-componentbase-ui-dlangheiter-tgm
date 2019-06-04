export const endpoint = 'http://localhost:8180/';
export const extension = '/data/json';

export const buildPath = function (req) {
    return `${endpoint}${req}${extension}`
};