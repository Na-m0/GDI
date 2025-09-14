const express = require("express");
const dotenv = require("dotenv");
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
require('dotenv').config();
const multer = require('multer');
const path = require("path");
const fs = require('fs');
const { deleteFileLine } = require('./services/file.service');
const { deleteFile } = require('./services/file.service'); 
const { deleteFilesDemande } = require('./services/file.service'); 


dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

app.get('/uploads/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, 'uploads', filename);
    res.download(filePath, filename, (err) => {
        if (err) {
            console.log('Erreur lors du téléchargement du fichier:', err);
            res.status(500).send('Erreur lors du téléchargement du fichier');
        }
    });
});

const corsOptions = {
    origin: 'http://localhost:8080',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
};
app.use(cors(corsOptions));


    // Configuration de Multer pour la création des dossiers des demandes
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const idDemande = req.body.id_demande;
        const demandeDir = path.join(uploadsDir, idDemande.toString());

        if (!fs.existsSync(demandeDir)) {
            fs.mkdirSync(demandeDir, { recursive: true });
        }

        cb(null, demandeDir);
    },
    // Configuration de Multer pour inclure l'extension d'origine
    filename: (req, file, cb) => {
        const originalName = Buffer.from(file.originalname, 'latin1').toString('utf8');
        const extension = path.extname(originalName);
        const basename = path.basename(originalName, extension);
        cb(null, `${basename}${extension}`);
    }
});

// file upload
const fileFilter = function(req, file, cb) {
    const allowedTypes = [
        "image/jpeg", 
        "image/png", 
        "application/pdf", 
        "application/msword", 
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/vnd.ms-excel", 
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "text/html",
        "text/plain",
        "application/zip",
    ];
    
    if(!allowedTypes.includes(file.mimetype)) {
        const error = new Error("Fichier non autorisé");
        error.code = "LIMIT_FILE_TYPES";
        return cb(error, false);
    }
    cb(null, true);
}
// const MAX_SIZE = 200000
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    // limits: {
    //     fileSize: MAX_SIZE
    // }
})

app.post('/upload', upload.array('files'), (req, res) => {
    const idDemande = req.body.id_demande;
    if (!idDemande) {
      return res.status(400).send({ error: 'id_demande is required' });
    }
  
    const uploadedFiles = req.files.map(file => ({
      originalName: Buffer.from(file.originalname, 'latin1').toString('utf8'),
      fileName: file.filename,
      filePath: `/uploads/${idDemande}/${file.filename}`
    }));
  
    res.json({ files: uploadedFiles });
  });

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// DELETE
app.delete('/files/:id_file', async (req, res) => {
    try {
        const id_file = req.params.id_file;
        await deleteFileLine(id_file);
        res.status(200).send({ message: 'Fichier supprimé avec succès' });
    } catch (error) {
        console.error("Error during file deletion:", error);
        res.status(500).send({ message: 'Erreur lors de la suppression du fichier' });
    }
});

app.delete('/files/uploads/:id_file', async (req, res) => {
    try {
        const id_file = req.params.id_file;
        await deleteFile(id_file);
        res.status(200).send({ message: 'Fichier supprimé avec succès' });
    } catch (error) {
        console.error("Error during file deletion:", error);
        res.status(500).send({ message: 'Erreur lors de la suppression du fichier' });
    }
});

app.delete('/files/demande/:id_demande', async (req, res) => {
    try {
        const id_demande = req.params.id_demande;
        await deleteFilesDemande(id_demande);
        res.status(200).send({ message: 'Fichier supprimé avec succès' });
    } catch (error) {
        console.error("Error during file deletion:", error);
        res.status(500).send({ message: 'Erreur lors de la suppression du fichier' });
    }
});

app.use(function(err, req, res, next) {
    if (err.code === "LIMIT_FILE_TYPES") {
        res.status(422).json({ error: "Fichier non autorisé"});
        return;
    }
    // if (err.code === "LIMIT_FILE_SIZE") {
    //     res.status(422).json({ error: `Trop long ${MAX_SIZE / 1000}Kb` });
    //     return;
    // }
})

const statusRouter = require('./routes/status.router');
const fonctionRouter = require('./routes/fonction.router');
const typeDemandeRouter = require('./routes/type_demande.router');
const prioriteRouter = require('./routes/priorite.router');
const serviceRouter = require('./routes/service.router');
const campagneRouter = require('./routes/campagne.router');
const agentRouter = require('./routes/agent.router');
const demandeRouter = require('./routes/demande.router');
// const traitementRouter = require('./routes/traitement.router');
const liaisonRouter = require('./routes/liaison.router');
const fileRouter = require('./routes/file.router');

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'GDI projet Stage',
            description: 'API documentation',
            contact: {
                name: 'noam',
            },
            servers: ['http://localhost:8080/'],
        },
    },
    apis: [],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/status', statusRouter);
app.use('/fonctions', fonctionRouter);
app.use('/types', typeDemandeRouter);
app.use('/priorites', prioriteRouter);
app.use('/services', serviceRouter);
app.use('/campagnes', campagneRouter);
app.use('/agents', agentRouter);
app.use('/demandes', demandeRouter);
// app.use('/traitements', traitementRouter);
app.use('/liaisons', liaisonRouter);
app.use('/files', fileRouter);

app.listen(3030, () => {
    console.log('le serveur écoute sur le port 3030')
});
