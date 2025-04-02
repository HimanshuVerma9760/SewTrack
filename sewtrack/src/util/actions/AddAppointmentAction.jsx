import { queryClient } from "../API/http";

const Conn = import.meta.env.VITE_CONN_URI;
export default async function AddAppointmentAction({ request }) {
  const formData = await request.formData();

  const data = Object.fromEntries(formData.entries());

  const items = [];
  for (let i = 1; i <= data.noOfItemTypes; i++) {
    if (formData.has(`itemName-${i}`)) {
      items.push({
        item: {
          name: formData.get(`itemName-${i}`),
          price: formData.get(`itemPrice-${i}`),
          qty: formData.get(`itemQty-${i}`),
          itemTotalPrice:
            formData.get(`itemQty-${i}`) * formData.get(`itemPrice-${i}`),
        },
      });
    }
  }
  let suitsQty = 0;
  let totalPrice = 0;
  if (items) {
    items.map((eachItem) => {
      suitsQty = suitsQty + eachItem.item.qty * 1;
      totalPrice = totalPrice + eachItem.item.qty * eachItem.item.price;
    });
  }
  const appointmentData = {
    suitsQty,
    customerId: data.name,
    notes: data.notes,
    deliveryDate: data.deliveryDate,
    totalPrice,
  };
  const myAppointment = { appointmentData, items };
  const response = await fetch(`${Conn}/appointments/create-appointment`, {
    method: "post",
    body: JSON.stringify(myAppointment),
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  console.log("Full Form Data:", data);
  console.log("Extracted Items:", items);
  if (response.ok) {
    return { Success: true, error: null};
  } else {
    return { Success: false, error: response};
  }
}
