import { Link } from "react-router-dom";
import ProjectCard from "../utils/ProjectCard";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { fetchProjects } from "../redux/actions/projectsActions";
import ProjectCardMobile from "../components/mobile/ProjectCardMobile";
import { useAppDispatch } from "../redux/store";
import { fetchProjects } from "../redux/actions/projectsActions";

const Projects = () => {
    

    const dispatch = useAppDispatch();

    const [projectOptions, setProjectOptions] = useState<any>();
    
    const { projects, token, images, loading} = useSelector((state: any) => ({
      loading: state.projectsDetail?.loading,
      projects: state.projectsDetail?.projects,
      error: state.projectsDetail?.error,
      token: state.token.token,
      images:state.projectImages.images
    }));

    
    // Always call fetchProjects
    useEffect(() => {
        dispatch(fetchProjects());
    }, []);

    useEffect(() => {

      
          // Filter projects that match user entity IDs
          const filteredProjects = projects;
      
          setProjectOptions(filteredProjects);
      }, [ projects]);
      

    const getProjectImages = (projectName: string) => {
        if (!projectName || !images || images.length === 0) return [];
        const formattedName = projectName.replace(/\s+/g, ''); // Remove spaces
        return images.filter((image: string) =>
            image.includes(`projects/${formattedName}/Default`)
    );
};

if (loading) {
    return (
        <div className="smart-glass">
          <div className="logo">
            <div className="circle">
              <div className="circle">
                <div className="circle">
                </div>
              </div>
            </div>
            <div className="loading-text">
              Loading...
            </div>
          </div>
        </div>
        );
      }
    return (
        <>
            <section className="_avail-projects">
                <div className="_container _avail-projects_wrapper">
                    <div className="_avail-projects_head">
                        <Link className="_avail-projects_head_link" to={`/`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width={41} height={41} viewBox="0 0 41 41" fill="none">
                                <g clipPath="url(#clip0_581_4345)">
                                    <path d="M0.792649 20.0839C0.402125 20.4744 0.402125 21.1076 0.792649 21.4981L7.15661 27.8621C7.54713 28.2526 8.1803 28.2526 8.57082 27.8621C8.96135 27.4716 8.96135 26.8384 8.57082 26.4479L2.91397 20.791L8.57082 15.1342C8.96135 14.7436 8.96135 14.1105 8.57082 13.7199C8.1803 13.3294 7.54713 13.3294 7.15661 13.7199L0.792649 20.0839ZM2.3125 19.791H1.49976V21.791H2.3125V19.791Z" fill="#2A333A" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_581_4345">
                                        <rect x="0.5" y="0.791016" width={40} height={40} rx={20} fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>

                            Go back
                        </Link>
                        <h1 className="_avail-projects_title _h2">Available projects for you</h1>
                    </div>
                    <div className="_avail-projects_list">
                    {
                        projectOptions && projectOptions.map((project: any, index: any) => {
                            // Find the corresponding images for each project
                            const projectImages = getProjectImages(project.name);
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
            </section>
        </>
    );
}
 
export default Projects;