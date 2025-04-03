import { makeAutoObservable } from "mobx";
import { NavigateFunction } from "react-router-dom";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { v4 as uuidv4 } from "uuid";
import { createResource, getProject, updateProjectImages } from "../../api/apiEndpoints"; // Assuming this is defined elsewhere
import { UpdateProjectForm } from "./UpdateProject";


export class UpdateProjectStore {
  uploadingImg: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  async uploadFileToS3(file: File, folderName: string, folderNameForImage?: string): Promise<string> {
    const region = import.meta.env.VITE_REACT_APP_AWS_REGION as string;
    const bucketName = import.meta.env.VITE_REACT_APP_S3_BUCKET_NAME as string;
    const accessKeyId = import.meta.env.VITE_REACT_APP_AWS_ACCESS_KEY_ID as string;
    const secretAccessKey = import.meta.env.VITE_REACT_APP_AWS_SECRET_ACCESS_KEY as string;     

    const s3 = new S3Client({
      region,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });

    const uniqueFileName = `${uuidv4()}-${file.name}`;
    const s3Key = folderNameForImage
      ? `assets/media/images/projects/${folderName}/${folderNameForImage}/${uniqueFileName}`
      : `assets/media/images/products/${folderName}/${uniqueFileName}`;

    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: s3Key,
      ContentType: file.type,
    });

    const signedUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

    await fetch(signedUrl, {
      method: "PUT",
      body: file,
      headers: {
        "Content-Type": file.type,
      },
    });

    return `https://${bucketName}.s3.${region}.amazonaws.com/${s3Key}`;
  }

  async updateDetails(data: UpdateProjectForm, navigate: NavigateFunction, id: number) {
    try {
      const project = await getProject(id);
      if (data?.file?.[0]) {
        const file = data.file[0];
        const folderName = project.name.replace(/\s+/g, ''); // Removes all spaces
        const folderNameForImage = data.imgType.replace(/\s+/g, '');
        this.uploadingImg = true;
        
        try {
          const url = await this.uploadFileToS3(file, folderName, folderNameForImage);
          if(url) {
            const data = {
              file:url
            }
            const response = updateProjectImages(id, data)
            
            this.uploadingImg = false;
            alert("File uploaded successfully!");          
          } else {
            alert('something went wrong')
          }
        } catch (error) {
          this.uploadingImg = false;
          console.error("Error uploading file:", error);
          alert("Error uploading file. Please try again.");
        }
      } else {
        alert("Please upload a file.");
      }
    } catch (error) {
      console.error("Failed to fetch project:", error);
    }
  }
}
