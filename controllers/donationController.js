const donations = require('../models/donation');
const projects =require('../models/project');
var amount=0   ;
// const donate = async (req, res) =>{
//      try{

//         const stripe = require('stripe')('sk_test_51LR9okBXECNl13UDqN0tyC4dSsnHxCzKd6EC0gHHzvwzCOkzZV9xUGR107gfjSNyZszQPAP0Z5UQsEoDN3pQkHpv004yQURZ1z');

//         const {account_id, donation, projectId} = req.body;
//         // var donated_amount = parseInt(donation);
//         // amount+=donated_amount;
       
//         const session = await stripe.checkout.sessions.create({
//         line_items: [
//             {
//             price_data: {
//                 currency: 'pkr',
//                 product_data: {
//                 name: ''+projectId,
//                 },
//                 unit_amount: donation*100,
//             },
//             quantity: 1,
//             },
//         ],
//         mode: 'payment',
//         success_url: `http://localhost:3000/blessings/${donation} `,
//         cancel_url: 'http://localhost:3000/login',
//         payment_intent_data: {
//             application_fee_amount: 123,
//         },
//         }, {
//         stripeAccount: account_id,
//         })
       
//         res.json({ url: session.url })
//     }
//     catch(err){
//         res.json({msg:err})
//     }

// }


const donate = async (req, res) =>{

    try{

        const stripe = require('stripe')('sk_test_51LR9okBXECNl13UDqN0tyC4dSsnHxCzKd6EC0gHHzvwzCOkzZV9xUGR107gfjSNyZszQPAP0Z5UQsEoDN3pQkHpv004yQURZ1z');

        const {account_id, donation, projectId} = req.body;
       
        const session = await stripe.checkout.sessions.create({
        line_items: [
            {
            price_data: {
                currency: 'pkr',
                product_data: {
                name: ''+projectId,
                },
                unit_amount: donation*100,
            },
            quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: `http://localhost:3000/blessing/donation/${donation}/project/${projectId}`,
        cancel_url: 'http://localhost:3000/login',
        payment_intent_data: {
            application_fee_amount: 123,
        },
        }, {
        stripeAccount: account_id,
        })
        
        res.json({ url: session.url })
         
    }
    catch(err){
        res.json({msg:err})
    }

}

const donateForMobile = async (req, res) =>{
    try{
        const {donation, projectId} = req.body;
        console.log('donation is ',donation)
        const SECRETKEY ='sk_test_51LWfS4FvT289HIDPxtvmuwFe29HzTIMMaKSfrGIRmhsoomo0Q1VVnVGBhAJouOVyZOcj8rhtYhDkLmL99Jumil0m003lh94w6O';
        const stripe = require('stripe')(SECRETKEY);
        const paymentIntent = await stripe.paymentIntents.create({
            amount: donation*100,
            currency: 'pkr',
 
        })
        const clientSecret = await paymentIntent.client_secret;
        res.json({clientSecret: clientSecret});
    }
    catch(err){
        res.json({error: err.message})
    }
} 


const addDonationToDb = async (req, res) =>{
    try{
        const donation = await donations.create(req.body);
        res.status(200).json(donation)
    }
    catch(err){
        res.status(500).json({success:false, msg:err.message})
    }
}

//get donation by projectID

const donationOfProject = async(req, res) =>{
    try{
        const {id} = req.params;
        let totaldonation =0;
        const donation  = await donations.findAll({
            where:{
                projectId: id
            }
        })
        console.log('donation is', donation[0].dataValues.donation),
        console.log('donation is', donation.length);
        for(var i=0; i<donation.length; i++){
            totaldonation = totaldonation+ donation[i].dataValues.donation;
        }
        const projectData = await projects.findByPk(id)
        console.log(projectData.dataValues.target)
        if(projectData){
            let totalDonationPercent = (totaldonation*100)/projectData.dataValues.target
            const project = await projects.update({  amountRecieved :totalDonationPercent}, {
                where: {
                  id
                }
              });
        }
        res.status(200).json(   totaldonation )
    }
    catch(err){
        res.json({error: err.message})
    }
}

//server sent events
 

module.exports = {donate, addDonationToDb, donateForMobile,   donationOfProject}