import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { updateInvestorDocument } from '../api/apiEndpoints';

const MarkAllAsVerified:React.FC <any> = ({id, docs}) => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    // Assuming you fetch documents data from an API or have it already available
    const allDocsVerified = docs?.every((doc:any) => doc.status); // Check if all docs are verified
    setIsChecked(allDocsVerified);
  }, [docs]);

  const handleCheckboxChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;

    try {
      // Assuming `documents` is an array of documents that needs to be updated
      for (const doc of docs) {
        // Assuming that the document object has `id`, and `status`
        await updateInvestorDocument(checked, id, doc.id);
      }
      alert("All documents updated successfully!");
    } catch (error) {
      console.error('Error verifying documents:', error);
      alert("Error occurred while updating documents. Please try again.");
    }
  };
  

  return (
    <div style={{ display: 'flex', alignItems: 'center', fontFamily: 'Arial, sans-serif', }}>
      <input
        type="checkbox"
        id="markAllVerified"
        checked={isChecked}
        onChange={handleCheckboxChange}
        style={{ marginRight: '8px', borderRadius:'3.2px', borderColor:'rgba(1, 39, 108, 1)', position:'relative', textAlign:'center' }}
        className='_user-profile_info_section_details_docs_input '
      />
      <label htmlFor="markAllVerified"         className='_user-profile_info_section_details_docs_label' style={{ color: 'rgba(1, 39, 108, 1)', fontSize: '16px', fontWeight:500 }}>
        Mark all documents as verified
      </label>
    </div>
  );
};

export default MarkAllAsVerified;
