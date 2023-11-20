import React from "react";
import { BsFillCartCheckFill } from "react-icons/bs";
import "./chefdashboardcard.scss";
const OrderHistoryCard = ({ order }) => {
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
      </div>
    </div>
  );
};

export default OrderHistoryCard;
