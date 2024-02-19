// @ts-check
import crypto from "crypto";
import axios from "axios";
import { createTmpOrder, validateBookingData } from "../helper/bookingId";
import { statusCode } from "../utils/statusKeys";
import { TmpOneWayBookingModel } from "../db/models/booking/onewayBooking";

const merchantIdKey = 'PGTESTPAYUAT';
const soltKey = '099eb0cd-02cf-4e2a-8aca-3e6c6aff0399';
const redirectUrl = "http://localhost:8002/api/paystatus/"


export const newPayment = async (req, res) => {
    console.log(req.body);
    const validate = validateBookingData(req.body.booking)
    if (validate) {
        const { type } = req.params;
        const { amount, phone, name, booking } = req.body;

        const order = await createTmpOrder(type, booking);
        const merchantTransactionId = order.bookingId;
        const data = {
            "merchantId": merchantIdKey,
            "merchantTransactionId": merchantTransactionId,
            "merchantUserId": req.user._id.toString(),
            "orderId": order._id,
            "name": name,
            "amount": +`${amount}00`,
            "redirectUrl": redirectUrl + merchantTransactionId,
            "redirectMode": "REDIRECT",
            "callbackUrl": redirectUrl + merchantTransactionId,
            "mobileNumber": phone,
            "paymentInstrument": {
                "type": "PAY_PAGE"
            },
        };

        const payload = JSON.stringify(data);
        const payloadMain = Buffer.from(payload).toString('base64');
        const keyIndex = 1;
        const string = payloadMain + '/pg/v1/pay' + soltKey;
        const sha256 = crypto.createHash('sha256').update(string).digest('hex');
        const checksum = sha256 + '###' + keyIndex;
        const prod_URL = "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay";
        const options = {
            method: 'POST',
            url: prod_URL,
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
                'X-VERIFY': checksum
            },
            data: {
                request: payloadMain
            }
        };


        axios.request(options).then(function (response) {
            return res.send(response.data.data.instrumentResponse.redirectInfo.url)
        }).catch(function (error) {
            console.log(error.response.data);
            res.send(error.response.data);
        });
    } else {
        res.status(statusCode.BAD_REQUEST).send({
            message: validate,
        });
    }
}

export const checkStatus = async (req, res) => {
    const merchantTransactionId = req.params['txnId'];
    if (!merchantTransactionId) {
        return res.status(400).send({ success: false, message: "Missing Transaction ID" });
    }

    const merchantId = merchantIdKey;

    const keyIndex = 1;
    const string = `/pg/v1/status/${merchantId}/${merchantTransactionId}` + soltKey;
    const sha256 = crypto.createHash('sha256').update(string).digest('hex');
    const checksum = sha256 + "###" + keyIndex;
    const options = {
        method: 'GET',
        url: `https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/${merchantId}/${merchantTransactionId}`,
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            'X-VERIFY': checksum,
            'X-MERCHANT-ID': `${merchantId}`
        }
    };
    // CHECK PAYMENT STATUS
    try {
        const response = await axios.request(options);
        if (response.data.success === true) {
            console.log(response.data)
            return res.status(200).send({ success: true, message: "Payment Success" });
        } else {
            return res.status(400).send({ success: false, message: "Payment Failure" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ success: false, message: err.message });
    }
};


const completeOrder = async (type, bookingId) => {
    try {

    } catch (error) {

    }
}



const getBooking = async (type, bookingId) => {
    switch (type) {
        case "oneway":
            return await TmpOneWayBookingModel.findByIdAndDelete({ bookingId });
        case "":
            return await TmpOneWayBookingModel.findByIdAndDelete({ bookingId })
        default:
            break;
    }
}