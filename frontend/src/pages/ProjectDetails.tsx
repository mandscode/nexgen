import { Link, useParams } from "react-router-dom";
import { getProject } from "../api/apiEndpoints";
import { useEffect, useRef, useState } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { useSelector } from "react-redux";
import '@splidejs/splide/css'; // Import Splide styles
import ProjectCard from "../utils/ProjectCard";
import ProjectCardMobile from "../components/mobile/ProjectCardMobile";
import { useDispatch } from "react-redux";
import { fetchImages } from "../redux/actions/fetchImagesActions";
import { Loader } from "../utils/Loader";

interface Project {
    id: number;
    name: string;
    address: string;
    latitude: number | null;
    longitude: number | null;
    startDate: string; // ISO string for date
    actualMaturityDate: string; // ISO string for date
    overallCost: number;
    description: string;
    ownerName: string;
    createdAt: string; // ISO string for timestamp
    updatedAt: string; // ISO string for timestamp
    legalId: string;
    maturityLockingPeriod: number; // in days
    entityID: number;
    resources: Array<any>; // Specify the type if you know the structure of resources
    settings: any | null; // Specify the type if settings have a known structure
    entity: {
      id: number;
      name: string;
      address: string;
      // Add other fields of the entity if applicable
    };
    images:any[]
}

const ProjectDetails = () => {
    const {id} = useParams();
    const [project, setProject] = useState<Project>();

    const mainSplideRef = useRef<any>(null);
    const asideSplideRef = useRef<any>(null);

    useEffect(() => {
        const initializeSplide = () => {
            const mainSplide = mainSplideRef.current?.splide;
            const asideSplide = asideSplideRef.current?.splide;
    
            if (mainSplide && asideSplide) {
                const thumbnails = asideSplide.Components.Elements.list.children;
                Array.from(thumbnails).forEach((thumbnail: any, index) => {
                    thumbnail.addEventListener('click', () => {
                        mainSplide.go(index); // Change main slide
                    });
                });
            } else {
                // Retry after a delay
                setTimeout(initializeSplide, 100);
            }
        };
    
        initializeSplide();
    }, []);
    
    
    
    

    const { images, error, loading, projects, token } = useSelector((state: any) => ({
        loading: state.userDetails?.loading,
        images: state.projectImages?.images,
        token: state.token.token,
        error: state.userDetails?.error,
        projects:state?.projectsDetail?.projects
    }));

    const dispatch = useDispatch();
    
    useEffect(() => {
        const fetchProject = async () => {
            try {
                await dispatch(fetchImages() as any)
                const fetchedProject = await getProject(Number(id));
                const projectImages = await getProjectImages(fetchedProject.name);

                if(fetchedProject) {
                    setProject({
                        ...fetchedProject,
                        images:projectImages || []
                    });
                }
            } catch (error) {
                console.error('Error fetching project:', error);
            }
        };
        fetchProject();
    }, [id]);

    const getProjectsImages = (projectName: string) => {
        if (!projectName || !images || images.length === 0) return ['/assets/media/images/no-image.jpg'];
    
        const formattedName = projectName.replace(/\s+/g, ''); // Remove spaces
    
        // Filter images matching the project name
        const projectImages = images.filter((image: string) =>
            image.includes(`projects/${formattedName}/Default`)
        );
    
        // Return found images or a default fallback
        return projectImages.length > 0 ? projectImages : ['/assets/media/images/no-image.jpg'];
    };
    

    const getProjectImages = (projectName: string) => {
        if (!projectName || !images || images.length === 0) return ['/assets/media/images/no-image.jpg'];

        const formattedName = projectName.replace(/\s+/g, ''); // Remove spaces

        const projectImages = images.filter((image: string) =>
            image.includes(`projects/${formattedName}/Default`)
        );

        return projectImages.length > 0 ? projectImages : ['/assets/media/images/no-image.jpg']
    };

    if (loading) {
        return <p>Loading...</p>;
    }
    
    if (error) {
        return <p>Error: {error}</p>;
    }
    

    return (
        <>
            {project ? (
                <section className="_project-details">
                    <div className="_container _project-details_wrapper">
                        <div className="_project-details_head">
                            <Link className="_project-details_head_link _title_h1" to={`/projects`}>
                                <svg xmlns="http://www.w3.org/2000/svg" width={41} height={41} viewBox="0 0 41 41" fill="none">
                                    <g clipPath="url(#clip0_581_4345)">
                                        <path d="M0.792649 20.0839C0.402125 20.4744 0.402125 21.1076 0.792649 21.4981L7.15661 27.8621C7.54713 28.2526 8.1803 28.2526 8.57082 27.8621C8.96135 27.4716 8.96135 26.8384 8.57082 26.4479L2.91397 20.791L8.57082 15.1342C8.96135 14.7436 8.96135 14.1105 8.57082 13.7199C8.1803 13.3294 7.54713 13.3294 7.15661 13.7199L0.792649 20.0839ZM2.3125 19.791H1.49976V21.791H2.3125V19.791Z" fill="#01276C" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_581_4345">
                                            <rect x="0.5" y="0.791016" width={40} height={40} rx={20} fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                                {project.name}:
                            </Link>
                        </div>
                        <div className="_project-details_body">
                            <div className="_project-details_media_wrapper">
                                <div className="_project-details_media">
                                    <Splide
                                        ref={mainSplideRef}
                                        options={{
                                            arrows: false,
                                            pagination: true,
                                            breakpoints: {
                                            480: {
                                                perPage: 1,
                                            },
                                            768: {
                                                perPage: 1,
                                            },
                                            992: {
                                                perPage: 1,
                                            },
                                            1024: {
                                                perPage: 1,
                                            },
                                            1180: {
                                                perPage: 1,
                                            },
                                            1440: {
                                                perPage: 1,
                                            },
                                            1920: {
                                                perPage: 1,
                                            },
                                            2160: {
                                                perPage: 1,
                                            },
                                            },
                                        }}
                                        >
                                        {project?.images && project?.images.map((image: string, index: number) => (

                                            <SplideSlide key={index}>
                                                <img className="_project-details_media_img _project-details_media_img_main" loading="lazy" src={image} />
                                            </SplideSlide>

                                        ))}
                                    </Splide>
                                </div>
                                <div className="_project-details_media_aside">
                                    <Splide
                                        ref={asideSplideRef}
                                        options={{
                                            gap:'8px',
                                            arrows: false,
                                            pagination: true,
                                            direction: 'ttb',
                                            height   : '44.7rem',
                                            breakpoints: {
                                            480: {
                                                perPage: 4,
                                            },
                                            768: {
                                                perPage: 4,
                                            },
                                            992: {
                                                perPage: 3,
                                            },
                                            1024: {
                                                perPage: 4,
                                            },
                                            1180: {
                                                perPage: 4,
                                            },
                                            1440: {
                                                perPage: 4,
                                            },
                                            1920: {
                                                perPage: 4,
                                            },
                                            2160: {
                                                perPage: 4,
                                            },
                                            },
                                        }}
                                        >
                                        {project?.images && project?.images.map((image: string, index: number) => (
                                            
                                            <SplideSlide key={index}>
                                                <img className="_project-details_media_img" loading="lazy" src={image} />
                                            </SplideSlide>

                                        ))}
                                    </Splide>
                                </div>
                            </div>
                            <div className="_project-details_info">
                                <p className="_project-details_info_title">Project Information</p>
                                <div className="_project-details_info_items">
                                    <div className="_project-details_info_item">
                                        <p className="_project-details_info_item_label">
                                            Project Cost
                                        </p>
                                        <p className="_project-details_info_item_value">
                                        ₹{project?.overallCost}
                                        </p>
                                    </div>
                                    <div className="_project-details_info_item">
                                        <p className="_project-details_info_item_label">
                                        Lock-in period
                                        </p>
                                        <p className="_project-details_info_item_value">
                                            {new Date(project.actualMaturityDate).toLocaleDateString('en-GB', {
                                                day: '2-digit',
                                                month: '2-digit',
                                                year: '2-digit',
                                            })}
                                        </p>
                                    </div>
                                    <div className="_project-details_info_item">
                                        <p className="_project-details_info_item_label">
                                        Start date
                                        </p>
                                        <p className="_project-details_info_item_value">
                                            {
                                                new Date(project.startDate).toLocaleDateString('en-GB', {
                                                    day: '2-digit',
                                                    month: '2-digit',
                                                    year: '2-digit',
                                                  })
                                            }
                                        </p>
                                    </div>
                                    <div className="_project-details_info_item">
                                        <p className="_project-details_info_item_label">
                                        Location
                                        </p>
                                        <p className="_project-details_info_item_value">
                                            {project.address}
                                        </p>
                                    </div>
                                </div>           
                            <div className="_project-details_info_description">
                                    <span className="_project-details_info_description_title">Description:</span>
                                    <span>
                                        {project?.description}
                                    </span>
                            </div>
                            </div>
                        </div>
                    </div>
                </section>
            ) : (
                <Loader/>
            )}

            {
                project ? 
                    <section className="_projects_grid">
                        <div className="_container _projects_grid_wrapper">
                            <h6 className="_projects_grid_title _title_h1">View similar projects</h6>
                            <div className="_projects_grid_items">
                                <div className="_avail-projects_list">
                                    {
                                        projects && projects.map((project: any, index: any) => {
                                            // Find the corresponding images for each project
                                            let projectImages = getProjectsImages(project.name);

                                            projectImages = projectImages.length > 0 ? projectImages : ['/assets/media/images/no-image.jpg'];
                                            return (
                                                <div key={index}>
                                                    <ProjectCard project={project} images={projectImages} token={token} />
                                                    <ProjectCardMobile project={project} images={projectImages} token={token} />
                                                </div>
                                            );
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </section>
                :
                null
            }
        </>
    );
    
}
 
export default ProjectDetails;  