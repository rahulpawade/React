import React, { useState } from "react";
import { queryCache } from "react-query";
import {
  EuiText,
  EuiFlexGroup,
  EuiFlexItem,
  EuiSpacer,
  EuiFieldText,
  EuiTextArea,
  EuiButton,
  EuiGlobalToastList,
} from "@elastic/eui";
import {
  UseSaveProduct,
  UseUpdateProduct,
} from "../shared/service/productApiService";
import ProductGrid from "../components/ProductGrid";

export default function Product() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [id, setId] = useState("");
  const [toasts, setToasts] = useState([]);
  const [isUpdate, setIsUpdate] = useState(false);

  const onNameChange = (e) => {
    setName(e.target.value);
  };
  const onDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  const onPriceChange = (e) => {
    setPrice(e.target.value);
  };

  const StringIsNullOrEmpty = (str) => {
    return !str || 0 === str.length;
  };

  function numeric(inputtxt) {
    var letterNumber = /^[0-9.]+$/;
    if (inputtxt.match(letterNumber)) {
      return true;
    } else {
      return false;
    }
  }

  const [saveProduct] = UseSaveProduct();
  const onSaveClick = () => {
    if (
      StringIsNullOrEmpty(name) ||
      StringIsNullOrEmpty(description) ||
      StringIsNullOrEmpty(price)
    ) {
      const toast = {
        id: Math.random().toString(),
        title: "Validation Check",
        color: "warning",
        text: "Please fill all the details",
      };
      setToasts(toasts.concat(toast));
      return;
    } else if (!numeric(price)) {
      const toast = {
        id: Math.random().toString(),
        title: "Validation Check",
        color: "warning",
        text: "Price field should be numeric values",
      };
      setToasts(toasts.concat(toast));
      return;
    }

    // debugger;
    const SaveData = {
      postData: {
        name: name,
        description: description,
        price: parseFloat(price),
      },
    };

    saveProduct(SaveData, {
      onSuccess: (res) => {
        if (res.status === 200) {
          // console.log("Successfully Saved");
          const toast = {
            id: Math.random().toString(),
            title: "Success !",
            color: "success",
            text: <p>Successfully Saved Product</p>,
          };
          setToasts(toasts.concat(toast));
          queryCache.invalidateQueries("get_ProductList");
          onClear();
        } else {
          const toast = {
            id: Math.random().toString(),
            title: "Error !!!",
            color: "danger",
            text: <p>Something went wrong, Please try after some time!!</p>,
          };
          setToasts(toasts.concat(toast));
        }
      },
      onError: (res) => {},
    });
  };

  const [updateProduct] = UseUpdateProduct();
  const onUpdateClick = () => {
    if (
      StringIsNullOrEmpty(name) ||
      StringIsNullOrEmpty(description) ||
      StringIsNullOrEmpty(price)
    ) {
      const toast = {
        id: Math.random().toString(),
        title: "Validation Check",
        color: "warning",
        text: "Please fill all the details",
      };
      setToasts(toasts.concat(toast));
      return;
    } else if (!numeric(price.toString())) {
      const toast = {
        id: Math.random().toString(),
        title: "Validation Check",
        color: "warning",
        text: "Price field should be numeric values",
      };
      setToasts(toasts.concat(toast));
      return;
    }

    const UpdateData = {
      id: id,
      postData: {
        id: id,
        name: name,
        description: description,
        price: parseFloat(price),
      },
    };

    updateProduct(UpdateData, {
      onSuccess: (response) => {
        if (response.status === 200) {
          // console.log("Successfully Saved");
          const toast = {
            id: Math.random().toString(),
            title: "Success !",
            color: "success",
            text: <p>Successfully Saved Product</p>,
          };
          setToasts(toasts.concat(toast));
          queryCache.invalidateQueries("get_ProductList");
          onClear();
        } else {
          const toast = {
            id: Math.random().toString(),
            title: "Error !!!",
            color: "danger",
            text: <p>Something went wrong, Please try after some time!!</p>,
          };
          setToasts(toasts.concat(toast));
        }
        setIsUpdate(false);
      },
      onError: (response) => {},
    });
  };
  const onClear = () => {
    setPrice("");
    setDescription("");
    setName("");
  };

  const removeToast = (removedToast) => {
    setToasts(toasts.filter((toast) => toast.id !== removedToast.id));
  };

  const UpdateData = (rowData) => {
    setIsUpdate(true);
    setId(rowData.id);
    setName(rowData.name);
    setPrice(rowData.price);
    setDescription(rowData.description);
    // console.log("UpdateData -> ", rowData);
  };

  return (
    <>
      <EuiText style={{ fontSize:"30px" }}>Product Page </EuiText>
      <EuiFlexGroup style={{paddingTop: "20px", width:"700px"}}>
        <EuiFlexItem><EuiText style={{ fontSize:"20px" }}>Product Name :</EuiText> </EuiFlexItem>
        <EuiFlexItem>
          <EuiFieldText
            placeholder="Product"
            value={name}
            onChange={(e) => {
              onNameChange(e);
            }}
          ></EuiFieldText>
        </EuiFlexItem>
      </EuiFlexGroup>
      <EuiSpacer />
      <EuiFlexGroup  style={{ width:"700px"}}>
        <EuiFlexItem><EuiText style={{ fontSize:"20px" }}>Product Description :</EuiText></EuiFlexItem>
        <EuiFlexItem>
          <EuiTextArea
            placeholder="Description"
            value={description}
            onChange={(e) => {
              onDescriptionChange(e);
            }}
          ></EuiTextArea>
        </EuiFlexItem>
      </EuiFlexGroup>
      <EuiSpacer />
      <EuiFlexGroup style={{ width:"700px"}}>
        <EuiFlexItem><EuiText style={{ fontSize:"20px" }}>Product Price :</EuiText></EuiFlexItem>
        <EuiFlexItem>
          <EuiFieldText
            placeholder="Product Price"
            value={price}
            onChange={(e) => {
              onPriceChange(e);
            }}
          ></EuiFieldText>
        </EuiFlexItem>
      </EuiFlexGroup >
      <EuiFlexGroup style={{paddingLeft:"300px", width:"700px"}}>
        <EuiFlexItem grow={false}>
          {!isUpdate ? (
            <EuiButton fill color="primary" onClick={onSaveClick}>
              Submit
            </EuiButton>
          ) : (
            <EuiButton fill color="success" onClick={onUpdateClick}>
              Update
            </EuiButton>
          )}
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiButton color="accent" onClick={onClear}>
            Clear
          </EuiButton>
        </EuiFlexItem>
      </EuiFlexGroup>
      <EuiSpacer />
      <ProductGrid UpdateData={UpdateData} />
      <EuiGlobalToastList
        toasts={toasts}
        dismissToast={removeToast}
        toastLifeTimeMs={3000}
      />
    </>
  );
}
