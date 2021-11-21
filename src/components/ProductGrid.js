import React, { useState } from "react";
import {    
  EuiButton,  
  EuiInMemoryTable,
  EuiGlobalToastList,
  EuiLoadingSpinner
} from "@elastic/eui";
import {
  useProductList,
  UseDeleteProduct,
} from "../shared/service/productApiService";
import { queryCache } from "react-query";

const ProductGrid = ({ UpdateData }) => {
  const [toasts, setToasts] = useState([]);
  const { isLoading, isSuccess, data } = useProductList();

  const [DeleteProduct] = UseDeleteProduct();

  const deleteOnclick = (rowData) => {
    const postData = {
      id: rowData.id,
    };
    DeleteProduct(postData, {
      onSuccess: (res) => {
        if (res.status === 200) {
          const toast = {
            id: Math.random().toString(),
            title: "Success !",
            color: "success",
            text: <p>Successfully deleted product id : {postData.id}</p>,
          };
          setToasts(toasts.concat(toast));
          queryCache.invalidateQueries("get_ProductList");
        } else {
          const toast = {
            id: Math.random().toString(),
            title: "Error !!!",
            color: "danger",
            text: <p>Cannot delete product id : {postData.id}</p>,
          };
          setToasts(toasts.concat(toast));
        }
      },
    });
  };

  const updateOnclick = (rowData) => {
    UpdateData(rowData);
  };

  const columns = [
    {
      name: "Id",
      field: "id",
      width: "100px",
    },
    {
      name: "Name",
      field: "name",
      width: "100px",
    },
    {
      name: "Description",
      field: "description",
      width: "100px",
    },
    {
      name: "Price",
      field: "price",
      width: "100px",
    },
    {
      name: "Update",
      field: "Action",
      width: "50px",
      render: (e, rowData) => (
        <EuiButton
          color="success"
          size="s"
          fill
          onClick={() => updateOnclick(rowData)}
        >
          Update
        </EuiButton>
      ),
    },

    {
      name: "Delete",
      field: "Action",
      width: "50px",
      render: (e, rowData) => (
        <EuiButton
          color="danger"
          size="s"
          fill
          onClick={() => deleteOnclick(rowData)}
        >
          Delete
        </EuiButton>
      ),
    },
  ];
  const search = {
    box: {
      incremental: true,
      schema: true,
    },
  };

  const removeToast = (removedToast) => {
    setToasts(toasts.filter((toast) => toast.id !== removedToast.id));
  };

  return (
    <>
      {isLoading && <EuiLoadingSpinner size="xl" />}
      {isSuccess && (
        <EuiInMemoryTable
          items={data}
          search={search}
          columns={columns}
          pagination={true}
          style={{width:"100%"}}
        ></EuiInMemoryTable>
      )}
      <EuiGlobalToastList
        toasts={toasts}
        dismissToast={removeToast}
        toastLifeTimeMs={6000}
      />
    </>
  );
};

export default ProductGrid;
