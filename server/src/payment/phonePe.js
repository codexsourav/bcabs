// @ts-check
import crypto from "crypto";
import axios from "axios";
import { createTmpOrder, validateBookingData } from "../helper/bookingId";
import { statusCode } from "../utils/statusKeys";
import {
  OneWayBookingModel,
  TmpOneWayBookingModel,
} from "../db/models/booking/onewayBooking";
import {
  LocalBookingModel,
  TmpLocalBookingModel,
} from "../db/models/booking/localBooking";
import {
  AirportBookingModel,
  TmpAirportBookingModel,
} from "../db/models/booking/airportBooking";
import {
  RoundTripBookingModel,
  TmpRoundTripBookingModel,
} from "../db/models/booking/roundTripBooking";

const merchantIdKey = "PGTESTPAYUAT";
const soltKey = "099eb0cd-02cf-4e2a-8aca-3e6c6aff0399";
const redirectUrl = "https://babagcabs.com/api/paystatus/";

export const newPayment = async (req, res) => {
  console.log(req.body);
  const validate = validateBookingData(req.body.booking);
  if (validate) {
    const { type } = req.params;
    const { amount, phone, name, booking } = req.body;

    const order = await createTmpOrder(type, booking);
    const merchantTransactionId = order.bookingId;
    const data = {
      merchantId: merchantIdKey,
      merchantTransactionId: merchantTransactionId,
      merchantUserId: req.user._id.toString(),
      orderId: order._id,
      name: name,
      amount: +`${amount}00`,
      redirectUrl: `${redirectUrl}${type}/${merchantTransactionId}`,
      redirectMode: "REDIRECT",
      callbackUrl: `${redirectUrl}${type}/${merchantTransactionId}`,
      mobileNumber: phone,
      paymentInstrument: {
        type: "PAY_PAGE",
      },
    };

    const payload = JSON.stringify(data);
    const payloadMain = Buffer.from(payload).toString("base64");
    const keyIndex = 1;
    const string = payloadMain + "/pg/v1/pay" + soltKey;
    const sha256 = crypto.createHash("sha256").update(string).digest("hex");
    const checksum = sha256 + "###" + keyIndex;
    const prod_URL =
      "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay";

    const options = {
      method: "POST",
      url: prod_URL,
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "X-VERIFY": checksum,
      },
      data: {
        request: payloadMain,
      },
    };

    axios
      .request(options)
      .then(function (response) {
        return res.send(response.data.data.instrumentResponse.redirectInfo.url);
      })
      .catch(function (error) {
        console.log(error.response.data);
        res.status(500).send(error.response.data);
      });
  } else {
    res.status(statusCode.BAD_REQUEST).send({
      message: validate,
    });
  }
};

export const checkStatus = async (req, res) => {
  const merchantTransactionId = req.params["txnId"];
  const type = req.params["type"];

  if (!merchantTransactionId) {
    return res
      .status(400)
      .send({ success: false, message: "Missing Transaction ID" });
  }

  const merchantId = merchantIdKey;

  const keyIndex = 1;
  const string =
    `/pg/v1/status/${merchantId}/${merchantTransactionId}` + soltKey;
  const sha256 = crypto.createHash("sha256").update(string).digest("hex");
  const checksum = sha256 + "###" + keyIndex;
  const options = {
    method: "GET",
    url: `https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/${merchantId}/${merchantTransactionId}`,
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      "X-VERIFY": checksum,
      "X-MERCHANT-ID": `${merchantId}`,
    },
  };

  // CHECK PAYMENT STATUS
  try {
    const response = await axios.request(options);

    if (response.data.success === true) {
      console.log(response.data);
      await completeOrder(type, merchantTransactionId, response.data.data);
      return res.status(200).send({
        success: true,
        message: "Payment Success",
        data: response.data,
      });
    } else {
      return res
        .status(400)
        .send({ success: false, message: "Payment Failure" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ success: false, message: err.message });
  }
};

const completeOrder = async (type, bookingId, paymentInfo) => {
  try {
    const order = await getBooking(type, bookingId);
    if (order) {
      // @ts-ignore
      return await saveBooking(type, {
        ...order._doc,
        translation: paymentInfo,
      });
    } else {
      throw new Error("No Order Found");
    }
  } catch (error) {
    throw error;
  }
};

export const getBooking = async (type, bookingId) => {
  switch (type) {
    case "oneway":
      return await TmpOneWayBookingModel.findOneAndDelete({ bookingId });
    case "local":
      return await TmpLocalBookingModel.findOneAndDelete({ bookingId });
    case "airport":
      return await TmpAirportBookingModel.findOneAndDelete({ bookingId });
    case "roundtrip":
      return await TmpRoundTripBookingModel.findOneAndDelete({ bookingId });
    default:
      throw new Error("Invalid Trip Type");
  }
};

export const saveBooking = async (type, booking) => {
  switch (type) {
    case "oneway":
      const newOneWayOrder = new OneWayBookingModel(booking);
      return newOneWayOrder.save();
    case "local":
      const newLocalOrder = new LocalBookingModel(booking);
      return newLocalOrder.save();
    case "airport":
      const newAirportOrder = new AirportBookingModel(booking);
      return newAirportOrder.save();
    case "roundtrip":
      const newRoundTripOrder = new RoundTripBookingModel(booking);
      return newRoundTripOrder.save();
    default:
      throw new Error("Invalid Trip Type");
  }
};
