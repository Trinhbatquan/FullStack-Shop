import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode, FilterOperator } from "primereact/api";
// import { dataImage } from "assets/img";

import { FaTimes } from "react-icons/fa";
import { useParams, useLocation } from "react-router";
import { Header, Rating } from "components";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import {
  addCart,
  deleteAllCarts,
  deleteCart,
  deleteManyCart,
  updateCart,
} from "reduxToolkit/cartSlice";
import { getProductById } from "api/index";
import { NavLink } from "react-router-dom";

import { GrFormSubtract, GrAdd } from "react-icons/gr";
import { BsTrash } from "react-icons/bs";
import NavBar from "utils/NavBar";
import { setNavBar } from "reduxToolkit/navBarSlice";

const ScreenCart = () => {
  const location = useLocation();

  const navigation = useSelector((state) => state.navbarReducer.keyNavBar);
  const keyNavigate = location?.pathname?.split("/")[1];

  const dispatch = useDispatch();
  const id = useParams();
  const qty = useLocation().search.split("=")[1];
  const navigate = useNavigate();

  let carts = useSelector((state) => state.cartSlice.carts);
  const user = useSelector((state) => state.userSlice.user);
  // console.log(carts);

  //dataTable
  const [filters1, setFilters1] = useState(null);
  const [globalFilterValue1, setGlobalFilterValue1] = useState("");
  const [selectedProducts8, setSelectedProducts8] = useState(null);

  // console.log(selectedProducts8);

  localStorage.setItem("cart", JSON.stringify(carts));

  useEffect(() => {
    if (id.id) {
      getProductById(id.id).then((data) => {
        dispatch(
          addCart({
            product: data._id,
            name: data.name,
            image: data.image,
            description: data.description,
            rating: data.rating,
            price: data.price,
            numReviews: data.numReviews,
            countInStock: data.countInStock,
            reviews: data.reviews,
            qty,
          })
        );
      });
    }
    initFilters1();
    dispatch(setNavBar(keyNavigate));
  }, []);

  const handleUpdateCart = (qty, dataProduct) => {
    let count = 0;
    for (let i = 0; i < carts.length; i++) {
      if (carts[i]?.name === dataProduct?.name) {
        count = i;
        break;
      }
    }

    dispatch(
      updateCart({
        product: carts[count].product,
        name: carts[count].name,
        image: carts[count].image,
        description: carts[count].description,
        rating: carts[count].rating,
        numReviews: carts[count].numReviews,
        price: carts[count].price,
        countInStock: carts[count].countInStock,
        reviews: carts[count].reviews,
        qty: qty,
      })
    );
  };

  const handleRemoveCart = (product) => {
    if (!Array.isArray(product) && product) {
      let count = 0;
      for (let i = 0; i < carts.length; i++) {
        if (carts[i]?.product === product) {
          count = i;
          break;
        }
      }
      dispatch(deleteCart(count));
      setSelectedProducts8([]);
      navigate("/cart");
    } else if (Array.isArray(product)) {
      if (product?.length > 0) {
        if (product.length === carts?.length) {
          dispatch(deleteAllCarts([]));
        } else {
          let reduxCart = [];
          product.forEach((item) => {
            reduxCart.push(item.product);
          });
          console.log(reduxCart);
          dispatch(deleteManyCart(reduxCart));
        }
        setSelectedProducts8([]);
        navigate("/cart");
      }
    }

    // dispatch(deleteCart(index));
  };

  //data tables
  const imageBodyTemplate = (rowData) => {
    return (
      <img
        src={`${rowData.image}`}
        onError={(e) =>
          (e.target.src =
            "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
        }
        alt={rowData.image}
        className=" object-cover w-[50px] h-[80px]"
      />
    );
  };

  const ratingBodyTemplate = (rowData) => {
    return <Rating value={rowData.rating} font="lg" readOnly cancel={false} />;
  };

  const statusQuantityTemplate = (rowData) => {
    // console.log(rowData);
    return (
      <div className="flex items-center justify-start">
        <button
          className="text-lg flex items-center justify-center"
          style={{
            border: "1px solid rgba(0,0,0,.09)",
            borderTopLeftRadius: "2px",
            borderBottomLeftRadius: "2px",
            backgroundColor: "transparent",
            color: "rgba(0,0,0,.8)",
            width: "40px",
            height: "36px",
          }}
          onClick={() => {
            return rowData.qty > 1
              ? handleUpdateCart(+rowData.qty - 1, rowData)
              : "";
          }}
        >
          <GrFormSubtract className="text-lg" />
        </button>
        <input
          value={rowData.qty}
          className="text-center"
          style={{
            width: "50px",
            height: "36px",
            border: "1px solid rgba(0,0,0,.09)",
          }}
        />
        <button
          className="text-lg flex items-center justify-center"
          style={{
            border: "1px solid rgba(0,0,0,.09)",
            borderTopRightRadius: "2px",
            borderBottomRightRadius: "2px",
            backgroundColor: "transparent",
            color: "rgba(0,0,0,.8)",
            width: "40px",
            height: "36px",
          }}
          onClick={() => {
            return rowData.qty < rowData.countInStock
              ? handleUpdateCart(+rowData.qty + 1, rowData)
              : "";
          }}
        >
          <GrAdd className="text-md" />
        </button>
      </div>
    );
  };

  const deleteTemplate = (rowData) => {
    // console.log(rowData);
    return (
      <div className="">
        <BsTrash
          className={`text-2xl cursor-pointer ${
            selectedProducts8?.length === 1 &&
            selectedProducts8[0]?.product === rowData?.product
              ? "block"
              : "hidden"
          }`}
          onClick={() => handleRemoveCart(selectedProducts8[0]?.product)}
        />
      </div>
    );
  };

  //pagination
  const paginatorLeft = (
    <Button type="button" icon="pi pi-refresh" className="p-button-text" />
  );
  const paginatorRight = (
    <Button type="button" icon="pi pi-cloud" className="p-button-text" />
  );

  //filter
  const initFilters1 = () => {
    setFilters1({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      name: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
    });
  };
  const clearFilter1 = () => {
    initFilters1();
    setGlobalFilterValue1("");
  };
  const onGlobalFilterChange1 = (e) => {
    const value = e.target.value;
    let _filters1 = { ...filters1 };
    _filters1["global"].value = value;

    setFilters1(_filters1);
    setGlobalFilterValue1(value);
  };
  const renderHeader1 = () => {
    return (
      <div className="flex justify-between">
        <div className="flex items-center justify-start gap-8">
          <Button
            type="button"
            icon="pi pi-filter-slash"
            label="Clear"
            className="p-button-outlined"
            onClick={clearFilter1}
          />
          <Button
            type="button"
            // icon="pi pi-filter-slash"
            label="Delete"
            className={`p-button-outlined ${
              selectedProducts8?.length >= 1 ? "" : "disabled"
            }`}
            onClick={() => handleRemoveCart(selectedProducts8)}
          />
        </div>
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            value={globalFilterValue1}
            onChange={onGlobalFilterChange1}
            placeholder="Search By Name..."
          />
        </span>
      </div>
    );
  };

  const header1 = renderHeader1();

  return (
    <div>
      <Header />
      <div style={{ height: "65px", width: "100%" }}></div>

      <div
        className="w-full flex flex-col mx-auto p-8"
        style={{ maxWidth: "90%", width: "90%" }}
      >
        {carts.length === 0 ? (
          <div className="flex flex-col items-center mt-8">
            <span className="text-xl text-blue-500 font-semibold mb-4">
              Don't have cart.
            </span>
            <NavLink to="/" className="w-full flex items-center justify-center">
              <Button
                type="button"
                // icon="pi pi-filter-slash"
                label="GO SHOPPING"
                className="p-button-outlined"
                style={{ width: "50%" }}
              />
            </NavLink>
          </div>
        ) : (
          <>
            {navigation && (
              <div className="w-4/5">
                <NavBar navigation={navigation} />
              </div>
            )}
            <div className="w-full mt-8">
              <DataTable
                value={carts}
                paginator
                responsiveLayout="scroll"
                paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
                rows={10}
                rowsPerPageOptions={[10, 20, 50]}
                paginatorLeft={paginatorLeft}
                paginatorRight={paginatorRight}
                filters={filters1}
                filterDisplay="menu"
                globalFilterFields={["name"]}
                header={header1}
                emptyMessage="No customers found."
                selectionMode="checkbox"
                selection={selectedProducts8}
                onSelectionChange={(e) => setSelectedProducts8(e.value)}
                resizableColumns
                columnResizeMode="fit"
                // showGridlines
                // dataKey="id"
              >
                <Column
                  selectionMode="multiple"
                  headerStyle={{ width: "3em" }}
                ></Column>
                <Column
                  header="Image"
                  body={imageBodyTemplate}
                  style={{ width: "10%" }}
                ></Column>
                <Column
                  field="name"
                  header="Name Product"
                  style={{ width: "40%" }}
                ></Column>
                <Column
                  // sortable
                  // field="countInStock"
                  // header="Count In Stock"
                  style={{ width: "10%" }}
                ></Column>
                <Column
                  header="Quantity"
                  body={statusQuantityTemplate}
                  style={{ width: "20%" }}
                ></Column>
                <Column field="price" header="Price" sortable></Column>
                <Column
                  header="Rating"
                  sortable
                  body={ratingBodyTemplate}
                  style={{ width: "15%" }}
                ></Column>
                {selectedProducts8 && (
                  <Column
                    body={deleteTemplate}
                    style={{ width: "2%" }}
                  ></Column>
                )}
              </DataTable>
            </div>

            <div className="w-full mr-4 p-4 mb-8 sm:mb-4 sm:mr-0 sm:flex sm:items-center sm:justify-center">
              <span className="float-right text-lg font-semibold text-red-500 flex items-center justify-center gap-0.5">
                Totals:{" "}
                <span>
                  {carts?.reduce(
                    (acc, item) => acc + item?.qty * item?.price,
                    0
                  )}
                </span>
                <span className="text-xl relative -top-1">$</span>
              </span>
            </div>

            <div
              className="flex items-center justify-evenly 
            sm:flex-col sm:justify-center sm:items-center sm:gap-3"
            >
              <NavLink to="/" className="w-1/3">
                <button
                  type="button"
                  class="py-2.5 w-full px-5 mr-2 mb-2 text-lg font-medium text-white outline-none bg-blue-500 opacity-70 rounded-lg hover:opacity-100"
                >
                  Continue To Shopping
                </button>
              </NavLink>
              <NavLink
                to={`${
                  user?.name
                    ? "/deliveryAddress"
                    : "/login?redirect=/deliveryAddress"
                }`}
                className="w-1/3"
              >
                <button
                  type="button"
                  class="py-2.5 w-full px-5 mr-2 mb-2 text-lg font-medium text-white opacity-70 outline-none bg-red-600 rounded-lg hover:opacity-100"
                >
                  Buy
                </button>
              </NavLink>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ScreenCart;
