import React, { useEffect, useState } from 'react';
import { updateInvestorDocument } from '../api/apiEndpoints';

const MarkAllAsVerified:React.FC <any> = ({id, docs}) => {
  const [isChecked, setIsChecked] = useState(false);
  const [localDocs, setLocalDocs] = useState<Document[]>([]);
  useEffect(() => {
    // Assuming you fetch documents data from an API or have it already available
    const allDocsVerified = docs && docs.every((doc:any) => doc.Status); // Check if all docs are verified
    setIsChecked(allDocsVerified);
  }, [docs]);

  useEffect(() => {
    const parsedDocs = typeof docs === 'string' ? JSON.parse(docs) : docs;
    setLocalDocs(parsedDocs);
  }, [docs]);

  const handleCheckboxChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    try {
      // Update the status of each document in the local state
      const updatedDocs = localDocs.map((doc:any) => ({
        ...doc,
        Status: checked, // Update the status based on the checkbox
      }));
      
      // Update the local state
      await setLocalDocs(updatedDocs);
      
      // Save the updated status to the backend
      for (const doc of updatedDocs) {
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
