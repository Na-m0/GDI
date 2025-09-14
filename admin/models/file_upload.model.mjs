// models/file_upload.model.mjs
import { DataTypes } from 'sequelize';
import sequelize from './index.mjs';
import Demande from './demande.model.mjs'; // Assurez-vous d'importer le modèle de la table liées

const FileUpload = sequelize.define('FileUpload', {
    id_file: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nom_file: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    upload_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    nom_file_2: {
        type: DataTypes.STRING,
    },
    filePath: {
        type: DataTypes.STRING,
    },
    id_demande: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Demande,
            key: 'id_demande',
        }
    }
}, {
    tableName: 'file_upload',
    timestamps: false,
});

FileUpload.belongsTo(Demande, { foreignKey: 'id_demande' });

export default FileUpload;
