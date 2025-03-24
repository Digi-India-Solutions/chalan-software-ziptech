"use client";
import axiosInstance from "@/utils/axiosInstance";
import { useRouter } from "next/navigation";
import React, { useState, useMemo, useEffect } from "react";
import toast from "react-hot-toast";

// TableInputRow Component for handling individual row input
const TableInputRow = ({ index, item, handleInputChange }) => {
  // COMMENTED OUT to avoid conflicts with parent states (kept, not removed)
  /*
  const [tableDetails, setTableDetails] = useState(initialTableDetails);
  const [products, setProducts] = useState(initialProducts);

  const handleProductChange = (index, field, value) => {
    const updatedProducts = [...products];
    updatedProducts[index][field] = value;
    setProducts(updatedProducts);
  };

  const handleRowChange = (rowIndex, field, value) => {
    const updatedTable = [...tableDetails];
    updatedTable[rowIndex][field] = value;
    setTableDetails(updatedTable);
  };
  */

  return (
    <tr className="border-t">
      <td className="p-3">{item.sNo}</td>
      {["qty1", "shadeNo1", "qty2", "shadeNo2", "qty3", "shadeNo3"].map(
        (field, i) => (
          <td key={i} className="p-3">
            <input
              type={field.includes("qty") ? "number" : "text"}
              value={item[field]}
              onChange={(e) => handleInputChange(index, field, e.target.value)}
              className="border p-2 rounded w-full bg-gray-50"
            />
          </td>
        )
      )}
    </tr>
  );
};

// Main component for the packing details
function PackDetail() {
  const initialTableDetails = [
    {
      sNo: 1,
      qty1: "",
      shadeNo1: "",
      qty2: "",
      shadeNo2: "",
      qty3: "",
      shadeNo3: "",
    },
    {
      sNo: 2,
      qty1: "",
      shadeNo1: "",
      qty2: "",
      shadeNo2: "",
      qty3: "",
      shadeNo3: "",
    },
    {
      sNo: 3,
      qty1: "",
      shadeNo1: "",
      qty2: "",
      shadeNo2: "",
      qty3: "",
      shadeNo3: "",
    },
    {
      sNo: 4,
      qty1: "",
      shadeNo1: "",
      qty2: "",
      shadeNo2: "",
      qty3: "",
      shadeNo3: "",
    },
    {
      sNo: 5,
      qty1: "",
      shadeNo1: "",
      qty2: "",
      shadeNo2: "",
      qty3: "",
      shadeNo3: "",
    },
    {
      sNo: 6,
      qty1: "",
      shadeNo1: "",
      qty2: "",
      shadeNo2: "",
      qty3: "",
      shadeNo3: "",
    },
    {
      sNo: 7,
      qty1: "",
      shadeNo1: "",
      qty2: "",
      shadeNo2: "",
      qty3: "",
      shadeNo3: "",
    },
    {
      sNo: 8,
      qty1: "",
      shadeNo1: "",
      qty2: "",
      shadeNo2: "",
      qty3: "",
      shadeNo3: "",
    },
    {
      sNo: 9,
      qty1: "",
      shadeNo1: "",
      qty2: "",
      shadeNo2: "",
      qty3: "",
      shadeNo3: "",
    },
    {
      sNo: 10,
      qty1: "",
      shadeNo1: "",
      qty2: "",
      shadeNo2: "",
      qty3: "",
      shadeNo3: "",
    },
    {
      sNo: 11,
      qty1: "",
      shadeNo1: "",
      qty2: "",
      shadeNo2: "",
      qty3: "",
      shadeNo3: "",
    },
    {
      sNo: 12,
      qty1: "",
      shadeNo1: "",
      qty2: "",
      shadeNo2: "",
      qty3: "",
      shadeNo3: "",
    },
    {
      sNo: 13,
      qty1: "",
      shadeNo1: "",
      qty2: "",
      shadeNo2: "",
      qty3: "",
      shadeNo3: "",
    },
    {
      sNo: 14,
      qty1: "",
      shadeNo1: "",
      qty2: "",
      shadeNo2: "",
      qty3: "",
      shadeNo3: "",
    },
    {
      sNo: 15,
      qty1: "",
      shadeNo1: "",
      qty2: "",
      shadeNo2: "",
      qty3: "",
      shadeNo3: "",
    },
    {
      sNo: 16,
      qty1: "",
      shadeNo1: "",
      qty2: "",
      shadeNo2: "",
      qty3: "",
      shadeNo3: "",
    },
    {
      sNo: 17,
      qty1: "",
      shadeNo1: "",
      qty2: "",
      shadeNo2: "",
      qty3: "",
      shadeNo3: "",
    },
    {
      sNo: 18,
      qty1: "",
      shadeNo1: "",
      qty2: "",
      shadeNo2: "",
      qty3: "",
      shadeNo3: "",
    },
    {
      sNo: 19,
      qty1: "",
      shadeNo1: "",
      qty2: "",
      shadeNo2: "",
      qty3: "",
      shadeNo3: "",
    },
    {
      sNo: 20,
      qty1: "",
      shadeNo1: "",
      qty2: "",
      shadeNo2: "",
      qty3: "",
      shadeNo3: "",
    },
  ];

  const initialProducts = [
    { name: "", price: "" },
    { name: "", price: "" },
    { name: "", price: "" },
  ];
  const router = useRouter();

  // Parent states
  const [tableDetails, setTableDetails] = useState(initialTableDetails);
  const [products, setProducts] = useState(initialProducts);

  const [qtyPrice, setQtyPrice] = useState("");
  // const [recvName, setRecvName] = useState("");
  const [partyName, setPartyName] = useState("");
  const [clientId, setClientId] = useState("");
  const [address, setAddress] = useState("");
  const [mob, setMob] = useState("");
  const [date, setDate] = useState("");
  const [driverName, setDriverName] = useState("");
  const [basinAmount, setBasinAmount] = useState();
  const [tcsFare, setTcsFare] = useState("");
  const [invoiceNo, setInvoiceNo] = useState("");
  const [challanNo, setChallanNo] = useState("");
  const [gst, setGst] = useState("");
  const [totalQtyRoll, setTotalQtyRoll] = useState("");
  const [totalWeight, setTotalWeight] = useState("");
  const [totalBags, setTotalBags] = useState("");
  const [reciverName, setReciverName] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQty, setTotalQty] = useState(0);
  const [disabled, setDisabled] = useState(false);
  // Calculate total quantity of items

  const calculatedTotalQty = useMemo(
    () =>
      tableDetails.length > 0
        ? tableDetails.reduce(
            (sum, item) =>
              sum +
              Number(item.qty1 || 0) +
              Number(item.qty2 || 0) +
              Number(item.qty3 || 0),
            0
          )
        : 0, // Default value when tableDetails is empty
    [tableDetails]
  );

  // Update totalQty when calculatedTotalQty changes
  useEffect(() => {
    setTotalQty(calculatedTotalQty);
  }, [calculatedTotalQty]);

  const TotalPrice = useMemo(
    () =>
      products.reduce(
        (sum, item) => sum + Number(item.price || 0),

        0
      ),
    [products]
  );

  const calculateBasinAmount = () => {
    return (
      tableDetails.reduce(
        (sum, item) =>
          sum + Number(item.qty1 || 0) * Number(products[0].price || 0),
        0
      ) +
      tableDetails.reduce(
        (sum, item) =>
          sum + Number(item.qty2 || 0) * Number(products[1].price || 0),
        0
      ) +
      tableDetails.reduce(
        (sum, item) =>
          sum + Number(item.qty3 || 0) * Number(products[2].price || 0),
        0
      )
    );
  };

  // Calculate grand total
  const grandTotal = useMemo(
    () => totalQty * TotalPrice + gst + tcsFare,
    [totalQty, gst, tcsFare, TotalPrice]
  );

  // Handle input change in the table body rows
  const handleInputChange = (rowIndex, field, value) => {
    if (value < 0) {
      value = 0;
    }
    const updatedTableDetails = [...tableDetails];
    updatedTableDetails[rowIndex][field] = value;
    setTableDetails(updatedTableDetails);
  };

  // Handle changes to Product Name / Price in the table header
  const handleProductChange = (prodIndex, field, value) => {
    const updatedProducts = [...products];
    if (value < 0) {
      updatedProducts[prodIndex][field] = 0;
      setProducts(updatedProducts);
    } else {
      updatedProducts[prodIndex][field] = value;
      setProducts(updatedProducts);
    }
  };

  // Handle adding a new row to the table
  const handleAddRow = () => {
    const newRow = {
      sNo: tableDetails.length + 1,
      qty1: "",
      shadeNo1: "",
      qty2: "",
      shadeNo2: "",
      qty3: "",
      shadeNo3: "",
    };
    setTableDetails([...tableDetails, newRow]);
  };

  // Handle deleting a row
  const handleDeleteRow = (index) => {
    const updatedTableDetails = [...tableDetails];
    updatedTableDetails.splice(index, 1);
    setTableDetails(updatedTableDetails);
  };

  // Handle navigation
  const handleViewChallan = () => {
    router.push("/");
  };

  // Handle saving to localStorage
  const handleSave = async () => {
    const newChallan = {
      tableDetails,
      qtyPrice,
      partyName,
      address,
      mob,
      date,
      invoiceNo,
      gst,
      totalQty,
      totalWeight,
      totalBags,
      grandTotal,
      products,
    };
if(!clientId){
  return toast.error("Please select client for further process");
}
if (!driverName) {
  return toast.error("Driver Name is required");
}
    if (!challanNo) {
      return toast.error("Challan Number is required");
    }
    if (!invoiceNo) {
      return toast.error("Invoice Number is required");
    }
    if (!gst) {
      return toast.error("GST Number is required");
    }
    if (!totalBags) {
      return toast.error("Total Bags is required");
    }
    if (!totalWeight) {
      return toast.error("Total Weight is required");
    }
    if (!tcsFare) {
      return toast.error("TCS/Fare is required");
    }
   
    if (mob.length !== 10) {
      toast.error("Mobile number must be 10 digits");
      return;
    }
    let detailsCol1 = newChallan.tableDetails
      .map((item) => {
        return {
          quantity: parseFloat(item.qty1),
          shadeNumber: item.shadeNo1,
        };
      })
      .filter(
        (item) =>
          item.quantity &&
          !isNaN(item.quantity) &&
          item.shadeNumber &&
          item.shadeNumber.trim() !== ""
      );
      


    let detailCol2 = newChallan.tableDetails
      .map((item) => {
        return {
          quantity: parseFloat(item.qty2),
          shadeNumber: item.shadeNo2,
        };
      })
      .filter(
        (item) =>
          item.quantity &&
          !isNaN(item.quantity) &&
          item.shadeNumber &&
          item.shadeNumber.trim() !== ""
      );
    let detailCol3 = newChallan.tableDetails
      .map((item) => {
        return {
          quantity: parseFloat(item.qty3),
          shadeNumber: item.shadeNo3,
        };
      })
      .filter(
        (item) =>
          item.quantity &&
          !isNaN(item.quantity) &&
          item.shadeNumber &&
          item.shadeNumber.trim() !== ""
      );

    if (
      (detailsCol1.length > 0 && !newChallan.products[0].name) ||
      (detailsCol1.length > 0 && !newChallan.products[0].price)
    ) {
      return toast.error("Please fill product name and price for product 1 ");
    }
    if (
      (detailCol2.length > 0 && !newChallan.products[1].name) ||
      (detailCol2.length > 0 && !newChallan.products[1].price)
    ) {
      return toast.error("Please fill product name and price for product 2");
    }
    if (
      (detailCol3.length > 0 && !newChallan.products[2].name) ||
      (detailCol3.length > 0 && !newChallan.products[2].price)
    ) {
      return toast.error("Please fill product name and price for product 3");
    }

    const productVal = newChallan.products
      ?.map((product, i) => ({
        productName: product.name,
        details: i === 0 ? detailsCol1 : i === 1 ? detailCol2 : detailCol3,
      }))
      .filter((product) => {
        return product.productName;
      });

    const transformedData = {
      clientId: clientId,
      address: newChallan.address,
      mobile: newChallan.mob,
      date: newChallan.date,
      driverName: driverName,
      challanNumber: challanNo,
      products: productVal,
      price1: products[0]?.price,
      price2: products[1]?.price,
      price3: products[2]?.price,
      totalRollQty: totalQty,
      basicAmount: totalPrice,
      GSTNumber: gst,
      totalAmount: grandTotal,
      reciverName: newChallan.partyName,
      totalWeight: newChallan.totalWeight,
      totalBags: newChallan.totalBags,
      totalPrice: totalPrice,
      tCSOrFARE: tcsFare,
      invoiceNumber: parseInt(newChallan.invoiceNo),
    };

    console.log("transformedData", transformedData);
    
    try {
      setDisabled(true);
      const response = await axiosInstance.post(
        "/api/v1/challan/create-challan",
        transformedData
      );
      let loading = toast.loading("Challan is being saved...");
      if (response.status === 201) {
        toast.remove(loading);
        toast.success("Challan saved successfully!");
        setDisabled(false);
        router.push("/");
      }
    } catch (error) {
      console.log("error", error);
      setDisabled(false);
      if (error.response) {
        toast.error(error.response.data.message || "Error saving challan");
      }
    }
  };

  // Client data from localStorage
  const [clients, setClients] = useState([]);

  const fetchClient = async () => {
    try {
      const response = await axiosInstance.get("/api/v1/client/get-all-client");

      setClients(response.data.client);
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      }
    }
  };

  // Handle client selection
  const handleClientChange = (clientName) => {
    setPartyName(clientName);
    // Find selected client details
    const selectedClient = clients.find((c) => c.company === clientName);
    if (selectedClient) {
      setAddress(selectedClient.Address || "");
      setMob(selectedClient.phoneNumber || "");
      setClientId(selectedClient._id);
    } else {
      setAddress("");
      setMob("");
    }
  };

  const handleTotalBagsChange = (e) => {
    if (e.target.value < 0) {
      setTotalBags(0);
    } else {
      setTotalBags(Number(e.target.value));
    }
  };
  const handleTcsFareChange = (e) => {
    if (e.target.value < 0) {
      setTcsFare(0);
    } else {
      setTcsFare(Number(e.target.value));
    }
  };
  useEffect(() => {
    setDate(new Date().toISOString().split("T")[0]);
    fetchClient();
  }, []);

  useEffect(() => {
    const calculatedTotalPrice = tableDetails.reduce(
      (sum, item) =>
        sum +
        Number(item.qty1 || 0) * Number(products[0].price || 0) +
        Number(item.qty2 || 0) * Number(products[1].price || 0) +
        Number(item.qty3 || 0) * Number(products[2].price || 0),
      0
    );

    setTotalPrice(calculatedTotalPrice);
  }, [tableDetails, products]);

  return (
    <div className="min-h-screen w-full bg-gray-50 text-gray-900 p-12">
      <header className="bg-yellow-100 py-6 px-12 shadow-lg rounded-lg flex justify-between items-center text-xl font-semibold text-gray-800">
        <div className="flex justify-center items-center mt-4">
          <button className="btn btn-warning" onClick={handleViewChallan}>
            View Challan
          </button>
        </div>
      </header>

      {/* Form Section */}
      <section className="bg-white shadow-md rounded-lg p-8 mt-8 w-full max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {[
            {
              label: "Client Name",
              type: "select",
              options: clients.map((c) => c.company),
              value: partyName,
              onChange: handleClientChange,
            },
            {
              label: "Address",
              type: "text",
              value: address,
              onChange: setAddress,
            },
            { label: "Mob", type: "number", value: mob, onChange: setMob },
            { label: "Date", type: "date", value: date, onChange: setDate },
            {
              label: "Driver Name",
              type: "text",
              value: driverName,
              onChange: setDriverName,
            },
            {
              label: "Challan No",
              type: "text",
              value: challanNo,
              onChange: setChallanNo,
            },
          ].map(({ label, type, options, value, onChange }, index) => (
            <div key={index} className="flex flex-col">
              <label className="mb-2 font-medium text-black">{label}</label>
              {type === "select" ? (
                <select
                  className="border p-2 rounded shadow-sm bg-black text-white"
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                >
                  <option value="">Select Client</option>
                  {options.map((option, i) => (
                    <option key={i} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={type}
                  className="border p-2 rounded shadow-sm bg-black text-white"
                  value={value}
                 
                  onChange={(e) => onChange(e.target.value)}
                  required
                />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Table Section */}
      <section className="bg-white shadow-md rounded-lg p-8 mt-8 w-full max-w-6xl mx-auto overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            {/* 1) Top Row: Product Names */}
            <tr className="bg-yellow-300">
              <th className="p-3" />
              {products.map((product, i) => (
                <th key={i} colSpan={2} className="border p-2">
                  <input
                    type="text"
                    placeholder="Product Name"
                    className="input border p-2 rounded w-full bg-gray-50"
                    value={product.name}
                    onChange={(e) =>
                      handleProductChange(i, "name", e.target.value)
                    }
                  />
                </th>
              ))}
            </tr>

            {/* 2) Middle Row: Qty & ShadeNo Headings */}
            <tr className="bg-yellow-200">
              <th className="p-3">S. No.</th>
              {products.map((_, i) => (
                <React.Fragment key={i}>
                  <th className="border p-2">Qty</th>
                  <th className="border p-2">Shade No</th>
                </React.Fragment>
              ))}
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {tableDetails.map((item, index) => (
              <TableInputRow
                key={index}
                index={index}
                item={item}
                handleInputChange={handleInputChange}
              />
            ))}
            <tr className="bg-yellow-100 font-bold">
              <td className="p-3">T.QTY</td>
              <td className="border p-3" colSpan={2}>
                {Math.round(
                  tableDetails.reduce(
                    (sum, item) => sum + Number(item.qty1 || 0),
                    0
                  ) * 100
                ) / 100}
              </td>
              <td className="border p-3" colSpan={2}>
                {Math.round(
                  tableDetails.reduce(
                    (sum, item) => sum + Number(item.qty2 || 0),
                    0
                  ) * 100
                ) / 100}
              </td>
              <td className="border p-3" colSpan={2}>
                {Math.round(
                  tableDetails.reduce(
                    (sum, item) => sum + Number(item.qty3 || 0),
                    0
                  ) * 100
                ) / 100}
              </td>
            </tr>

            {/* 3) Bottom Row: Product Price */}
            <tr className="bg-yellow-200 font-bold">
              <td className="p-3">@Price</td>
              {products.map((product, i) => (
                <td key={i} colSpan={2} className="border p-3">
                  <input
                    type="number"
                    placeholder="Product Price"
                    value={product.price}
                    min={0}
                    onChange={(e) =>
                      handleProductChange(i, "price", e.target.value)
                    }
                    className="border p-2 rounded w-full bg-gray-50"
                  />
                </td>
              ))}
            </tr>

            <tr className="bg-yellow-300 font-bold">
              <td className="p-3">T.Price</td>
              <td className="border p-3" colSpan={2}>
                {Math.round(
                  tableDetails.reduce(
                    (sum, item) => sum + Number(item.qty1 || 0),
                    0
                  ) *
                    Number(products[0]?.price || 0) *
                    100
                ) / 100}
              </td>
              <td className="border p-3" colSpan={2}>
                {Math.round(
                  tableDetails.reduce(
                    (sum, item) => sum + Number(item.qty2 || 0),
                    0
                  ) *
                    Number(products[1].price || 0) *
                    100
                ) / 100}
              </td>
              <td className="border p-3" colSpan={2}>
                {Math.round(
                  tableDetails.reduce(
                    (sum, item) => sum + Number(item.qty3 || 0),
                    0
                  ) *
                    Number(products[2].price || 0) *
                    100
                ) / 100}
              </td>
            </tr>

            <tr className="bg-yellow-400 font-bold">
              <td className="p-3">Total Price</td>
              <td className="border p-3" colSpan={6}>
                {Math.round(totalPrice * 100) / 100}
              </td>
            </tr>
          </tbody>
        </table>

        {/* <div className="flex gap-4 mt-4">
          <button
            onClick={handleAddRow}
            className="text-white px-4 py-2 rounded-lg shadow-md bg-yellow-500 hover:bg-yellow-600"
          >
            +
          </button>
          <button
            onClick={() => handleDeleteRow(tableDetails.length - 1)}
            className="text-white px-4 py-2 rounded-lg shadow-md bg-red-500 hover:bg-red-600"
          >
            -
          </button>
        </div> */}
      </section>

      {/* Summary Section */}
      <section className="bg-white shadow-md rounded-lg p-8 mt-8 w-full max-w-6xl mx-auto">
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-yellow-100 p-4 rounded-lg">
            <div className="flex justify-between">
              <span>Invoice No. </span>
              <input
                type="number"
                value={invoiceNo}
                min={1}
                onChange={(e) => setInvoiceNo(e.target.value)}
                className="border p-2 rounded-lg w-40 text-white"
              />
            </div>

            <div className="flex justify-between py-2 font-semibold">
              <span>Total Roll Qty</span>
              <span>{Math.round(totalQty * 100) / 100}</span>
            </div>
            <div className="flex justify-between py-2 font-semibold">
              <span>Basic Amount </span>
              <span>{Math.round(calculateBasinAmount() * 100) / 100}</span>
            </div>
            <div className="flex justify-between py-2 font-semibold">
              <span>GST</span>
              <input
                type="number"
                value={gst}
                onChange={(e) => setGst(Number(e.target.value))}
                className="border p-2 rounded-lg w-40 text-white"
              />
            </div>

            <div className="flex justify-between">
              <span>TCS/FARE</span>
              <input
                type="number"
                value={tcsFare}
                onChange={handleTcsFareChange}
                className="border p-2 mb-1 rounded-lg w-40 text-white"
              />
            </div>

            <div className="flex justify-between bg-yellow-300 p-3 rounded-lg font-bold">
              <span>Total Amount</span>
              <span>₹ {Math.round(grandTotal * 100) / 100}</span>
            </div>
          </div>

          <div className="bg-yellow-100 p-4 rounded-lg">
            <div className="grid grid-cols-2 gap-4">
              {/* <div className="flex justify-between">
                <span>Reciver Name</span>
                <input
                  type="text"
                  value={totalQtyRoll}
                  onChange={(e) => setReciverName((e.target.value))}
                  className="border p-2 rounded-lg w-40 text-white"
                />
              </div> */}
              {/* <div className="flex justify-between">
                <span>TCS/FARE</span>
                <input
                  type="number"
                  value={tcsFare}
                  onChange={(e) => setTcsFare(Number(e.target.value))}
                  className="border p-2 rounded-lg w-40 text-white"
                />
              </div> */}
              <div className="flex justify-between">
                <span>Total Weight</span>
                <input
                  type="text"
                  value={totalWeight}
                  onChange={(e) => setTotalWeight(e.target.value)}
                  className="border p-2 rounded-lg w-40 text-white"
                />
              </div>
              {/* <div className="flex justify-between">
                <span>Invoice No. </span>
                <input
                  type="text"
                  value={invoiceNo}
                  onChange={(e) => setInvoiceNo(e.target.value)}
                  className="border p-2 rounded-lg w-40 text-white"
                />
              </div> */}
              <div className="flex justify-between">
                <span>Total Bags</span>
                <input
                  type="number"
                  value={totalBags}
                  onChange={handleTotalBagsChange}
                  className="border p-2 rounded-lg w-40 text-white"
                />
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={disabled}
          className="btn btn-primary mt-4"
        >
          Add Challan
        </button>
      </section>
    </div>
  );
}

export default PackDetail;
