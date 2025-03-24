import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MarkAllAsVerified from "../utils/MarkAllAsVerified";
import { getProfileDetails } from "../api/apiEndpoints";

interface Document {
    docName: string;  // or whatever properties the docs have
    docUrl: string;  // or whatever properties the docs have
}

const Profile = () => {
    const [profileData, setData] = useState<any>({})
    const { user, error, loading } = useSelector((state: any) => ({
        loading: state.userDetails?.loading,
        user: state.userDetails?.user,
        error: state.userDetails?.error,
    }));


    useEffect(() => {
        const fetchProfile = async () => {
            if (user) {
                try {
                    const data = await getProfileDetails(user.id); // ✅ Await here
                    setData(data);

                } catch (err) {
                    console.error(`Profile page error: ${err}`);
                }
            }
        };
    
        fetchProfile();
    }, [user]);
    
    
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
    
    if (error || user.length == 0) {
        return (
            <div className="error-container">
                <p>Error: {error}</p>
            </div>
        );
    }
    

    const personalDetails = profileData && profileData?.PersonalDetails || {};
    const nomineeDetails = profileData && profileData?.NomineeDetails || {};
    const emergencyContact = profileData && profileData?.EmergencyContactDetails || {};
    const documents = profileData && profileData?.Documents || [];
    
    

    return (
        <>
            <section className="_user-profile">
                <div className="_container _user-profile_wrapper">
                    <h1 className="_h2">
                    Your profile
                    </h1>
                    <div className="_user-profile_info-wrapper">
                        <div className="_user-profile_name-section">
                            <figure className="_user-profile_pic_wrapper">
                                {
                                    profileData.picture ?
                                    <img alt="profile pic" className="_user-profile_pic" src={user.picture}/>
                                    :
                                    <div className="_user-profile_pic_text">{user.firstName.charAt(0).toUpperCase()}</div>
                                }
                                
                            </figure>
                            <span className="_user-profile_name">{profileData.FirstName} {profileData.lastName}</span>
                        </div>
                        <div className="_user-profile_info">

<div className="_user-profile_info_section">
    <h6 className="_user-profile_info_section_title _title_h2">Personal details</h6>
    <div className="_user-profile_info_section_details">
        <div className="_user-profile_info_section_detail">
            <label className="_user-profile_info_section_label">Email</label>
            <input className="_user-profile_info_section_value" value={personalDetails.Email} />
        </div>
        <div className="_user-profile_info_section_detail">
            <label className="_user-profile_info_section_label">Mobile</label>
            <input className="_user-profile_info_section_value" value={personalDetails?.Mobile || ''} />
        </div>
        <div className="_user-profile_info_section_detail">
            <label className="_user-profile_info_section_label">Date of birth</label>
            <input className="_user-profile_info_section_value" value={personalDetails?.DOB || ''} />
        </div>
        <div className="_user-profile_info_section_detail">
            <label className="_user-profile_info_section_label">Residential address</label>
            <input className="_user-profile_info_section_value" value={personalDetails?.ResidentialAddress || ''} />
        </div>
        <div className="_user-profile_info_section_detail">
            <label className="_user-profile_info_section_label">Mailing address</label>
            <input className="_user-profile_info_section_value" value={personalDetails?.MailingAddress || ''} />
        </div>
    </div>
</div>

<div className="_user-profile_info_section">
    <h6 className="_user-profile_info_section_title _title_h2">Nominee details</h6>
    <div className="_user-profile_info_section_details">
        <div className="_user-profile_info_section_detail">
            <label className="_user-profile_info_section_label">Name</label>
            <input className="_user-profile_info_section_value" value={nomineeDetails?.Name || ''} />
        </div>
        <div className="_user-profile_info_section_detail">
            <label className="_user-profile_info_section_label">Email</label>
            <input className="_user-profile_info_section_value" value={nomineeDetails?.Email || ''} />
        </div>
        <div className="_user-profile_info_section_detail">
            <label className="_user-profile_info_section_label">Mobile</label>
            <input className="_user-profile_info_section_value" value={nomineeDetails?.Mobile || ''} />
        </div>
        <div className="_user-profile_info_section_detail">
            <label className="_user-profile_info_section_label">Relation</label>
            <input className="_user-profile_info_section_value" value={nomineeDetails?.Relation || ''} />
        </div>
    </div>
</div>

<div className="_user-profile_info_section">
    <h6 className="_user-profile_info_section_title _title_h2">Your documents</h6>
    <div className="_user-profile_info_section_details _user-profile_info_section_details_docs">
        {documents.map((doc: any, index: number) => (
                <div key={index} className="_user-profile_info_section_detail">
                    <div style={{ position: "relative", display: "inline-block" }} className="_user-profile_info_section_label">
                        {/* File Icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" width={151} height={150} viewBox="0 0 151 150" fill="none">
                            <rect x="0.5" width={150} height={150} rx="22.5" fill="#214897" />
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M75.4998 40.6255V62.9692C75.4998 64.3368 76.043 65.6483 77.01 66.6153C77.977 67.5822 79.2885 68.1255 80.656 68.1255H103V102.5C103 104.324 102.275 106.073 100.986 107.362C99.6968 108.651 97.9481 109.375 96.1248 109.375H54.8748C53.0514 109.375 51.3027 108.651 50.0134 107.362C48.7241 106.073 47.9998 104.324 47.9998 102.5V47.5005C47.9998 45.6771 48.7241 43.9284 50.0134 42.6391C51.3027 41.3498 53.0514 40.6255 54.8748 40.6255H75.4998Z"
                                fill="#FAFAFA"
                            />
                        </svg>

                        {/* Green Tick if Verified */}
                        {doc.Status === 1 && (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="40"
                                height="40"
                                viewBox="0 0 40 40"
                                fill="none"
                                className="_verified_svg"
                                style={{ position: "absolute", top: "-10px", right: "-10px" }}
                            >
                                <rect width="40" height="40" rx="20" fill="#1ABE0C" />
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M28.7059 13.831C28.9178 14.043 29.0369 14.3305 29.0369 14.6302C29.0369 14.93 28.9178 15.2175 28.7059 15.4295L17.9664 26.169C17.7544 26.3809 17.4669 26.5 17.1671 26.5C16.8674 26.5 16.5799 26.3809 16.3679 26.169L11.2807 21.0819C11.0748 20.8687 10.9608 20.5831 10.9634 20.2867C10.966 19.9903 11.0849 19.7067 11.2945 19.4971C11.5041 19.2875 11.7876 19.1687 12.084 19.1661C12.3804 19.1635 12.666 19.2774 12.8792 19.4834L17.1671 23.7713L27.1074 13.831C27.3194 13.6191 27.6069 13.5 27.9066 13.5C28.2064 13.5 28.4939 13.6191 28.7059 13.831Z"
                                    fill="white"
                                />
                            </svg>
                        )}
                    </div>
                    <span className="_user-profile_info_section_value">{doc.Name}</span>

                    {/* Open in New Tab */}
                    <a href={doc.URL} target="_blank" rel="noopener noreferrer" className="_user-profile_info_section_detail_link">
                        
                    </a>

                    {/* Download Document
                    <a href={doc.docUrl} download className="_user-profile_info_section_detail_link">
                        Download
                    </a> */}

                    {/* View in Google Docs (for PDFs, DOCs, etc.) */}
                    {/* {doc.docUrl.endsWith(".pdf") || doc.docUrl.endsWith(".docx") || doc.docUrl.endsWith(".pptx") ? (
                        <a href={`https://docs.google.com/gview?url=${doc.docUrl}&embedded=true`} target="_blank" rel="noopener noreferrer" className="_user-profile_info_section_detail_link">
                            View in Google Docs
                        </a>
                    ) : null} */}
                </div>
            ))}
    </div>

    <MarkAllAsVerified id={Number(user?.investorId)} docs={documents} />
</div>

                            <div className="_user-profile_info_section">
    <h6 className="_user-profile_info_section_title _title_h2">Emergency contact</h6>
    <div className="_user-profile_info_section_details">
        <div className="_user-profile_info_section_detail">
            <label className="_user-profile_info_section_label">Name</label>
            <input className="_user-profile_info_section_value" value={emergencyContact?.Name || ''} />
        </div>
        <div className="_user-profile_info_section_detail">
            <label className="_user-profile_info_section_label">Mobile</label>
            <input className="_user-profile_info_section_value" value={emergencyContact?.Mobile || ''} />
        </div>
        <div className="_user-profile_info_section_detail">
            <label className="_user-profile_info_section_label">Relation</label>
            <input className="_user-profile_info_section_value" value={emergencyContact?.Relation || ''} />
        </div>
    </div>
</div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
 
export default Profile;