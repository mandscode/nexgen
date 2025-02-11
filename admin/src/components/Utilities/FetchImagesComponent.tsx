import { S3Client, ListObjectsV2Command, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";


const prefix = "assets/media/images/projects/";

const region = process.env.REACT_APP_AWS_REGION as string;
const bucketName = process.env.REACT_APP_S3_BUCKET_NAME as string;
const accessKeyId = process.env.REACT_APP_AWS_ACCESS_KEY_ID as string;
const secretAccessKey = process.env.REACT_APP_AWS_SECRET_ACCESS_KEY as string;     

// Initialize S3 client
const s3Client = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

const fetchAwsImages = async () => {
  const params = {
    Bucket: bucketName,
    Prefix: prefix,
  };

  try {
    // List objects in the bucket
    const data = await s3Client.send(new ListObjectsV2Command(params));

    // Generate signed URLs for each object
    const imageUrls = await Promise.all(
      (data.Contents || []).map(async (file) => {
        const command = new GetObjectCommand({
          Bucket: bucketName,
          Key: file.Key,
        });

        // Generate a signed URL
        const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 60 });
        return signedUrl;
      })
    );

    return imageUrls; // Return image URLs
  } catch (error) {
    console.error("Error fetching AWS images:", error);
    throw error;
  }
};

export default fetchAwsImages;
