import AddEditDeleteReplyComponent from './AddEditDeleteReplyComponent';



const AddCommentButton = ({ onAddComment, item, comments, user }) => {

    return (
        <>

            <AddEditDeleteReplyComponent
                onAddComment={onAddComment}
                item={item}
                comments={comments}
                user={user}
   
            />
          
        </>
    );
}

export default AddCommentButton;
