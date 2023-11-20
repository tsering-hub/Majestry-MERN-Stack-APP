import axios from "axios";
import React from "react";
import { toast } from "react-toastify";
import "./chefdashboardcard.scss";
const ChefDashboardCard = ({ order }) => {
  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  const acceptOrderStatus = () => {
    // e.preventDefault();
    const data = {
      id: order._id,
      orderstatus: "Preparing",
    };

    axios
      .put("/order/update", data, config)
      .then((result) => {
        if (result.data.success) {
          toast.success(
            "Order Accepted Successfully",
            setTimeout(() => {
              window.location.reload();
            }, 1500)
          );
        } else {
          console.log("Please Try Again!!!");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const rejectOrderStatus = () => {
    // e.preventDefault();
    const data = {
      id: order._id,
      orderstatus: "Reject",
    };

    axios
      .put("/order/update", data, config)
      .then((result) => {
        if (result.data.success) {
          toast.success(
            "Order Rejected Successfully",
            setTimeout(() => {
              window.location.reload();
            }, 1500)
          );
        } else {
          console.log("Please Try Again!!!");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const readyOrderStatus = () => {
    // e.preventDefault();
    const data = {
      id: order._id,
      orderstatus: "Done",
    };

    axios
      .put("/order/update", data, config)
      .then((result) => {
        if (result.data.success) {
          toast.success(
            "Order Ready To Served",
            setTimeout(() => {
              window.location.reload();
            }, 1500)
          );
        } else {
          console.log("Please Try Again!!!");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <div className="card m-4 chefdashboard-card" style={{ width: "18rem" }}>
      <div className="card-body">
        <h5 className="text-center">Table No. : {order.tablenumber}</h5>
        <h6 className="text-center">Order By : {order.userId.username}</h6>
        <hr />
        <div className="d-flex justify-content-center align-items-center">
          <table className="table table-striped table-hover">
            <thead>
              <tr class="thead">
                <th scope="col">Food Items</th>
                <th scope="col">Quantity</th>
              </tr>
            </thead>
            <tbody>
              {order.orderItems.map((food) => (
                <tr>
                  <td data-label="Name">{food.foodId.name}</td>
                  <td data-label="Title">{food.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="d-flex justify-content-center">
          {order.orderstatus === "Pending" && (
            <>
              <button
                className="btn btn-success fs-5 m-2"
                onClick={() => {
                  acceptOrderStatus();
                }}
              >
                Accept
              </button>
              <button
                className="btn btn-danger fs-5 m-2"
                onClick={() => {
                  rejectOrderStatus();
                }}
              >
                Reject
              </button>
            </>
          )}
          {order.orderstatus === "Preparing" && (
            <button
              className="btn btn-success fs-5 m-2"
              onClick={() => {
                readyOrderStatus();
              }}
            >
              Ready to Serve
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChefDashboardCard;
