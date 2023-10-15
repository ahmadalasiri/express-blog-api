class APIFeatures {
  constructor(private reqQuery: any) {}

  filter() {
    // 1- Filteration
    let query = { ...this.reqQuery };
    let excludedFields = ['page', 'sort', 'limit', 'fields', 'keyword'];
    excludedFields.forEach(field => delete query[field]);

    // 2- Advanced Filteration (gt, gte, lt, lte, in) (mongodb operators)
    let queryStr = JSON.stringify(query);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);
    query = JSON.parse(queryStr);
    return query;
  }

  paginate() {
    // 2- Pagination
    let page = parseInt(this.reqQuery.page) || 1;
    let limit = parseInt(this.reqQuery.limit) || 10;
    let skip = (page - 1) * limit;

    return { skip, limit };
  }
  sort() {
    // 3- Sorting
    let sort = this.reqQuery.sort?.split(',').join(' ') || '-createdAt'; // default sort by createdAt desc
    return sort;
  }

  selectFields() {
    // 4- Fields limiting (projecting & selecting)
    let fields = this.reqQuery.fields?.split(',').join(' ') || '-__v'; // default exclude __v field

    return fields;
  }
}

export default APIFeatures;
