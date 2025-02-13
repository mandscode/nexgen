import { makeAutoObservable } from "mobx"
import { AddInvestorDocumentsForm } from "./AddInvestorDocumentDetails";
import { InvestorDocumentsForm } from "../UserDetail/UserDetail";
import { NavigateFunction } from "react-router-dom";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { uploadInvestorDocs } from "../../api/apiEndpoints";

export class AddInvestorDocumentDetailsStore {
    static addInvestorDocsDetails: any;
    uploadingImg: boolean = false;
    
    constructor() {
        makeAutoObservable(this);
    }

    async uploadFileToS3(file: File, folderName: number): Promise<string> {
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
    
        const uniqueFileName = `${file.name}`;

        const fileCategory = file.type.startsWith('image/')
        ? 'images'
        : file.type === 'application/pdf'
        ? 'pdfs'
        : 'others';  // For all other file types (e.g., .txt, .docx, .xlsx)
        
        const s3Key = `assets/media/${fileCategory}/investorDocs/${folderName}/${uniqueFileName}`
    
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

    async addInvestorDocsDetails(data: AddInvestorDocumentsForm, docsDetailStore: InvestorDocumentsForm, navigate: NavigateFunction, id:number, setDocDetailList:any) {
        try {
            if (data?.docUrl[0]) {
              const file = data.docUrl[0];
              const folderName = id; // Removes all spaces
              this.uploadingImg = true;
      
                try {
                    const url = await this.uploadFileToS3(file, folderName);
                    alert("File uploaded successfully!");

                if(url) {
                    // Prepare roles as an array
                    const formattedValues = {
                        docName: data.docName,
                        docUrl: url,
                        status:data.status
                    };
                    await uploadInvestorDocs(formattedValues, id);
                    navigate(`/investors/investor-detail/${id}`);
                    this.uploadingImg = false;
                    setDocDetailList(true);
                    console.log("File available at:", url);
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