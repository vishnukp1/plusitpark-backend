const express = require("express");
const router = express.Router();
const tryCatch = require("../middleware/tryCatch");
const districtController = require("../controller/districtController");

router
  .post("/district", tryCatch(districtController.createDistrict))

  .put("/district/:id", tryCatch(districtController.updateDistrict))

  .delete("/district/:id", tryCatch(districtController.deleteDistrict))

  .get("/district", tryCatch(districtController.getDistricts))

  .post("/constituency", tryCatch(districtController.createconstituency))

  .get("/constituency", tryCatch(districtController.getconstituencys))

  .post("/assembly", tryCatch(districtController.createassembly))

  .get("/assembly", tryCatch(districtController.getassemblys))

  .post("/:disId/addconstituency/:constId", tryCatch(districtController.addConstituenciestoDistrict))

  .post("/:constId/addassembly/:asId", tryCatch(districtController.addAssemblytoConstituency))

  
  .get("/districtV4", tryCatch(districtController.getConstituencybyDistrict))
  .get("/districtV5", tryCatch(districtController.getassemblybyDistrict))

module.exports = router;
