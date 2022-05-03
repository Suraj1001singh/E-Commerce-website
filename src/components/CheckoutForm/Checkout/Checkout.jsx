import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
  CircularProgress,
  Divider,
  Button,
  CssBaseline,
} from "@material-ui/core";
import useStyles from "./styles";
import AddressForm from "../AddressForm";
import PaymentForm from "../PaymentForm";
import ErrorMessage from "../ErrorMessage";
import { commerce } from "../../../lib/commerce";
const steps = ["Shipping address", "Payments details"];

function Checkout({ cart, order, onCaptureCheckout, error }) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [shippingData, setShippingData] = useState({});
  const [isFinished, setIsFinished] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(cart.id, {
          type: "cart",
        });
        // console.log("token", token);
        setCheckoutToken(token);
      } catch (error) {
        history.push("/");
      }
    };
    //------whenever cart changes we have to generate another token
    generateToken();
  }, [cart]);

  const timeout = () => {
    setTimeout(() => {
      // console.log("hello world");
      setIsFinished(true);
     
    }, 15000);
  };

  let Confirmation = () =>
    // order.customer ? console.log("This is the order",order.customer):console.log("Not found");
    order.customer ? (
      <>{console.log("This is the order",order.customer)}
        <div>
          <Typography variant="h5">
            Thank you for your purchase {order.customer.firstname}{" "}
            {order.customer.lastname}
          </Typography>
          <Divider className={classes.divider}></Divider>
          <Typography variant="subtitle2">
            Order ref: {order.customer_reference}
          </Typography>
        </div>
        <br />
        <Button component={Link} to="/" variant="outlined" type="button">
          Back to Home
        </Button>
      </>
    ) : isFinished ? (
      <ErrorMessage></ErrorMessage>
    ) : (
      <div className={classes.spinner}>
        {console.log("Not found")}
        <CircularProgress />
      </div>
    );

  if (error) {
    <>
      <Typography variant="h5">Error:{error}</Typography>
      <br />
      <Button component={Link} to="/" variant="outlined" type="button">
        Back to Home
      </Button>
    </>;
  }

  const nextStep = () => setActiveStep(activeStep + 1);
  const backStep = () => setActiveStep(activeStep - 1);

  const next = (data) => {
    setShippingData(data);
    nextStep();
  };

  console.log("shiiping data", shippingData);
  //----- this will decide which form is to be shown
  const Form = () =>
    activeStep == 0 ? (
      <AddressForm checkoutToken={checkoutToken} next={next} />
    ) : (
      <PaymentForm
        shippingData={shippingData}
        checkoutToken={checkoutToken}
        nextStep={nextStep}
        backStep={backStep}
        onCaptureCheckout={onCaptureCheckout}
        timeout={timeout}
      />
    );

  return (
    <>
      <CssBaseline />
      <div className={classes.toobar}></div>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {/*---- for creating stepper */}
            {steps.map((step) => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {/*---- different component */}
          {activeStep == steps.length ? (
            <Confirmation />
          ) : (
            checkoutToken && Form()
          )}
        </Paper>
      </main>
    </>
  );
}

export default Checkout;

//:
// isFinished? (
//   <>
//     <div>
//       <Typography variant="h5">Thank you for your purchase </Typography>
//       <Divider className={classes.divider}></Divider>
//     </div>
//       <br/>
//       <Button component={Link} to='/' variant="outlined" type="button">Back to Home</Button>

//   </>

// )
