require("express-async-errors");

const AppError = require("./utils/AppError");
const express = require("express");

const app = express();
const routes = require("./routes");

app.use(express.json())

app.use(routes);

//config to response errors
app.use(( error, request, response, next ) => {
   //client error
   if (error instanceof AppError){
       return response.status(error.statusCode).json({
          status: "error",
          message: error.message
       });
   }

   //server error
   return response.status(500).json({
      status: "error",
      message: "Inernal servel error"
   });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
