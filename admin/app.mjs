import express from 'express';
import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import AdminJSSequelize from '@adminjs/sequelize';
import sequelize from './models/index.mjs';

// Importation des modèles
import Status from './models/status.model.mjs';
import Fonction from './models/fonction.model.mjs';
import TypeDemande from './models/type_demande.model.mjs';
import Priorite from './models/priorite.model.mjs';
import Service from './models/service.model.mjs';
import CampagneBudgetaire from './models/campagne_budgetaire.model.mjs';
import Agent from './models/agent.model.mjs';
import DgsDga from './models/dgs_dga.model.mjs';
import Possede from './models/possede.model.mjs';
import Demande from './models/demande.model.mjs';
import FileUpload from './models/file_upload.model.mjs';

AdminJS.registerAdapter(AdminJSSequelize);

const adminJs = new AdminJS({
  databases: [sequelize],
  resources: [
    { resource: Status },
    { resource: Fonction },
    { resource: TypeDemande },
    { resource: Priorite },
    { resource: Service },
    { resource: CampagneBudgetaire },
    { resource: Agent },
    { resource: DgsDga },
    { resource: Possede },
    { resource: Demande },
    { resource: FileUpload },
  ],
  rootPath: '/admin',
});

const router = AdminJSExpress.buildRouter(adminJs);

const app = express();
app.use(adminJs.options.rootPath, router);

app.listen(3000, () => {
  console.log('AdminJS fonctionne à http://localhost:3000/admin');
});
