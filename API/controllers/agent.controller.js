const agentService = require("../services/agent.service");


exports.createAgent = async (req, res) => {
    const { nom_agent, login_agent, email_agent, password_agent, id_service } = req.body;
    try {
        const id_agent = await agentService.createAgent(nom_agent, login_agent, email_agent, password_agent, id_service);
        res.status(201).json({ id_agent: id_agent, message: 'Agent créée avec succès' });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la création de la agent' });
    }
};


exports.loginAgent = async (req, res) => {
    const { login_agent, password_agent } = req.body;
    try {
        const result = await agentService.loginAgent(login_agent, password_agent);
        if (result.error) {
            res.status(401).json({ message: result.error });
        } else {
            res.status(200).json(result);
        }
    } catch (error) {
        console.error("Error during login", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.getAllAgents = async (req, res) => {
    try {
        const agents = await agentService.getAllAgents();
        res.status(200).json(agents);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des agents' });
    }
};

exports.getAgentById = async (req, res) => {
    const id_agent = req.params.id;
    try {
        const agent = await agentService.getAgentById(id_agent);
        if (!agent) {
            res.status(404).json({ message: 'Agent non trouvée' });
        } else {
            res.status(200).json(agent);
        }
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération de la agent' });
    }
};

exports.getServicesByDga = async (req, res) => {
    const id_dga = req.params.id_dga;
    try {
        const agent = await agentService.getServicesByDga(id_dga);
        if (!agent) {
            res.status(404).json({ message: 'Agent non trouvée' });
        } else {
            res.status(200).json(agent);
        }
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération de la agent' });
    }
};

exports.getServicesByDgs = async (req, res) => {
    const id_dgs = req.params.id_dgs;
    try {
        const agent = await agentService.getServicesByDgs(id_dgs);
        if (!agent) {
            res.status(404).json({ message: 'Agent non trouvée' });
        } else {
            res.status(200).json(agent);
        }
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération de la agent' });
    }
};


exports.getServiceDga = async (req, res) => {
    const id_dga = req.params.id_dga;
    const id_service = req.params.id_service;
    try {
        const agent = await agentService.getServiceDga(id_dga, id_service);
        if (!agent) {
            res.status(404).json({ message: 'Agent non trouvée' });
        } else {
            res.status(200).json(agent);
        }
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération de la agent' });
    }
};

exports.updateAgent = async (req, res) => {
    const id_agent = req.params.id;
    const { nom_agent, login_agent, email_agent, password_agent, id_service } = req.body;
    try {
        const updatedAgent = await agentService.updateAgent(id_agent, nom_agent, login_agent, email_agent, password_agent, id_service);
        if (!updatedAgent) {
            res.status(404).json({ message: 'Agent non trouvée' });
        } else {
            res.status(200).json(updatedAgent);
        }
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la mise à jour de la agent' });
    }
};

exports.deleteAgent = async (req, res) => {
    const id_agent = req.params.id;
    try {
        await agentService.deleteAgent(id_agent);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la suppression de la agent' });
    }
};
