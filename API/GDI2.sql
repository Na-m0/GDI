DROP TABLE if EXISTS motif,avis,journal_modifications_demandes, file_upload, demandes, possede,dgsdga,agents,services, priorites, types_demandes, fonctions, status,campagnes_budgetaires ;


CREATE TABLE IF NOT EXISTS status(
   id_status SERIAL,
   nom_status VARCHAR(50),
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


CREATE TABLE IF NOT EXISTS services(
   id_service SERIAL,
   nom_service VARCHAR(50),
   sigle VARCHAR(50),
   PRIMARY KEY(id_service)
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
   id_service INT,
   PRIMARY KEY(id_agent),
   FOREIGN KEY(id_service) REFERENCES services(id_service)
);
ALTER TABLE services
ADD COLUMN id_dga INT,
ADD FOREIGN KEY (id_dga) REFERENCES agents(id_agent);

CREATE TABLE dgsdga (
    id_dgs INT,
    id_dga INT,
    PRIMARY KEY (id_dgs, id_dga),
    FOREIGN KEY (id_dgs) REFERENCES agents(id_agent),
    FOREIGN KEY (id_dga) REFERENCES agents(id_agent)
);

CREATE TABLE possede(
   id_fonction INT,
   id_agent INT,
   PRIMARY KEY(id_fonction, id_agent),
   FOREIGN KEY(id_fonction) REFERENCES fonctions(id_fonction),
   FOREIGN KEY(id_agent) REFERENCES agents(id_agent)
);

CREATE TABLE IF NOT EXISTS demandes(
   id_demande SERIAL,
   objet VARCHAR(50),
   justificatif VARCHAR(255),
   cpu VARCHAR(50),
   budget_estimatif DECIMAL(10,2),
   date_creation DATE,
   transmition BOOLEAN DEFAULT FALSE,
   date_transmission DATE,
   date_limite_validation DATE,
   id_service INT NOT NULL,
   id_priorite INT NOT NULL,
   id_campagne INT NOT NULL,
   id_status INT NOT NULL,
   id_type INT NOT NULL,
   id_agent INT NOT NULL,
   avis_responsable VARCHAR(255),
   avis_dga VARCHAR (255),
   avis_dgs VARCHAR (255),
   avis_sicig VARCHAR(255),
   motif_responsable VARCHAR(255),
   motif_dga VARCHAR(255),
   motif_dgs VARCHAR(255),
   motif_sicig VARCHAR(255),
   PRIMARY KEY(id_demande),
   FOREIGN KEY(id_service) REFERENCES services(id_service),
   FOREIGN KEY(id_priorite) REFERENCES priorites(id_priorite),
   FOREIGN KEY(id_campagne) REFERENCES campagnes_budgetaires(id_campagne),
   FOREIGN KEY(id_status) REFERENCES status(id_status),
   FOREIGN KEY(id_type) REFERENCES types_demandes(id_type),
   FOREIGN KEY(id_agent) REFERENCES agents(id_agent)
);

CREATE TABLE IF NOT EXISTS file_upload(
   id_file SERIAL,
   nom_file VARCHAR(255),
   upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   nom_file_2 VARCHAR(255),
   filePath VARCHAR(255),
   id_demande INT NOT NULL,
   PRIMARY KEY(id_file),
   FOREIGN KEY(id_demande) REFERENCES demandes(id_demande)
);

CREATE TABLE journal_modifications_demandes (
   id_modification SERIAL,
   id_demande INT,
   ancien_montant DECIMAL(10,2),
   nouveau_montant DECIMAL(10,2),
   date_modification DATE,
   id_agent INT,
   PRIMARY KEY(id_modification),
   FOREIGN KEY(id_demande) REFERENCES demandes(id_demande),
   FOREIGN KEY(id_agent) REFERENCES agents(id_agent)
);

CREATE TABLE IF NOT EXISTS avis(
   id_avis SERIAL,
   avis VARCHAR(255),
   date_avis DATE,
   id_demande INT,
   id_agent INT,
   PRIMARY KEY(id_avis),
   FOREIGN KEY(id_demande) REFERENCES demandes(id_demande),
   FOREIGN KEY(id_agent) REFERENCES agents(id_agent)

);

CREATE TABLE IF NOT EXISTS motif(
   id_motif SERIAL,
   motif VARCHAR(255),
   date_motif DATE,
   id_demande INT,
   id_agent INT,
   PRIMARY KEY(id_motif),
   FOREIGN KEY(id_demande) REFERENCES demandes(id_demande),
   FOREIGN KEY(id_agent) REFERENCES agents(id_agent)
);

-- Inserts pour la table status
INSERT INTO status (id_status,nom_status) VALUES 
(1,'En attente'),
(2,'Validé service'),
(3,'Refusé service'),
(4,'Validé DGA'),
(5,'Refusé DGA'),
(6,'Validé DGS'),
(7,'Refusé DGS'),
(8,'Validé SICIG'),
(9,'Refusé SICIG'),
(10, 'En cours'),
(11, 'Terminé');


-- Inserts pour la table fonctions
INSERT INTO fonctions (id_fonction, nom_fonction) VALUES 
(1,'Saisie'),
(2,'Responsable service'),
(3,'DGA'),
(4,'DGS'),
(5,'SICIG');

-- Inserts pour la table types_demandes
INSERT INTO types_demandes (nom_type) VALUES 
('Matériel'),
('Logiciel'),
('Matériel et logiciel');

-- Inserts pour la table priorites
INSERT INTO priorites (nom_priorite) VALUES 
('Haute priorité'),
('Basse priorité');

INSERT INTO agents (id_agent,nom_agent, login_agent, email_agent, password_agent) VALUES 
(6,'Julien Martin', 'nene', 'julien.martin@example.com', 'nene'),
(7,'Sophie Dubois', 'agent3', 'sophie.dubois@example.com', 'agent3'),
(8,'Antoine Leroy', 'agent4', 'antoine.leroy@example.com', 'agent4'),
(9,'JOLY-GIRODS Noam', 'agent5', 'njoly@gmail.com', 'agent5');

-- Inserts pour la table services
INSERT INTO services (nom_service, sigle,id_dga) VALUES 
('Service des Opérations', 'SOP',7),
('Service des Ressources Humaines', 'SRH',7),
('Service des Finances', 'SDF',6),
('Service des Technologies', 'SDT',7),
('Service de Communication', 'SDC',6),
('Service de Logistique', 'SDL',6),
('Service de Marketing', 'SDM' ,6),
('Service SICIG', 'SICIG', 9);

-- Inserts pour la table campagnes_budgetaires
INSERT INTO campagnes_budgetaires (nom_campagne, description, date_debut, date_fin, date_creation, id_status) VALUES 
('Campagne 2023', 'Budget annuel', '2023-01-01', '2023-12-31', '2023-01-01', 1),
('Campagne 2024', 'Budget annuel', '2024-01-01', '2024-12-31', '2024-01-01', 1),
('Campagne 2025', 'Budget annuel', '2025-01-01', '2025-12-31', '2025-01-01', 2);

-- Inserts pour la table agents
INSERT INTO agents (id_agent,nom_agent, login_agent, email_agent, password_agent, id_service) VALUES 
(1,'Pierre', 'nono', 'pierre.dubois@example.com', 'nono',  2),
(2,'Caroline Leroy', 'agent1', 'caroline.leroy@example.com', 'agent1', 4),
(3,'SDF', 'mlefebvre', 'maxime.lefebvre@example.com', '123max', 2),
(4,'Responsable SDF', 'nini', 'maxime.lefebvre@example.com', 'nini', 1),
(5,'Claire Dubois', 'agent2', 'claire.dubois@example.com', 'agent2',  4);

INSERT INTO possede (id_fonction, id_agent) VALUES 
(1,1),
(1,2), 
(1,3),
(2,4),
(2,5), 
(3,6),
(3,7),
(4,8),
(5,9);

-- Inserts pour la table liaison dgs dga
INSERT INTO dgsdga (id_dgs, id_dga)
VALUES 
(8,6),
(8,7),
(9,6),
(9,7);

-- Insertion d'une demande avec transmition_dga à FALSE
INSERT INTO demandes (objet, justificatif, cpu, budget_estimatif, date_creation, id_service, id_priorite, id_campagne, id_status, id_type, id_agent)
VALUES
   ('Achat de nouveaux serveurs', 'Justificatif pour achat de nouveaux serveurs', 'Jean Dupont', 1500.00, '2024-04-30', 4, 2, 2, 1, 1, 1),
   ('Mise à jour des licences logiciels', 'Renouvellement des licences pour 2024', 'Marie Curie', 2000.00, '2024-05-01', 4, 2, 2, 1, 2, 2),
   ('Renforcement de la sécurité réseau', 'Installation de nouveaux pare-feu', 'Paul Martin', 1800.00, '2024-05-02', 3, 2, 2, 1, 3, 3),
   ('Amélioration des postes de travail', 'Achat de nouveaux ordinateurs', 'Claire Dubois', 2200.00, '2024-05-03', 4, 1, 2, 1, 1, 4),
   ('Maintenance des serveurs', 'Contrat de maintenance pour les serveurs existants', 'Jean Dupont', 1900.00, '2024-05-04', 2, 2, 2, 1, 2, 1),
   ('Déploiement d’un nouveau CRM', 'Achat et déploiement du logiciel CRM', 'Marie Curie', 2100.00, '2024-05-05', 4, 2, 2, 1, 3, 2),
   ('Optimisation de la base de données', 'Migration vers une base de données plus performante', 'Jean Dupont', 2500.00, '2024-05-06', 2, 1, 2, 1, 1, 1),
   ('Achat de nouveaux routeurs', 'Remplacement des routeurs obsolètes', 'Paul Martin', 1700.00, '2024-05-07', 4, 2, 1, 1, 2, 2),
   ('Formation des employés', 'Sessions de formation sur les nouvelles technologies', 'Claire Dubois', 1500.00, '2024-04-30', 2, 2, 1, 1, 1, 1),
   ('Extension du stockage cloud', 'Achat de nouveaux espaces de stockage cloud', 'Jean Dupont', 1200.00, '2024-04-30', 2, 2, 1, 1, 3, 1),
   ('Développement d’une application mobile', 'Création d’une application pour les clients', 'Marie Curie', 1580.00, '2024-04-30', 2, 2, 1, 1, 1, 1),
   ('Projet de transformation numérique', 'Budget pour la transformation numérique', 'Jean Dupont', 11100.00, '2024-04-30', 2, 2, 1, 1, 1, 1),
   ('Acquisition de logiciels de gestion', 'Achat de nouveaux logiciels pour la gestion interne', 'Paul Martin', 3000.00, '2024-04-30', 2, 2, 1, 1, 3, 1),
   ('Refonte du site web', 'Lorem ipsum dolor sit amet. Vestibulum facilisis tempor dui a lobortis. Ut viverra sagittis sapien. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla posuere lacus ut tortor venenatis bibendum. Aliquam erat volutpat.', 'Jean Dupont', 8200.00, '2024-04-30', 2, 2, 1, 1, 1, 1),
   ('Mise à jour de l’infrastructure', 'Justificatif pour la mise à jour de l’infrastructure', 'Paul Martin', 3000.00, '2024-04-30', 8, 2, 1, 1, 3, 9);