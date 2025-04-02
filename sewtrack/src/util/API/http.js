import { QueryClient } from "@tanstack/react-query";

const Conn = import.meta.env.VITE_CONN_URI;
export const queryClient = new QueryClient();

export async function addNewCustomer({ signal, formData }) {
  const response = await fetch(`${Conn}/customers/add-customer`, {
    method: "post",
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    signal: signal,
  });
  if (response.ok) {
    const result = await response.json();
    return result.result;
  } else {
    const error = new Error("Something went wrong");
    error.message = response.statusText;
    error.info = response;
    throw error;
  }
}

export async function editCustomer({ signal, formData }) {
  try {
    const response = await fetch(`${Conn}/customers/edit-customer`, {
      method: "put",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      signal: signal,
    });
    if (response.ok) {
      const result = await response.json();
      return result.result;
    } else {
      const error = new Error("Something went wrong");
      error.message = response.statusText;
      error.info = response;
      throw error;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function fetchCustomers({
  signal,
  page,
  rowsPerPage,
  searchTerm,
}) {
  try {
    const response = await fetch(
      `${Conn}/customers/get-all/?page=${
        page + 1
      }&limit=${rowsPerPage}&keyword=${searchTerm}`,
      { signal: signal }
    );
    const result = await response.json();
    console.log("sadadasdadasd");
    if (response.ok) {
      console.log("customers fetched");
      return { customers: result.result, totalRecords: result.totalRecords };
    }
  } catch (error) {
    console.error("Fetch error..............:", error);
  }
}

export default async function fetchAppointments({
  signal,
  page,
  rowsPerPage,
  searchTerm,
}) {
  try {
    const response = await fetch(
      `${Conn}/appointments/get-all/?page=${
        page + 1
      }&limit=${rowsPerPage}&keyword=${searchTerm}`,
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        signal: signal,
      }
    );
    if (response.ok) {
      const result = await response.json();
      return {
        appointments: result.result,
        totalRecords: result.totalRecords,
      };
    } else {
      const error = new Error("Something went wrong");
      error.info = response;
      throw error;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function fetchAllCustomers({ signal }) {
  try {
    const response = await fetch(`${Conn}/customers/get-customers`, {
      signal: signal,
    });
    if (response.ok) {
      const result = await response.json();
      return result.result;
    } else {
      const error = new Error("Something went wrong!!");
      throw error;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function fetchAppointmentItems({ signal, appointmentId }) {
//   try {
    const response = await fetch(
      `${Conn}/appointment-items/get-all/?appointmentId=${appointmentId}`,
      {
        signal: signal,
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response.ok) {
      const result = await response.json();
      return result.result;
    } else {
      const error = new Error("Something went wrong");
      error.info = response;
      throw error;
    }
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
}
