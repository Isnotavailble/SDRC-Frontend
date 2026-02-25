import { useState, useEffect } from "react";
import ResourceCard from "../../Cards/ResourceCard/ResourceCard";
import ResourceEditCard from "../../Cards/ResourceEditCard/ResourceEditCard";

export default function ResourceCardWrapper({ 
    card_id, 
    data_object, 
    onView, 
    isEditing, 
    onEdit, 
    onCancel, 
    selectedGeoPoint, 
    onDelete, 
    onComfirn 
}) {
    // 1. The Wrapper holds the data for both cards.
    const [localData, setLocalData] = useState(data_object);

    // 2. THE FIX: If the parent updates the main array, instantly sync the wrapper!
    useEffect(() => {
        setLocalData(data_object);
    }, [data_object]);

    const editHandler = () => {
        onEdit(localData, card_id);
    };

    const handleView = () => {
        onView(localData, card_id);
    };

    // 3. Intercept the save function to update the screen instantly
    const handleSave = async (updatedDataFromForm) => {
        // Run the API call
        const success = await onComfirn(updatedDataFromForm, card_id);
        
        // If it worked, update this exact card's data directly!
        if (success) {
            setLocalData(updatedDataFromForm);
        }
    };

    return (
        <div id={card_id}>
            {isEditing ? (
                <ResourceEditCard 
                    onCancle={onCancel} 
                    data_object={localData} 
                    selectedGeoPoint={selectedGeoPoint} 
                    onComfirn={handleSave} // Pass the intercepted save!
                />
            ) : (
                <ResourceCard 
                    data_object={localData} 
                    viewHandler={handleView} 
                    onEdit={editHandler} 
                    onDelete={onDelete} 
                />
            )}
        </div>
    );
}