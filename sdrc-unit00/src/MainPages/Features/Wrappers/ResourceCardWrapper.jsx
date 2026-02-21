import ResourceCard from "../../Cards/ResourceCard/ResourceCard";
import ResourceEditCard from "../../Cards/ResourceEditCard/ResourceEditCard";

//This is the wrapper component that can handle dynamic rendering of edit card and normal card 
function ResourceCardWrapper({ card_id, data_object, onView, isEditing, onEdit,onCancel }) {
    const editHandler = () => {
        console.log(`${card_id} is editing now`);
        onEdit(card_id);
    }
    const handleView = () => {
        onView(data_object,card_id);
    }
    return (
        <div id={card_id}>
            {isEditing === true ? <ResourceEditCard onCancle={onCancel}/> :
                <ResourceCard data_object={data_object} viewHandler={handleView} onEdit={editHandler} />}
        </div>
    );
}
export default ResourceCardWrapper;