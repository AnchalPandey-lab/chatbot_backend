import express from 'express';
import multer from 'multer';
import { S3Client } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const upload = multer();

// Initialize the S3 client
const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

const uploadFile = async (file) => {
    const uploadParams = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: file.originalname,
        Body: file.buffer,
    };

    try {
        const parallelUploads3 = new Upload({
            client: s3Client,
            params: uploadParams,
        });

        parallelUploads3.on("httpUploadProgress", (progress) => {
            console.log(progress);
        });

        const data = await parallelUploads3.done();
        console.log(`File uploaded successfully. ${data.Location}`);
    } catch (err) {
        console.error(`Error uploading file. ${err.message}`);
    }
};

router.post('/upload/csv', upload.single('file'), async (req, res) => {
    try {
        await uploadFile(req.file);
        res.status(200).send('File uploaded successfully');
    } catch (err) {
        res.status(500).send(`Error uploading file: ${err.message}`);
    }
});

export default router;