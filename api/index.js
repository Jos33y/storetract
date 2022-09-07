const express = require("express");
const bodyParser = require("body-parser");
const Flutterwave = require('flutterwave-node-v3');
const PORT = process.env.PORT || 3000;
const router = express.Router();
const app = express();
const path = require("path");
const {response} = require("express");
const flw = new Flutterwave(process.env.REACT_APP_FLUTTERWAVE_PUBLIC_KEY, process.env.REACT_APP_FLUTTERWAVE_SECRET_KEY);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const getFee = async (amount) => {
    try {
        const payload = {
            "amount": amount,
            "currency":"NGN"
        }
        const response = await flw.Transfer.fee(payload)
        return response;
    } catch (error) {
        console.log(error)
    }
}

const getBanks = async () => {
    try {
        const payload = {
            "country":"NG" //Pass either NG, GH, KE, UG, ZA or TZ to get list of banks in Nigeria, Ghana, Kenya, Uganda, South Africa or Tanzania respectively
        }
        const response = await flw.Bank.country(payload)
        return response;

    } catch (error) {
        console.log(error)
    }
}

const resolveAcct = async (accountNumber, bankCode) => {
    try {
        const payload = {
            "account_number": accountNumber,
            "account_bank": bankCode
        }
        const response = await flw.Misc.verify_Account(payload)
        return response;
    } catch (error) {
        console.log(error)
    }

}

const initTrans = async (amount, bankCode, accountNumber, description, customerRef) => {

    try {
        const payload = {
            "account_bank": bankCode, //This is the recipient bank code. Get list here :https://developer.flutterwave.com/v3.0/reference#get-all-banks
            "account_number": accountNumber,
            "amount": amount,
            "narration": description,
            "currency": "NGN",
            "reference": "STR-"+customerRef+"-"+Date.now(), //This is a merchant's unique reference for the transfer, it can be used to query for the status of the transfer
            "callback_url": "https://webhook.site/65240c42-3619-47b6-9e9a-889322f30ed7",
            // "debit_subaccount": "PSA5A8C11778F3882817",
            "debit_currency": "NGN"
        }

        const response = await flw.Transfer.initiate(payload)
        return response;
    } catch (error) {
        console.log(error)
    }

}

const getATransfer = async (transactionRef) => {
    try {
        const payload = {
            "id": transactionRef // This is the numeric ID of the transfer you want to fetch. It is returned in the call to create a transfer as data.id
        }

        const response = await flw.Transfer.get_a_transfer(payload)
       return response;
    } catch (error) {
        console.log(error)
    }
}


// Routes
app.use(express.static(path.join(__dirname, "../packshop/build")));

app.get("/", function (_, res) {
    res.sendFile(
        path.join(__dirname, "../packshop/build/index.html"),
        function (err) {
            if (err) {
                res.status(500).send(err);
            }
        }
    );
});

router.get("/getbanks", (req, res) => {
    getBanks().then((response) => {
        res.json(response);
    })
});


router.post("/resolve", (req, res) => {
    resolveAcct(req.body.accountNumber, req.body.bankCode).then((response) => {
        res.json(response);
    })
});

router.post("/fetch_fee", (req, res) => {
    getFee(req.body.amount).then((response) => {
        res.json(response);
    })
});

router.post("/withdraw", (req, res) => {
    initTrans(req.body.amount, req.body.bankCode, req.body.accountNumber, req.body.businessName, req.body.customerRef).then((response) => {
        res.json(response)
    })
});

router.post("/verify_transaction", (req, res) => {
    getATransfer(req.body.transactionRef).then((response) => {
        res.json(response);
    })
});


app.use("/", router);
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

getBanks()