const Conn = import.meta.env.VITE_CONN_URI;

export default async function EditAppointmentAction({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData.entries());

  const errors = [];
  const items = [];

  // Validate customer name, notes, and deliveryDate
  if (!data.name || !data.notes || !data.deliveryDate) {
    errors.push("Customer name, notes, and delivery date are required.");
  }

  // Validate noOfItemTypes
  const noOfItemTypes = parseInt(data.noOfItemTypes, 10);
  if (isNaN(noOfItemTypes) || noOfItemTypes <= 0) {
    errors.push("Invalid number of item types.");
  }

  // Process items with validation
  for (let i = 1; i <= noOfItemTypes; i++) {
    const itemName = formData.get(`itemName-${i}`);
    const itemPrice = parseFloat(formData.get(`itemPrice-${i}`));
    const itemQty = parseInt(formData.get(`itemQty-${i}`), 10);

    if (!itemName || isNaN(itemPrice) || isNaN(itemQty)) {
      errors.push(`Item ${i} has missing or invalid values.`);
      continue;
    }

    if (itemPrice <= 0) {
      errors.push(`Item ${i} price must be a positive number.`);
    }
    if (itemQty <= 0) {
      errors.push(`Item ${i} quantity must be a positive integer.`);
    }

    items.push({
      item: {
        name: itemName,
        price: itemPrice,
        qty: itemQty,
        itemTotalPrice: itemQty * itemPrice,
      },
    });
  }

  // If errors exist, return them early
  if (errors.length > 0) {
    return { Success: false, error: null, fieldError: true };
  }

  // Calculate suitsQty and totalPrice safely
  let suitsQty = 0;
  let totalPrice = 0;

  items.forEach((eachItem) => {
    suitsQty += eachItem.item.qty;
    totalPrice += eachItem.item.qty * eachItem.item.price;
  });

  // Prepare appointment data
  const appointmentData = {
    suitsQty,
    customerId: data.name,
    notes: data.notes,
    deliveryDate: data.deliveryDate,
    totalPrice,
  };

  const myAppointment = { appointmentData, items };

  const response = await fetch(
    `${Conn}/appointments/update-appointment/?appointmentId=${localStorage.getItem(
      "appointmentId"
    )}`,
    {
      method: "PUT",
      body: JSON.stringify(myAppointment),
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  localStorage.removeItem("appointmentId");

  if (response.ok) {
    return { Success: true, error: null };
  } else {
    //   const errorResponse = await response.json();
    return { Success: false, error: response };
  }
}
