import { ordersByUser } from "api/index";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { getOrdersByUser } from "reduxToolkit/orderSlice";
import Loading from "components/loadingToast/Loading";
import { NavLink } from "react-router-dom";
import moment from "moment";
import "moment/locale/vi";

import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { useTranslation } from "react-i18next";

const Order = () => {
  const { i18n } = useTranslation();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const orders = useSelector((state) => state.orderSlice.ordersByUser);
  let newOrders = [];
  if (orders && orders?.length > 0) {
    newOrders = orders.map((item, index) =>
      Object.assign({}, item, { indexOrder: index + 1 })
    );
  }

  console.log(newOrders);

  //dataTable
  const [filters1, setFilters1] = useState(null);
  const [globalFilterValue1, setGlobalFilterValue1] = useState("");
  const [selectedProducts8, setSelectedProducts8] = useState(null);

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
      totalPrice: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
    });
  };
  const clearFilter1 = () => {
    initFilters1();
    setGlobalFilterValue1("");
    setSelectedProducts8(null);
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
      <div className="flex justify-between sm:flex-col sm:items-start sm:justify-start sm:gap-3">
        <div className="flex items-center justify-start gap-8">
          <Button
            type="button"
            icon="pi pi-filter-slash"
            label={`${i18n.language === "en" ? "Clear" : "Đặt lại"}`}
            className="p-button-outlined"
            onClick={clearFilter1}
          />
        </div>
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            value={globalFilterValue1}
            onChange={onGlobalFilterChange1}
            placeholder={`${
              i18n.language === "en"
                ? "Search by price..."
                : "Tìm kiếm theo giá..."
            }`}
          />
        </span>
      </div>
    );
  };

  const nameOrderTemplate = (rowData) => {
    return (
      <span>
        {i18n.language === "en"
          ? `Order Item ${rowData.indexOrder}`
          : `Đơn hàng ${rowData.indexOrder}`}
      </span>
    );
  };

  const timeTemplate = (rowData) => {
    return (
      <span>
        {i18n.language === "en"
          ? moment(rowData?.updatedAt).locale("en").format("dddd - DD/MM/YYYY")
          : moment(rowData?.updatedAt).format("dddd - DD/MM/YYYY")}
      </span>
    );
  };

  const paidTemplate = (rowData) => {
    return (
      <span>
        {i18n.language === "en"
          ? rowData.isPaid
            ? "Paid"
            : "Not Paid"
          : rowData.isPaid
          ? "Đã thanh toán"
          : "Chưa thanh toán"}
      </span>
    );
  };

  const actionTemplate = (rowData) => {
    return (
      <div className="flex items-center justify-center">
        <button
          type="button"
          class="py-2.5 w-full px-5 mr-2 mb-2 text-lg font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200"
          onClick={() => navigate(`/order/${rowData?._id}`)}
        >
          {i18n.language === "en" ? "Detail" : "Chi tiết"}
        </button>
      </div>
    );
  };

  const header1 = renderHeader1();

  useEffect(() => {
    ordersByUser().then((res) => {
      if (res.code === 0) {
        dispatch(getOrdersByUser(res?.orderData));
        setLoading(false);
      }
    });
    initFilters1();
  }, []);

  return (
    <div className="flex flex-col w-full mx-auto">
      {loading && <Loading />}

      {newOrders?.length === 0 ? (
        <div className="flex flex-col items-center mt-8">
          <span className="xl:text-xl lg:text-lg md:text-lg text-md text-blue-500 font-semibold mb-4">
            {i18n.language === "en"
              ? "Don't have orders"
              : "Không có đơn hàng nào"}
          </span>
          <NavLink to="/" className="w-full flex items-center justify-center">
            <Button
              type="button"
              label={i18n.language === "en" ? "Go Shopping" : "Mua sắm"}
              className="p-button-outlined text-lg"
              style={{ width: "50%", fontSize: "20px" }}
            />
          </NavLink>
        </div>
      ) : (
        <>
          <DataTable
            value={newOrders}
            paginator
            responsiveLayout="scroll"
            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            currentPageReportTemplate={`${
              i18n.language === "en"
                ? "Showing {first} to {last} of {totalRecords}"
                : "Hiển thị {first} đến {last} trong {totalRecords}"
            }`}
            rows={10}
            rowsPerPageOptions={[10, 20, 50]}
            paginatorLeft={paginatorLeft}
            paginatorRight={paginatorRight}
            filters={filters1}
            filterDisplay="menu"
            globalFilterFields={["totalPrice"]}
            header={header1}
            emptyMessage={`${
              i18n.language === "en" ? "No orders found." : "Không có đơn hàng"
            }`}
            // selectionMode="checkbox"
            // selection={selectedProducts8}
            // onSelectionChange={(e) => setSelectedProducts8(e.value)}
            resizableColumns
            columnResizeMode="fit"
            showGridlines
            // dataKey="id"
          >
            {/* <Column
              selectionMode="multiple"
              headerStyle={{ width: "3em" }}
            ></Column> */}
            <Column
              header={`${i18n.language === "en" ? "Name" : "Tên đơn hàng"}`}
              body={nameOrderTemplate}
            ></Column>
            <Column
              header={`${i18n.language === "en" ? "Time" : "Thời gian"}`}
              body={timeTemplate}
            ></Column>
            <Column
              header={`${i18n.language === "en" ? "Paid" : "Thanh toán"}`}
              body={paidTemplate}
              filterField="isPaid"
            ></Column>
            <Column
              field="totalPrice"
              header={`${i18n.language === "en" ? "Price" : "Giá"}`}
              sortable
            ></Column>
            <Column
              header={`${i18n.language === "en" ? "Action" : "Hành động"}`}
              body={actionTemplate}
            ></Column>
          </DataTable>
        </>
      )}
    </div>
  );
};

export default Order;
