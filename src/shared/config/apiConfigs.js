const apiConfigs = {
  baseUrl: "https://localhost:5001/api",
  paths: {
    GetProductList: "/product",
    SaveProduct: `/product`,
    GetProductById: (id) => `/product/${id}`,
    DeleteProduct: (id) => `/product/${id}`,
    UpdateProduct: (id) => `/product/${id}`
  },
};

export { apiConfigs };
