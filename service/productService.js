const Product = require("../Model/ProductModel");

const getProductNormal = async () => {
  try {
    console.log(2);
    const pageSize = 10;
    const page = 1;
    const count = await Product.countDocuments();
    const products = await Product.find({}).limit(pageSize);
    return { products, page, pages: Math.ceil(count / pageSize) };
  } catch (e) {
    return e;
  }
};

const getProductByPage = async (numberOfPage) => {
  try {
    const pageSize = 10;
    const page = numberOfPage;
    const count = await Product.countDocuments();
    const products = await Product.find({})
      .limit(pageSize)
      .skip(pageSize * (page - 1));
    return { products, page, pages: Math.ceil(count / pageSize) };
  } catch (e) {
    return e;
  }
};

const getProductByType = async (type) => {
  try {
    const products = await Product.find({ type });
    const pageSize = 10;
    const page = 1;
    const count = products.length;
    return { products, page, pages: Math.ceil(count / pageSize) };
  } catch (e) {
    return e;
  }
};

const getProductBySort = async (sortProduct) => {
  try {
    const pageSize = 10;
    const page = 1;
    const count = await Product.countDocuments();
    let products;
    if (sortProduct === "newest") {
      products = await Product.find({}).sort({ updatedAt: -1 }).limit(pageSize);
      return { products, page, pages: Math.ceil(count / pageSize) };
    } else if (sortProduct === "rating") {
      products = await Product.find({}).sort({ rating: -1 }).limit(pageSize);
      return { products, page, pages: Math.ceil(count / pageSize) };
    } else if (sortProduct === "desc") {
      products = await Product.find({}).sort({ price: -1 }).limit(pageSize);
      return { products, page, pages: Math.ceil(count / pageSize) };
    } else if (sortProduct === "asc") {
      products = await Product.find({}).sort({ price: 1 }).limit(pageSize);
      return { products, page, pages: Math.ceil(count / pageSize) };
    }
  } catch (e) {
    return e;
  }
};

const getProductByPageAndType = async (numberOfPage, type) => {
  try {
    const pageSize = 10;
    let page = numberOfPage;
    let products = await Product.find({ type });
    // .skip(pageSize * (page - 1));
    let minPageSize = pageSize * (page - 1);
    let decrease = 0;
    if (products?.length <= minPageSize && minPageSize > 0) {
      // products = await Product.find({ type }).limit(pageSize);
      decrease++;
      page -= 1;
      //   minPageSize -= pageSize;
    }
    if (decrease > 0) {
      products = await Product.find({ type })
        .limit(pageSize)
        .skip(pageSize * (page - 1));
    } else {
      products = await Product.find({ type }).limit(pageSize);
    }
    const count = products.length;
    // if (count <= pageSize * (page - 1)) {
    //     page -= 1;
    // }
    return { products, page, pages: Math.ceil(count / pageSize) };
  } catch (e) {
    return e;
  }
};

const getProductByPageAndSort = async (numberOfPage, sortProduct) => {
  try {
    const pageSize = 10;
    const page = numberOfPage;
    const count = await Product.countDocuments();
    let products;
    if (sortProduct === "newest") {
      products = await Product.find({})
        .sort({ updatedAt: -1 })
        .limit(pageSize)
        .skip(pageSize * (page - 1));
      return { products, page, pages: Math.ceil(count / pageSize) };
    } else if (sortProduct === "rating") {
      products = await Product.find({})
        .sort({ rating: -1 })
        .limit(pageSize)
        .skip(pageSize * (page - 1));
      return { products, page, pages: Math.ceil(count / pageSize) };
    } else if (sortProduct === "desc") {
      products = await Product.find({})
        .sort({ price: -1 })
        .limit(pageSize)
        .limit(pageSize)
        .skip(pageSize * (page - 1));
      return { products, page, pages: Math.ceil(count / pageSize) };
    } else if (sortProduct === "asc") {
      products = await Product.find({})
        .sort({ price: 1 })
        .limit(pageSize)
        .limit(pageSize)
        .skip(pageSize * (page - 1));
      return { products, page, pages: Math.ceil(count / pageSize) };
    }
  } catch (e) {
    return e;
  }
};

const getProductByTypeAndSort = async (type, sortProduct) => {
  try {
    const pageSize = 10;
    const page = 1;
    //   const count = await Product.countDocuments();
    let products;
    if (sortProduct === "newest") {
      products = await Product.find({ type })
        .sort({ updatedAt: -1 })
        .limit(pageSize);
      // return { products, page, pages: Math.ceil(count / pageSize) };
    } else if (sortProduct === "rating") {
      products = await Product.find({ type })
        .sort({ rating: -1 })
        .limit(pageSize);
      // return { products, page, pages: Math.ceil(count / pageSize) };
    } else if (sortProduct === "desc") {
      products = await Product.find({ type })
        .sort({ price: -1 })
        .limit(pageSize);
      // return { products, page, pages: Math.ceil(count / pageSize) };
    } else if (sortProduct === "asc") {
      products = await Product.find({ type })
        .sort({ price: 1 })
        .limit(pageSize);
      // return { products, page, pages: Math.ceil(count / pageSize) };
    }
    const count = products.length;
    return { products, page, pages: Math.ceil(count / pageSize) };
  } catch (e) {
    return e;
  }
};

const getProductByFull = async (numberOfPage, type, sortProduct) => {
  try {
    const pageSize = 10;
    let page = numberOfPage;
    //   const count = await Product.countDocuments();
    let products = await Product.find({ type });
    let minPageSize = pageSize * (page - 1);
    let decrease = 0;
    if (products?.length <= minPageSize && minPageSize > 0) {
      // products = await Product.find({ type }).limit(pageSize);
      decrease++;
      page -= 1;
      // minPageSize -= pageSize;
    }
    if (decrease > 0) {
      if (sortProduct === "newest") {
        products = await Product.find({ type })
          .sort({ updatedAt: -1 })
          .limit(pageSize);
        // return { products, page, pages: Math.ceil(count / pageSize) };
      } else if (sortProduct === "rating") {
        products = await Product.find({ type })
          .sort({ rating: -1 })
          .limit(pageSize);
        // return { products, page, pages: Math.ceil(count / pageSize) };
      } else if (sortProduct === "desc") {
        products = await Product.find({ type })
          .sort({ price: -1 })
          .limit(pageSize);
        // return { products, page, pages: Math.ceil(count / pageSize) };
      } else if (sortProduct === "asc") {
        products = await Product.find({ type })
          .sort({ price: 1 })
          .limit(pageSize);
        // return { products, page, pages: Math.ceil(count / pageSize) };
      }
    } else {
      if (sortProduct === "newest") {
        products = await Product.find({ type })
          .sort({ updatedAt: -1 })
          .limit(pageSize)
          .skip(pageSize * (page - 1));
        // return { products, page, pages: Math.ceil(count / pageSize) };
      } else if (sortProduct === "rating") {
        products = await Product.find({ type })
          .sort({ rating: -1 })
          .limit(pageSize)
          .skip(pageSize * (page - 1));
        // return { products, page, pages: Math.ceil(count / pageSize) };
      } else if (sortProduct === "desc") {
        products = await Product.find({ type })
          .sort({ price: -1 })
          .limit(pageSize)
          .skip(pageSize * (page - 1));
        // return { products, page, pages: Math.ceil(count / pageSize) };
      } else if (sortProduct === "asc") {
        products = await Product.find({ type })
          .sort({ price: 1 })
          .limit(pageSize)
          .skip(pageSize * (page - 1));
        // return { products, page, pages: Math.ceil(count / pageSize) };
      }
    }
    const count = products.length;
    return { products, page, pages: Math.ceil(count / pageSize) };
  } catch (e) {
    return e;
  }
};

const getProductService = async (page, type, sort) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data;
      if (+page !== 0 && type && sort) {
        console.log(3);

        data = await getProductByFull(page, type, sort);
      } else if (+page === 0 && !type && !sort) {
        console.log(4);
        data = await getProductNormal();
        console.log(data);
      } else if (+page !== 0 && !type && !sort) {
        console.log(5);

        data = await getProductByPage(page);
      } else if (type && +page === 0 && !sort) {
        console.log(6);

        data = await getProductByType(type);
      } else if (sort && +page === 0 && !type) {
        console.log(7);

        data = await getProductBySort(sort);
      } else if (+page !== 0 && type && !sort) {
        console.log(8);

        data = await getProductByPageAndType(page, type);
      } else if (+page !== 0 && sort && !type) {
        console.log(9);

        data = await getProductByPageAndSort(page, sort);
      } else if (sort && type && +page === 0) {
        console.log(10);

        data = await getProductByTypeAndSort(type, sort);
      }
      console.log(data);
      resolve({
        code: 0,
        result: data,
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getProductBySearchService = (data) => {
  const { key, position, transport, page } = data;

  return new Promise(async (resolve, reject) => {
    let type = key;
    // transport.forEach((item) => (item = item.toLowerCase()));
    try {
      let result;
      const pageSize = 10;
      let minPageSize = pageSize * (page - 1);

      // const page = numberOfPage;
      // const count = await Product.countDocuments();
      // const products = await Product.find({})
      //   .limit(pageSize)
      //   .skip(pageSize * (page - 1));
      // return { products, page, pages: Math.ceil(count / pageSize) };
      if (position.length === 0 && transport.length === 0) {
        result = await Product.find({ $or: type });
      } else if (position.length === 0 && transport.length > 0) {
        console.log("trans");
        result = await Product.find({
          $and: [{ $or: type }, { $or: transport }],
        });
      } else if (position.length > 0 && transport.length === 0) {
        result = await Product.find({
          $and: [{ $or: type }, { $or: position }],
        });
      } else if (position.length > 0 && transport.length > 0) {
        result = await Product.find({
          $and: [{ $or: type }, { $or: position }, { $or: transport }],
        });
      }
      const count = result?.length;
      if (count <= minPageSize && minPageSize > 0) {
        page -= 1;
      } else {
        if (count > pageSize) {
          result = result.slice((page - 1) * pageSize, page * pageSize);
        }
      }
      resolve({
        code: 0,
        productSearch: {
          result,
          page,
          pages: Math.ceil(count / pageSize),
        },
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = { getProductService, getProductBySearchService };

// {
//   position: [ { value: 'England', label: 'England' } ],
//   transport: [ 'Express' ]
// }
