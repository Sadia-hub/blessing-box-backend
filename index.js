const express =  require("express")
const cors = require('cors');
require("dotenv").config()

//routers
const ServiceRouter = require("./routes/service")
const ServiceAreaRouter = require("./routes/serviceArea")
const UserRouter = require("./routes/user")
const ngoRouter = require("./routes/ngo")
const projectRouter = require("./routes/project") 
const contactRouter = require("./routes/contact");
const ngoDetailsRouter = require("./routes/ngoDetails")
const donationRouter = require("./routes/donation")
const proofRouter = require("./routes/proof")
//const connectDB = require("./db")
const sequelize = require("./db")


//models

const user = require("./models/users")
const ngo= require("./models/ngo")
const project = require("./models/project")
const proof = require("./models/proof")
const service = require("./models/services")
const ngoService = require("./models/ngoService")
const serviceArea = require("./models/serviceAreas")
const ngoServiceArea = require("./models/ngoServiceArea")
const ngoDetails = require("./models/ngoDetails")
const donations = require("./models/donation")
const contact =require("./models/contact")

//relations of our model
    
//user


user.hasOne(ngo)
ngo.belongsTo(user)

//ngo

ngo.hasOne(ngoDetails);
ngoDetails.belongsTo(ngo);

ngo.belongsToMany(service, {through: ngoService})
service.belongsToMany(ngo, {through: ngoService})

ngo.belongsToMany(serviceArea, {through: ngoServiceArea})
serviceArea.belongsToMany(ngo, {through: ngoServiceArea})

ngo.hasMany(project)
project.belongsTo(ngo)

//projects
project.hasOne(proof)
proof.belongsTo(project)


//donation
// project.belongsToMany(user, {through: "donations"})
// user.belongsToMany(project, {through: "donations"})

//
project.hasMany(donations)
donations.belongsTo(project)

user.hasMany(donations)
donations.belongsTo(user)

//contact

//contact.belongsTo(contact)

const app = express();
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use(ServiceRouter)
app.use(ServiceAreaRouter);
app.use(UserRouter)
app.use(ngoRouter)
app.use(projectRouter)
app.use(ngoDetailsRouter)
app.use(donationRouter)
app.use(contactRouter)
app.use(proofRouter)

app.all("*",(req, res)=>{
    res.status(404).json({
        message:"Page Not Found"
    })
});


sequelize.sync( {force:true}  ).then(()=>{
    service.bulkCreate([{service:"education"}, {service:"food"}, {service:"orphanage"}])
}).then(()=>{
    serviceArea.bulkCreate([{area:"Karachi"}, {area:"Sukkur"}, {area:"Ghotki"}])
}).then(()=>{
    app.listen(process.env.PORT, (req, res)=>{
        console.log(`listening to port ${process.env.PORT}`)
    })
}).catch((err)=>{
    console.log(err)
})
    