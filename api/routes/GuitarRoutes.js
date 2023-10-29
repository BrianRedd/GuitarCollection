const { Router } = require("express");
const router = Router();
const { getGuitars, saveGuitar, updateGuitar, deleteGuitar } = require("../controllers/GuitarControllers");

router.get("/get", getGuitars);
router.post("/save", saveGuitar);
router.put("/update/:id", updateGuitar);
router.delete("/delete/:id", deleteGuitar);

module.exports = router;
