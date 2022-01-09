const express =  require('express');
const fetchUser = require('../middleware/fetchUser');
const app = express();
const router =  express.Router();
app.use(express.json());
const Task1 =  require('../Database/models/0-7Task');

router.post('/addtask',fetchUser,async (req,res) => {
    try {
        const {TaskName , TaskDescription , TaskDeadline} = req.body;
        const UserID = req.UserData.id;
        console.log(UserID);
        const Task = await Task1({
            TaskName,
            TaskDescription,
            TaskDeadline,
            isPending : true,
            UserID
        })
        const AddedTask = await Task.save();
        res.send({
            AddedTask,
            message : "Task successfully added",
            success : true
        })
    } catch (error) {
        //Error handling
        res.send({message:'Internal server error',success : false})
    }

})

router.put('/updatetask/:id',fetchUser,async (req,res) => {
    try {
        const {isPending,isDeleted} = req.body;
        const UpdatedTask = await Task1.findByIdAndUpdate(req.params.id,{
            $set : {
                isPending,
                isDeleted
            }
        },{
            new : true
        })
        res.send({message : "Task Updated Successfully",UpdatedTask,success : true});
    } catch (error) {
        res.send({message : "Failed to update task",success : false})
    }
})


router.get('/showtask/:id',fetchUser,async (req,res) => {
    try {
        const Tasks = await Task1.find({UserID : req.params.id});
        console.log(Tasks);
        res.send({Tasks,success : true,message : "Tasks fetched successfully"});
    } catch (error) {
        res.send({message : "Failed to fetch",success : false})
    }
})
module.exports = router;