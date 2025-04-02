import {
  Alert,
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  Grid2,
  IconButton,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Form, Link, useActionData, useNavigate } from "react-router";
import toast, { Toaster } from "react-hot-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { debounce } from "lodash";
import { fetchAllCustomers, queryClient } from "../../util/API/http";
import { ArrowBack } from "@mui/icons-material";
const Conn = import.meta.env.VITE_CONN_URI;

export default function AddAppointment() {
  const [name, setName] = useState("");
  const [noOfItemTypes, setNoOfItemTypes] = useState(0);
  const itemInputs = useRef([]);
  const redirect = debounce(() => navigate("/appointments"), 2000);
  const actionResponse = useActionData();
  useEffect(() => {
    if (actionResponse && actionResponse.Success) {
      queryClient.invalidateQueries({
        queryKey: ["fetch-all-appointments"],
        exact: false,
      });
      toast.loading("Successfully created appointment", { duration: 1900 });
      redirect();
    } else if (
      actionResponse &&
      !actionResponse.Success &&
      actionResponse.error.status === 401
    ) {
      localStorage.clear();
      toast.loading("Token expired, logging you out!", { duration: 1900 });
      redirect();
    } else if (actionResponse && !actionResponse.response) {
      toast.error("Failed to create appointment");
    }
  }, [actionResponse]);

  const navigate = useNavigate();

  const { data: myFetchedAppointments } = useQuery({
    queryKey: ["fetch-all-customers"],
    queryFn: fetchAllCustomers,
    staleTime: 1000 * 60 * 5,
  });

  function onChangeHandler(event) {
    const id = event.target.id || event.target.name;
    const value = event.target.value;
    switch (id) {
      case "name":
        setName(value);
        setError((prevState) => ({
          ...prevState,
          nameError: {
            state: false,
            message: "",
          },
        }));
        break;
      case "noOfItemTypes":
        if (value > 10) {
          setError((prevState) => ({
            ...prevState,
            noOfItemTypesError: {
              state: true,
              message: "Value cannot be more then 10",
            },
          }));
          return;
        } else if (value < 0) {
          setError((prevState) => ({
            ...prevState,
            noOfItemTypesError: {
              state: true,
              message: "Value cannot be less then 0",
            },
          }));
          return;
        }
        setNoOfItemTypes(value);
        itemInputs.current = [];
        for (let i = 0; i < value; i++) {
          itemInputs.current.push(
            <>
              <TextField
                name={`itemName-${i + 1}`}
                id={`itemName-${i + 1}`}
                type="text"
                label={`Enter name of the item ${i + 1}`}
                size="medium"
              />
              <Grid2
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <TextField
                  name={`itemQty-${i + 1}`}
                  id={`itemQty-${i + 1}`}
                  type="number"
                  label={`Enter qty of the item ${i + 1}`}
                  size="medium"
                />
                <TextField
                  name={`itemPrice-${i + 1}`}
                  id={`itemPrice-${i + 1}`}
                  label={`Enter price of the item ${i + 1}`}
                  type="number"
                  size="medium"
                />
              </Grid2>
            </>
          );
        }
        setError((prevState) => ({
          ...prevState,
          noOfItemTypesError: {
            state: false,
            message: "",
          },
        }));
        break;
      default:
        break;
    }
  }

  const [error, setError] = useState({
    nameError: {
      state: false,
      message: "",
    },
    noOfItemTypesError: {
      state: false,
      message: "",
    },
    itemsError: {
      state: false,
      message: "",
    },
  });

  function onBlurHandler(event) {
    const id = event.target.id || event.target.name;
    const value = event.target.value;
    switch (id) {
      case "name":
        if (value.length === 0) {
          setError((prevState) => ({
            ...prevState,
            nameError: {
              state: true,
              message: "Invalid Name",
            },
          }));
        }
        break;
      case "noOfItemType":
        if (value.trim().length === 0) {
          setError((prevState) => ({
            ...prevState,
            noOfItemTypesError: {
              state: true,
              message: "Value cannot be zero",
            },
          }));
        }
        break;
      default:
        break;
    }
  }

  return (
    <>
      <Link to="/appointments" style={{ textDecoration: "none" }}>
        <IconButton>
          <ArrowBack />
        </IconButton>
      </Link>
      <Box
        sx={{
          backgroundColor: "white",
          maxWidth: "60%",
          margin: "auto",
          boxShadow: "0px 1px 2px 0px cyan",
          borderRadius: "1rem",
        }}
      >
        <Toaster />
        <Grid2 sx={{ paddingTop: "1rem" }}>
          <Typography variant="h5" sx={{ fontSize: "1.5rem" }} align="center">
            Add Appointment
          </Typography>
        </Grid2>
        <Form method="post">
          <Grid2
            container
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: "0.5rem",
              paddingLeft: "5rem",
              paddingRight: "5rem",
              paddingBottom: "1.5rem",
              paddingTop: "1rem",
            }}
          >
            <FormControl error={error.nameError.state}>
              <InputLabel id="nameLabel">Select Customer</InputLabel>
              <Select
                labelId="nameLabel"
                id="name"
                name="name"
                label="Select Customer"
                value={name}
                onChange={onChangeHandler}
                onBlur={onBlurHandler}
                size="medium"
              >
                {!myFetchedAppointments ? (
                  <Grid2 display="flex" justifyContent="center">
                    <CircularProgress />
                  </Grid2>
                ) : (
                  myFetchedAppointments.map((eachAppointment) => (
                    <MenuItem
                      id={eachAppointment.id}
                      value={eachAppointment.id}
                      key={eachAppointment.id}
                    >
                      {eachAppointment.customerId}
                    </MenuItem>
                  ))
                )}
              </Select>
              <FormHelperText>{error.nameError.message}</FormHelperText>
            </FormControl>
            <TextField
              name="noOfItemTypes"
              type="number"
              id="noOfItemTypes"
              placeholder="Enter the number of item types"
              value={noOfItemTypes}
              onBlur={onBlurHandler}
              error={error.noOfItemTypesError.state}
              helperText={
                error.noOfItemTypesError.message ||
                "eg: 1 Shirt is considered as 1 item and 2 Shirt is also 1 item"
              }
              onChange={onChangeHandler}
              size="medium"
            />
            {noOfItemTypes > 0 &&
              itemInputs.current.map((eachItem) => eachItem)}
            <TextField
              name="notes"
              id="notes"
              label="Notes"
              multiline
              rows={3}
            />
            <TextField name="deliveryDate" id="deliveryDate" type="date" />
            <Button
              type="submit"
              variant="contained"
              sx={{ backgroundColor: "green" }}
              disabled={error.nameError.state || error.noOfItemTypesError.state}
            >
              Add
            </Button>
          </Grid2>
        </Form>
      </Box>
    </>
  );
}
