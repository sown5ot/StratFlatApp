export const isNullOrUndefined = param => {
    return param === null || param === undefined || param === '' || param.length <= 0 ? true : false;
};
