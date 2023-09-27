exports.create_user = (req, res) => {
    res.status(201).json({id: 1, ...req.body});
}

exports.get_all_users = (req, res) => {
    res.status(200).json([]);    
}

exports.get_user = (req, res) => {
    res.status(200).json({id: req.params.id});
}

exports.put_user = (req, res) => {
    res.status(200).json({id: req.params.id, ...req.body});
}

exports.delete_user = (req, res) => {
    res.sendStatus(204);
}