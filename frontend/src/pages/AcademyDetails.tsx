import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import '@splidejs/splide/css'; // Import Splide styles
import { getAcademy } from "../api/apiEndpoints";
import { Loader } from "../utils/Loader";

export interface Academy {
    id?: number;
    title: string;
    imageUrl?: string;
    description: string;
}

const AcademyDetails = () => {
    const {id} = useParams();
    const [academy, setAcademy] = useState<Academy>();

    const { loading, error} = useSelector((state: any) => ({
        loading: state?.academiesDetail?.loading,
        error: state?.academiesDetail?.error
    }));
    
    useEffect(() => {
        const fetchProject = async () => {
            try {
                const fetchedAcademy = await getAcademy(Number(id));
                setAcademy(fetchedAcademy);
            } catch (error) {
                console.error('Error fetching project:', error);
            }
        };
        fetchProject();
    }, [id]);

    if (loading) {
        return <p>Loading...</p>;
    }
    
    if (error) {
        return <p>Error: {error}</p>;
    }

    

    return (
        <>
            {academy ? (
                <div className="_academy-details">
                    <div className="_container">
                        <div className="_academy-details_row">
                            <div className="_academy-details_col-lg-8 single-content">
                                <p className="mb-5">
                                    <img src={academy.imageUrl} alt="Image" className="img-fluid" />
                                </p>
                                <h1 className="mb-4">
                                    {academy.title}
                                </h1>
                                <p>
                                    {academy.description}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            ) : (
                <Loader/>
            )}
        </>
    );
    
}
 
export default AcademyDetails;