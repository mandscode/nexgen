import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MarkAllAsVerified from "../utils/MarkAllAsVerified";

interface Document {
    docName: string;  // or whatever properties the docs have
    docUrl: string;  // or whatever properties the docs have
}

const Profile = () => {

    const { user, error, investor, loading } = useSelector((state: any) => ({
        loading: state.userDetails?.loading,
        user: state.userDetails?.user,
        error: state.userDetails?.error,
        investor: state.investorDetails?.investor,
        accountsData:state.investorAccsDetails?.accounts
    }));

    const [docs, setDocs] = useState<Document[]>();

    useEffect(() => {
        if(investor && investor?.documents) {
            setDocs(investor?.documents)
        }
    }, [investor])

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
                                    user.picture ?
                                    <img alt="profile pic" className="_user-profile_pic" src={user.picture}/>
                                    :
                                    <div className="_user-profile_pic_text">{user.firstName.charAt(0).toUpperCase()}</div>
                                }
                            </figure>
                            <span className="_user-profile_name">{user.firstName} {user.lastName}</span>
                        </div>
                        <div className="_user-profile_info">
                            <div className="_user-profile_info_section">
                                <h6 className="_user-profile_info_section_title _title_h2">Personal details</h6>
                                <div className="_user-profile_info_section_details">
                                    <div className="_user-profile_info_section_detail">
                                        <label className="_user-profile_info_section_label">Email</label>
                                        <input className="_user-profile_info_section_value" value={user.email}/>
                                    </div>
                                    <div className="_user-profile_info_section_detail">
                                        <label className="_user-profile_info_section_label">Mobile</label>
                                        <input className="_user-profile_info_section_value" value={investor?.personalDetails?.mobile ? investor.personalDetails.mobile : ''}/>
                                    </div>
                                    <div className="_user-profile_info_section_detail">
                                        <label className="_user-profile_info_section_label">Date of birth</label>
                                        <input className="_user-profile_info_section_value" value={investor?.personalDetails?.dob ? investor?.personalDetails?.dob : ''}/>
                                    </div>
                                    <div className="_user-profile_info_section_detail">
                                        <label className="_user-profile_info_section_label">Residential address</label>
                                        <input className="_user-profile_info_section_value" value={investor?.personalDetails?.residentialAddress ? investor?.personalDetails?.residentialAddress : ''}/>
                                    </div>
                                    <div className="_user-profile_info_section_detail">
                                        <label className="_user-profile_info_section_label">Mailing address</label>
                                        <input className="_user-profile_info_section_value" value={investor?.personalDetails?.mailingAddress ? investor?.personalDetails?.mailingAddress : ''}/>
                                    </div>
                                </div>
                            </div>
                            <div className="_user-profile_info_section">
                                <h6 className="_user-profile_info_section_title _title_h2">Nominee details</h6>
                                <div className="_user-profile_info_section_details">
                                    <div className="_user-profile_info_section_detail">
                                        <label className="_user-profile_info_section_label">Name</label>
                                        <input className="_user-profile_info_section_value" value={investor?.nomineeDetails ? investor?.nomineeDetails.name : ''}/>
                                    </div>
                                    <div className="_user-profile_info_section_detail">
                                        <label className="_user-profile_info_section_label">Email</label>
                                        <input className="_user-profile_info_section_value" value={investor?.nomineeDetails ? investor?.nomineeDetails.email : ''}/>
                                    </div>
                                    <div className="_user-profile_info_section_detail">
                                        <label className="_user-profile_info_section_label">Mobile</label>
                                        <input className="_user-profile_info_section_value" value={investor?.nomineeDetails ? investor?.nomineeDetails.mobile : ''}/>
                                    </div>
                                    <div className="_user-profile_info_section_detail">
                                        <label className="_user-profile_info_section_label">Relation</label>
                                        <input className="_user-profile_info_section_value" value={investor?.nomineeDetails ? investor.nomineeDetails.relation : ''}/>
                                    </div>
                                </div>
                            </div>
                            <div className="_user-profile_info_section">
                                <h6 className="_user-profile_info_section_title _title_h2">Your documents</h6>
                                <div className="_user-profile_info_section_details _user-profile_info_section_details_docs ">
                                    {
                                        docs && docs.map((doc:any, index:number) => (
                                            <div className="_user-profile_info_section_detail">
                                                <div style={{ position: 'relative', display: 'inline-block' }} className="_user-profile_info_section_label">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width={151} height={150} viewBox="0 0 151 150" fill="none">
                                                        <rect x="0.5" width={150} height={150} rx="22.5" fill="#01276C" />
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M75.4998 40.6255V62.9692C75.4998 64.3368 76.043 65.6483 77.01 66.6153C77.977 67.5822 79.2885 68.1255 80.656 68.1255H103V102.5C103 104.324 102.275 106.073 100.986 107.362C99.6968 108.651 97.9481 109.375 96.1248 109.375H54.8748C53.0514 109.375 51.3027 108.651 50.0134 107.362C48.7241 106.073 47.9998 104.324 47.9998 102.5V47.5005C47.9998 45.6771 48.7241 43.9284 50.0134 42.6391C51.3027 41.3498 53.0514 40.6255 54.8748 40.6255H75.4998ZM85.8123 85.313H65.1873C64.2756 85.313 63.4012 85.6752 62.7566 86.3198C62.1119 86.9645 61.7498 87.8388 61.7498 88.7505C61.7498 89.6622 62.1119 90.5365 62.7566 91.1812C63.4012 91.8258 64.2756 92.188 65.1873 92.188H85.8123C86.7239 92.188 87.5983 91.8258 88.2429 91.1812C88.8876 90.5365 89.2498 89.6622 89.2498 88.7505C89.2498 87.8388 88.8876 86.9645 88.2429 86.3198C87.5983 85.6752 86.7239 85.313 85.8123 85.313ZM68.6248 71.563H65.1873C64.2756 71.563 63.4012 71.9252 62.7566 72.5698C62.1119 73.2145 61.7498 74.0888 61.7498 75.0005C61.7498 75.9122 62.1119 76.7865 62.7566 77.4312C63.4012 78.0758 64.2756 78.438 65.1873 78.438H68.6248C69.5364 78.438 70.4108 78.0758 71.0554 77.4312C71.7001 76.7865 72.0623 75.9122 72.0623 75.0005C72.0623 74.0888 71.7001 73.2145 71.0554 72.5698C70.4108 71.9252 69.5364 71.563 68.6248 71.563ZM82.3748 40.7733C83.6772 41.0495 84.8713 41.698 85.8123 42.6399L100.985 57.813C101.927 58.7539 102.576 59.9481 102.852 61.2505H82.3748V40.7733Z" fill="#FAFAFA" />
                                                    </svg>

                                                    {/* Conditionally render the green tick SVG if doc.status is true */}
                                                    {doc.status && (
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="40"
                                                            height="40"
                                                            viewBox="0 0 40 40"
                                                            fill="none"
                                                            className="_verified_svg"
                                                            style={{
                                                                position: 'absolute',
                                                                top: '-10px',
                                                                right: '-10px',
                                                            }}
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
                                                <span className="_user-profile_info_section_value" >{doc.docName}</span>
                                                <Link target="_main" className="_user-profile_info_section_detail_link" to={doc.docUrl}/>
                                            </div>
                                        ))
                                    }
                                </div>
                                <MarkAllAsVerified id={Number(investor?.id)} docs={docs}/>
                            </div>
                            <div className="_user-profile_info_section">
                                <h6 className="_user-profile_info_section_title _title_h2">Emergency contact</h6>
                                <div className="_user-profile_info_section_details">
                                    <div className="_user-profile_info_section_detail">
                                        <label className="_user-profile_info_section_label">Name</label>
                                        <input className="_user-profile_info_section_value" 
                                            value={investor?.emergencyContact?.name || ''}
                                        />
                                    </div>
                                    <div className="_user-profile_info_section_detail">
                                        <label className="_user-profile_info_section_label">Mobile</label>
                                        <input className="_user-profile_info_section_value" 
                                            value={investor?.emergencyContact?.mobile || ''}
                                    />
                                    </div>
                                    <div className="_user-profile_info_section_detail">
                                        <label className="_user-profile_info_section_label">Relation</label>
                                        <input className="_user-profile_info_section_value" 
                                        value={investor?.emergencyContact?.relation || ''}
                                        />
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