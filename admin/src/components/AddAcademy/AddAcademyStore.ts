import { makeAutoObservable } from "mobx"
import { AcademyStore } from "../Academy/AcademyStore";
import { NavigateFunction } from "react-router-dom";
import { createAcademy } from "../../api/apiEndpoints";

import { v4 as uuidv4 } from "uuid";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { AddAcademyInterface } from "./AddAcademy";

export class AddAcademyStore {
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
        const s3Key = `assets/media/images/academy/${folderName}/${uniqueFileName}`;
    
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

    async addAcademy(values: AddAcademyInterface, academyStore: AcademyStore, navigate: NavigateFunction) {
        // usersStore.addUser({...values, roles: values.roles.split(",").map((role: string) => role.trim())});

        if (values?.imageUrl?.[0]) {
            const file = values.imageUrl[0];
            const folderName = values.title.replace(/\s+/g, ''); // Removes all spaces
            // const folderNameForImage = values.imgType.replace(/\s+/g, '');
            const folderNameForImage = 'Default';
            this.uploadingImg = true;
    
            try {
              const url = await this.uploadFileToS3(file, folderName, folderNameForImage);
              this.uploadingImg = false;
              alert("File uploaded successfully!");

              if(url) {
                // Prepare roles as an array
                const formattedValues = {
                    title: values.title,
                    description: values.description,
                    imageUrl:url
                };

                await createAcademy(formattedValues);

                await academyStore.fetchAcademies();
                navigate("/academy");
              }
            } catch (error) {
              this.uploadingImg = false;
              console.error("Error uploading file:", error);
              alert("Error uploading file. Please try again.");
            }
          } else {
            alert("Please upload a file.");
        }
    }
}