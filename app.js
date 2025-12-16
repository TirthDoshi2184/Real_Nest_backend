process.on("unhandledRejection", (reason, promise) => {
    console.error("Unhandled Promise Rejection:", reason);
    // Optionally log the promise as well
    // console.error(promise);
  });
  

const express = require("express");
const mongoose = require("mongoose")
const cors = require('cors')
const app = express()
app.use(express.json())
const PORT = 3000

mongoose.connect("mongodb+srv://tirthdoshi2184_db_user:zK66QW14zNUQvlvd@realestate.qlvqqhj.mongodb.net/RealEstate").then(() => {
    console.log("Database Connected Successfully");
}).catch((err) => {
    console.log(err);
})

app.listen(PORT, () => {
    console.log("server started");
})


app.use(cors())

const flatRoutes = require('./src/routes/FlatRoutes')
const userRoutes = require('./src/routes/UserRoutes')
const societyRoutes = require('./src/routes/SocietyRoutes')
const shopRoutes = require('./src/routes/ShopRoutes')
const plotRoutes = require('./src/routes/PlotRoutes')
const amenitiesRoutes = require('./src/routes/AmenitiesRoutes')
const bunglowRoutes = require('./src/routes/BunglowRoutes')
const countryRoutes = require('./src/routes/CountryRoutes')
const stateRoutes = require('./src/routes/StateRoutes')
const cityRoutes = require('./src/routes/CItyRoutes')
const areaRoutes = require('./src/routes/AreaRoutes')
const pincodeRoutes = require('./src/routes/PincodeRoutes')
const todoRoutes = require('./src/routes/ToDoRoutes')
const sellerRoutes = require('./src/routes/SellerRoutes')
app.use('/flat',flatRoutes)
app.use('/user',userRoutes)
app.use('/society',societyRoutes);
app.use('/shop',shopRoutes)
app.use('/plot',plotRoutes)
app.use('/amenities',amenitiesRoutes);
app.use('/bunglow',bunglowRoutes)
app.use('/country',countryRoutes)
app.use('/state',stateRoutes)
app.use('/city',cityRoutes)
app.use('/area',areaRoutes)
app.use("/pincode", pincodeRoutes)
app.use("/list",todoRoutes)
app.use('/seller',sellerRoutes)
