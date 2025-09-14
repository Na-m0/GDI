DROP TABLE if EXISTS traitements_demandes, demandes, agents,services,dga,dgs, priorites, types_demandes, fonctions, status,campagnes_budgetaires ;


CREATE TABLE IF NOT EXISTS status(
   id_status SERIAL,
   nom_status VARCHAR(50),
   couleur VARCHAR(50),
   PRIMARY KEY(id_status)
);

CREATE TABLE IF NOT EXISTS fonctions(
   id_fonction SERIAL,
   nom_fonction VARCHAR(50),
   PRIMARY KEY(id_fonction)
);

CREATE TABLE IF NOT EXISTS types_demandes(
   id_type SERIAL,
   nom_type VARCHAR(50),
   PRIMARY KEY(id_type)
);


CREATE TABLE IF NOT EXISTS priorites(
   id_priorite SERIAL,
   nom_priorite VARCHAR(50),
   PRIMARY KEY(id_priorite)
);

CREATE TABLE IF NOT EXISTS dgs(
   id_dgs SERIAL,
   nom_dgs VARCHAR(50),
   login_dgs VARCHAR(50),
   password_dgs VARCHAR(50),
   id_fonction INT NOT NULL,
   PRIMARY KEY(id_dgs),
   FOREIGN KEY(id_fonction) REFERENCES fonctions(id_fonction)
);


CREATE TABLE IF NOT EXISTS dga(
   id_dga SERIAL,
   nom_dga VARCHAR(50),
   login_dga VARCHAR(50),
   password_dga VARCHAR(50),
   id_fonction INT NOT NULL,
   id_dgs INT NOT NULL,
   PRIMARY KEY(id_dga),
   FOREIGN KEY(id_fonction) REFERENCES fonctions(id_fonction),
   FOREIGN KEY(id_dgs) REFERENCES dgs(id_dgs)
);


CREATE TABLE IF NOT EXISTS services(
   id_service SERIAL,
   nom_service VARCHAR(50),
   sigle VARCHAR(50),
   id_dga INT NOT NULL,
   PRIMARY KEY(id_service),
   FOREIGN KEY(id_dga) REFERENCES dga(id_dga)
);

CREATE TABLE IF NOT EXISTS campagnes_budgetaires (
  id_campagne SERIAL,
   nom_campagne VARCHAR(50),
   description VARCHAR(50),
   date_debut DATE,
   date_fin DATE,
   date_creation DATE,
   id_status INT NOT NULL,
   PRIMARY KEY(id_campagne),
   FOREIGN KEY(id_status) REFERENCES status(id_status)
);

CREATE TABLE agents(
   id_agent SERIAL,
   nom_agent VARCHAR(50),
   login_agent VARCHAR(50),
   email_agent VARCHAR(50),
   password_agent VARCHAR(50),
   id_fonction INT NOT NULL,
   id_service INT NOT NULL,
   PRIMARY KEY(id_agent),
   FOREIGN KEY(id_fonction) REFERENCES fonctions(id_fonction),
   FOREIGN KEY(id_service) REFERENCES services(id_service)
);

CREATE TABLE IF NOT EXISTS demandes(
   id_demande SERIAL,
   nom_demande VARCHAR(50),
   objet VARCHAR(50),
   justificatif VARCHAR(50),
   cpu VARCHAR(50),
   budget_estimatif DECIMAL(10,2),
   date_creation DATE,
   date_derniere_modification DATE,
   descision_responsable VARCHAR(50),
   motif_responsable VARCHAR(50),
   transmition_dga INT,
   date_transmission_dga DATE,
   decision_dga VARCHAR(50),
   motif_dga VARCHAR(50),
   date_decision_dga DATE,
   decision_sicig VARCHAR(50),
   motif_sicig VARCHAR(50),
   date_decision_sicig DATE,
   id_service INT NOT NULL,
   id_dga INT NOT NULL,
   id_dgs INT NOT NULL,
   id_priorite INT NOT NULL,
   id_campagne INT NOT NULL,
   id_status INT NOT NULL,
   id_type INT NOT NULL,
   id_agent INT NOT NULL,
   PRIMARY KEY(id_demande),
   FOREIGN KEY(id_service) REFERENCES services(id_service),
   FOREIGN KEY(id_dga) REFERENCES dga(id_dga),
   FOREIGN KEY(id_dgs) REFERENCES dgs(id_dgs),
   FOREIGN KEY(id_priorite) REFERENCES priorites(id_priorite),
   FOREIGN KEY(id_campagne) REFERENCES campagnes_budgetaires(id_campagne),
   FOREIGN KEY(id_status) REFERENCES status(id_status),
   FOREIGN KEY(id_type) REFERENCES types_demandes(id_type),
   FOREIGN KEY(id_agent) REFERENCES agents(id_agent)
);

CREATE TABLE IF NOT EXISTS traitements_demandes(
   id_traitement SERIAL,
   avis_sicig VARCHAR(50),
   date_avis DATE,
   id_demande INT NOT NULL,
   PRIMARY KEY(id_traitement),
   FOREIGN KEY(id_demande) REFERENCES demandes(id_demande)
);

-- Inserts pour la table status
INSERT INTO status (nom_status, couleur) VALUES 
('Actif', 'bleu'),
('Inactif', 'rouge');

-- Inserts pour la table fonctions
INSERT INTO fonctions (nom_fonction) VALUES 
('Manager'),
('Agent de terrain');

-- Inserts pour la table types_demandes
INSERT INTO types_demandes (nom_type) VALUES 
('Demande de matériel'),
('Demande de formation');

-- Inserts pour la table priorites
INSERT INTO priorites (nom_priorite) VALUES 
('Haute priorité'),
('Basse priorité');

-- Inserts pour la table dgs
INSERT INTO dgs (nom_dgs, login_dgs, password_dgs, id_fonction) VALUES 
('Jean Dupont', 'jdupont', 'pass123', 1),
('Marie Leclerc', 'mleclerc', 'secret456', 1);


-- Inserts pour la table dga
INSERT INTO dga (nom_dga, login_dga, password_dga, id_fonction, id_dgs) VALUES 
('Pierre Durand', 'pdurand', 'secure789', 2, 1),
('Sophie Martin', 'smartin', 'mdp123', 2, 2),
('Philippe Martin', 'pmartin', 'philippe789', 2, 1),
('Julie Lefevre', 'jlefevre', 'julie123', 2, 2);


-- Inserts pour la table services
INSERT INTO services (nom_service, sigle, id_dga) VALUES 
('Service des Opérations', 'SOP', 1),
('Service des Ressources Humaines', 'SRH', 2),
('Service des Finances', 'SDF', 3),
('Service des Technologies', 'SDT', 4),
('Service de Communication', 'SDC', 3),
('Service de Logistique', 'SDL', 3),
('Service de Marketing', 'SDM', 4);

-- Inserts pour la table campagnes_budgetaires
INSERT INTO campagnes_budgetaires (nom_campagne, description, date_debut, date_fin, date_creation, id_status) VALUES 
('Campagne 2024', 'Budget annuel', '2024-01-01', '2024-12-31', '2024-01-01', 1),
('Campagne 2025', 'Budget annuel', '2025-01-01', '2025-12-31', '2025-01-01', 1);

-- Inserts pour la table agents
INSERT INTO agents (nom_agent, login_agent, email_agent, password_agent, id_fonction, id_service) VALUES 
('Alexandre Dubois', 'adubois', 'alex.dubois@example.com', 'pwd123', 2, 1),
('Caroline Leroy', 'cleroy', 'caroline.leroy@example.com', 'mdp456', 2, 2),
('Maxime Lefebvre', 'mlefebvre', 'maxime.lefebvre@example.com', '123max', 2, 3),
('Claire Dubois', 'cdubois', 'claire.dubois@example.com', 'abc456', 2, 4),
('Julien Martin', 'jmartin', 'julien.martin@example.com', 'pass123', 2, 5),
('Sophie Dubois', 'sdubois', 'sophie.dubois@example.com', 'secure789', 2, 2),
('Antoine Leroy', 'aleroy', 'antoine.leroy@example.com', 'mdp123', 2, 1);

-- Inserts pour la table demandes
INSERT INTO demandes (nom_demande, objet, justificatif, cpu, budget_estimatif, date_creation, date_derniere_modification, descision_responsable, motif_responsable, transmition_dga, date_transmission_dga, decision_dga, motif_dga, date_decision_dga, decision_sicig, motif_sicig, date_decision_sicig, id_service, id_dga, id_dgs, id_priorite, id_campagne, id_status, id_type, id_agent) VALUES 
('Demande de matériel informatique', 'Achat de nouveaux ordinateurs', 'Devis de fournisseur', 'HP ProBook', 1500.00, '2024-04-29', '2024-04-29', 'Approuvée', 'Besoin urgent pour équiper les nouveaux employés', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 1, 1, 1, 1, 1, 1, 1),
('Demande de formation', 'Formation sur la gestion de projet', 'Programme de la formation', NULL, 3000.00, '2024-04-29', '2024-04-29', 'En attente', 'Besoin identifié lors des évaluations annuelles', 1, '2024-04-30', 'Approuvée', 'Disponibilité des salles de formation', '2024-05-02', NULL, NULL, NULL, 2, 2, 1, 2, 1, 1, 2, 2);

-- Inserts pour la table traitements_demandes
INSERT INTO traitements_demandes (avis_sicig, date_avis, id_demande) VALUES 
('Demande approuvée', '2024-04-30', 1),
('Formation confirmée', '2024-05-03', 2);

SELECT dga.nom_dga AS nom_dga, services.nom_service
FROM services
INNER JOIN dga ON services.id_dga = dga.id_dga
ORDER BY dga.id_dga DESC;

SELECT dga.nom_dga AS nom_dga, agents.nom_agent
FROM agents
INNER JOIN services ON agents.id_service = services.id_service
INNER JOIN dga ON services.id_dga = dga.id_dga
ORDER BY dga.id_dga DESC;
