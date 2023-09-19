const router = require('express').Router();

//Create from posted json
router.post("/", (req, res) => {
    res.status(201).json({id: 1, ...req.body});
});

//Get all
router.get("/", (req, res) => {
    res.status(200).json([]);
});


//Get by ID
router.get("/:id", (req, res) => {
    res.status(200).json({id: req.params.id});
});

//Update by ID
router.put("/:id", (req, res) => {
    res.status(200).json({id: req.params.id, ...req.body});
});

//Delete by ID
router.delete("/:id", (req, res) => {
    res.sendStatus(204);
});

module.exports = router;
