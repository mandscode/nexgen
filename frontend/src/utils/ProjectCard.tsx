import { Link } from "react-router-dom";

const ProjectCard = (props:any) => {

    const formatDate = (dateString:string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "2-digit",
        }).format(date);
    };

    const truncateText = (text:string, maxWords = 20, showWords = 10) => {
        if (!text) return ""; // Handle empty/undefined description
        const words = text.split(' ');
        return words.length > maxWords 
          ? words.slice(0, showWords).join(' ') + '...' 
          : text;
      };

    return (
        <>
            <div className="_project_summary_card">
                <h6 className="_project_summary_title _title_h2">{props.project.name}</h6>
                <figure className="_project_summary_media_wrapper">
                    <img 
                        className="_project_summary_media"
                        src={props?.project?.resources?.[0]?.location || '/assets/media/images/no-image.jpg'}
                        alt="Project Image"
                    />
                </figure>
                {
                    props?.token && props?.token !== null ?
                    <div className="_project_summary_info">
                        <div className="_project_summary_info_item">
                            <p className="_project_summary_info_item_name">Project Cost</p>
                            <p className="_project_summary_info_item_value">₹{props.project.overallCost}</p>
                        </div>
                        <div className="_project_summary_info_item">
                            <p className="_project_summary_info_item_name">Start date</p>
                            <p className="_project_summary_info_item_value">
                            {formatDate(props.project.startDate)}
                            </p>
                        </div>
                        <div className="_project_summary_info_item">
                            <p className="_project_summary_info_item_name">Country</p>
                            <p className="_project_summary_info_item_value">
                                {props.project.countryName}
                            </p>
                        </div>
                    </div>
                    :
                    null
                }
                <div className="_project_summary_description">
                    <span className="_project_summary_description_title">Description : </span>
                    <span className="_project_summary_description_text"> 
                        {props?.project?.description && truncateText(props.project.description)}
                    </span>
                </div>
                {
                    props?.token && props?.token !== null ?
                <Link className="_project_summary_card_link" to={`/project/${props.project.id}`}> </Link>
                :
                null
                }
            </div>
        </>
    );
}
 
export default ProjectCard;