class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    pagination(totalCount) {
        const currentPage = Number(this.queryStr?.page) || 1;
        const rowPerPage = Number(this.queryStr?.rowPerPage) || totalCount;
        const skip = rowPerPage * (currentPage - 1);
        this.query = this.query.limit(rowPerPage).skip(skip);
        return this;
    }

    filter() {
        const queryCopy = { ...this.queryStr };
        const removeFields = ["page", "rowPerPage"];

        removeFields.forEach((key) => delete queryCopy[key]);

        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

        this.query = this.query.find(JSON.parse(queryStr));

        return this;
    }
}

module.exports = ApiFeatures;