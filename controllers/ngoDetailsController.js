const ngoDetails = require('../models/ngoDetails');
const ngo = require('../models/ngo');
const NgoDetails = require('../models/ngoDetails');


const addDetails = async(req, res) => {

    try{
        const {ngoId} = req.body;

        

        const check = ngoDetails.findAll({
            where:{
                ngoId
            }
        })
        if(!check){
            return res.status(401).json({msg:"Sorry, you have already registered data"})
        }
        const {body} = req.body
        console.log(body)
        const details = await ngoDetails.create(body);
       
        res.status(200).json(details);
    }
    catch(err){
        res.status(500).json({msg:err})
    }

    
}


const getAllData = async(req, res) => {
    
    const {id} = req.params;
    try{
        const food = await ngoDetails.findAll({ include: {model: ngo, required: true, where:{serviceType : "food"}},})
        const education = await ngoDetails.findAll({ include: {model: ngo, required: true, where:{serviceType : "education"}},})
        const orphange = await ngoDetails.findAll({ include: {model: ngo, required: true, where:{serviceType : "orphange"}},})
        res.status(200).json({orphange, food, education});   
    }
    catch(err){

    }
}

const addAccountDetail = async (req, res) => {
    // Set your secret key. Remember to switch to your live secret key in production.
    // See your keys here: https://dashboard.stripe.com/apikeys

    const {id} = req.body
    const stripe = require('stripe')('sk_test_51LR9okBXECNl13UDqN0tyC4dSsnHxCzKd6EC0gHHzvwzCOkzZV9xUGR107gfjSNyZszQPAP0Z5UQsEoDN3pQkHpv004yQURZ1z');
    
    const account = await stripe.accounts.create({
      country: 'US',
      type: 'custom',
      capabilities: {
        card_payments: {requested: true},
        transfers: {requested: true},
      },
    });
    
    const accountLink = await stripe.accountLinks.create({
      account: account.id,
      refresh_url: 'https://example.com/reauth',
      return_url: `http://localhost:3000/login`,
      type: 'account_onboarding',
    });
    
    await NgoDetails.update({ account_id:account.id }, {
        where: {
          ngoId:id
        }
      });

    res.send({ url: accountLink.url})
      console.log(account.id)
      //localStorage.setItem("account",account.id)
    
}

module.exports = {addDetails, getAllData, addAccountDetail}