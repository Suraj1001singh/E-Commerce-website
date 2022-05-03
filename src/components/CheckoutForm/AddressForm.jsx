import { Select, MenuItem, Button } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { InputLabel } from "@material-ui/core";
import { commerce } from "../../lib/commerce";
import { Link } from "react-router-dom";

export default function AddressForm({ checkoutToken, next }) {
  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState("");
  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [shippingSubdivision, setShippingSubdivision] = useState("");
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState("");

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    email: "",
    zip: "",
    shippingCountry: "",
    shippingSubdivision: "",
    shippingOption: "",
  });

  const countries = Object.entries(shippingCountries).map(([code, name]) => ({
    id: code,
    label: name,
  }));
  const subdivisions = Object.entries(shippingSubdivisions).map(
    ([code, name]) => ({
      id: code,
      label: name,
    })
  );
  const options = shippingOptions.map((so) => ({
    id: so.id,
    label: `${so.description}-(${so.price.formatted_with_symbol})`,
  }));

  const fetchShippingCOuntries = async (checkoutTokenId) => {
    const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId);

    // console.log(checkoutToken);
    setShippingCountries(countries);
    //setting first element as default to select tab
    //object.keys returns an array of keys
    setShippingCountry(Object.keys(countries)[0]);
  };
  const fetchSubdivisions = async (countryCode) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(
      countryCode
    );
    setShippingSubdivisions(subdivisions);
    setShippingSubdivision(Object.keys(subdivisions)[0]);
  };
  const fetchShippingOptions = async (
    checkoutTokenId,
    country,
    region = null
  ) => {
    const options = await commerce.checkout.getShippingOptions(
      checkoutTokenId,
      { country, region }
    );
    setShippingOptions(options);
    // console.log("options", options);
    setShippingOption(options[0].id);
  };
  useEffect(() => {
    fetchShippingCOuntries(checkoutToken.id);
  }, []);

  //   -----for fetching subdivisions
  useEffect(() => {
    //----if shippingCountry exist then only call fetchSubdivisions()
    if (shippingCountry) fetchSubdivisions(shippingCountry);
  }, [shippingCountry]);

  useEffect(() => {
    if (shippingSubdivision)
      fetchShippingOptions(
        checkoutToken.id,
        shippingCountry,
        shippingSubdivision
      );
  }, [shippingSubdivision]);
  // ------------------------retrieving input data----------------
  const handelInputData = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  // console.log({ countries });
  const formSubmit = (e) => {
    e.preventDefault();

    //transferring data to checkout.jsx
    next(data);
  };
  useEffect(() => {
    setData((prev) => {
      return {
        ...prev,
        shippingCountry: shippingCountry,
        shippingSubdivision: shippingSubdivision,
        shippingOption: shippingOption,
      };
    });
  }, [shippingCountry, shippingSubdivision, shippingOption]);
  // -----------xxxxx-------retrieving input data-----xxxxxx----------

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <form onSubmit={formSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              onChange={handelInputData}
              required
              id="firstName"
              name="firstName"
              label="First name"
              fullWidth
              autoComplete="given-name"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              onChange={handelInputData}
              required
              id="lastName"
              name="lastName"
              label="Last name"
              fullWidth
              autoComplete="family-name"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              onChange={handelInputData}
              required
              id="address"
              name="address"
              label="Address line"
              fullWidth
              autoComplete="shipping address-line"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              onChange={handelInputData}
              id="email"
              name="email"
              label="Email *"
              fullWidth
              autoComplete="email"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              onChange={handelInputData}
              required
              id="city"
              name="city"
              label="City"
              fullWidth
              autoComplete="shipping address-level2"
            />
          </Grid>
          {/* <Grid item xs={12} sm={6}>
            <TextField
              onChange={handelInputData}
              id="state"
              name="state"
              label="State/Province/Region"
              fullWidth
            />
          </Grid> */}
          <Grid item xs={12} sm={6}>
            <TextField
              onChange={handelInputData}
              required
              id="zip"
              name="zip"
              label="Zip / Postal code"
              fullWidth
              autoComplete="shipping postal-code"
            />
          </Grid>

          {/* --------------------------------- */}
          <Grid item xs={12} sm={6}>
            <InputLabel>Shipping Country</InputLabel>
            <Select
              value={shippingCountry}
              fullWidth
              onChange={(e) => setShippingCountry(e.target.value)}
            >
              {countries.map((country) => (
                <MenuItem key={country.id} value={country.id}>
                  {country.label}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel>Shipping Subdivision</InputLabel>
            <Select
              value={shippingSubdivision}
              fullWidth
              onChange={(e) => setShippingSubdivision(e.target.value)}
            >
              {subdivisions.map((subdivision) => (
                <MenuItem key={subdivision.id} value={subdivision.id}>
                  {subdivision.label}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel>Shipping Options</InputLabel>
            <Select
              value={shippingOption}
              fullWidth
              onChange={(e) => setShippingOption(e.target.value)}
            >
              {options.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "4%",
          }}
        >
          <Button component={Link} to="/cart" variant="outlined">
            Back to Cart
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Next
          </Button>
        </div>
      </form>
    </>
  );
}
