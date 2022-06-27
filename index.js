const express =  require("express")
require("dotenv").config()

//routers
const ServiceRouter = require("./routes/service")
const ServiceAreaRouter = require("./routes/serviceArea")
const UserRouter = require("./routes/user")

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


//relations of our model
    
//user


user.hasOne(ngo)
ngo.belongsTo(user)

//ngo

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
project.belongsToMany(user, {through: "donations"})
user.belongsToMany(project, {through: "donations"})


const app = express();



app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(ServiceRouter)
app.use(ServiceAreaRouter);
app.use(UserRouter)

app.all("*",(req, res)=>{
    res.status(404).json({
        message:"Page Not Found"
    })
});





sequelize.sync({force:true}).then(()=>{
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
    