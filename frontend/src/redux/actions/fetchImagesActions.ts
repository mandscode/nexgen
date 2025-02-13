import AWS from 'aws-sdk';
import { Dispatch } from 'redux';
import { FETCH_IMAGES_REQUEST, FETCH_IMAGES_SUCCESS, FETCH_IMAGES_FAILURE } from './actionTypes';


const region = process.env.REACT_APP_AWS_REGION as string;
const accessKeyId = process.env.REACT_APP_AWS_ACCESS_KEY_ID as string;
const secretAccessKey = process.env.REACT_APP_AWS_SECRET_ACCESS_KEY as string;    

// Set AWS credentials explicitly
AWS.config.update({
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
    region: region,
});
  
// Action to fetch images
export const fetchImages = () => {
  console.log('fetchImages')
  return async (dispatch: Dispatch) => {
    dispatch({ type: FETCH_IMAGES_REQUEST });

    const s3 = new AWS.S3({
      region: region,
    });

    const bucketName = 'nexgen-s3-bucket';
    const prefix = `assets/media/images/projects/`;

    const params = {
      Bucket: bucketName,
      Prefix: prefix,
    };

    try {
      const data = await s3.listObjectsV2(params).promise();
      // Check if Contents is defined and not empty
      if (data.Contents && data.Contents.length > 0) {
        const images = data.Contents.map((item: any) => {
          return `https://${bucketName}.s3.ap-south-1.amazonaws.com/${item.Key}`;
        });


        dispatch({ type: FETCH_IMAGES_SUCCESS, payload: images });
      } else {
        dispatch({ type: FETCH_IMAGES_SUCCESS, payload: [] }); // Handle the case when no images are found
      }
    } catch (error:any) {
      dispatch({ type: FETCH_IMAGES_FAILURE, error: error.message });
    }
  };
};
