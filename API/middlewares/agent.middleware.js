const validator = require("validator");

exports.validateUserInput = (req, res, next) => {
    const { nom_agent, password_agent } = req.body;
    if (!nom_agent) {
        return res.status(400).send("Le nom ou le prénom est manquant !");
    }
    if (!validator.isLength(nom_agent, { min: 3 }) || 
        !validator.isAlpha(nom_agent, 'fr-FR', { ignore: ' ' })) {
        return res.status(400).send("Format incorrect pour le nom !");
    }
    if (!validator.isLength(password_agent, { min: 6 })) {
        return res.status(400).json({ error: "Le mot de passe doit comporter au moins 6 caractères !" });
    }
    next();
};

exports.validateLogin = (req, res, next) => {
    const { login_agent, password_agent } = req.body;
    if (!login_agent || !password_agent) {
        return res.status(400).json({ error: "Le login ou le mot de passe est manquant !" });
    }
    if (!validator.isLength(login_agent, { min: 3 }) || !validator.isAlphanumeric(login_agent)) {
        return res.status(400).json({ error: "Format incorrect pour le login !" });
    }
    next();
};
