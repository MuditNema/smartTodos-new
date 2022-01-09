const express =  require('express');
const fetchUser = require('../middleware/fetchUser');
const app = express();
const router =  express.Router();
app.use(express.json());
const Task3 =  require('../Database/models/15+Task');

router.post('/addtask',fetchUser,async (req,res) => {
    try {
        const {TaskName , TaskDeadline} = req.body;
        const UserID = req.UserData.id;
        console.log(UserID);
        const Task = await Task3({
            TaskName,
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
        const {isPending,isDeleted,Today,Tomorrow} = req.body;
        const UpdatedTask = await Task3.findByIdAndUpdate(req.params.id,{
            $set : {
                isPending,
                isDeleted,
                Tomorrow,
                Today
            }
        },{
            new : true
        })
        res.send({message : "Task Updated Successfully",UpdatedTask,success : true});
    } catch (error) {
        res.send({message : "Failed to update task",success : false})
    }
})

router.get('/showtasks',fetchUser,async (req,res) => {
    try {
        const Tasks = Task3.find();
        res.send({"AllTasks" : Tasks,success : true})
    } catch (error) {
        res.send({message : "Failed to fetch data",success : false})
    }
})

router.get('/showtask/:id',fetchUser,async (req,res) => {
    try {
        const Tasks = Task3.findById(req.params.id);
        res.send({"Task" : Tasks,success : true})
    } catch (error) {
        res.send({message : "Failed to fetch data",success : false})
    }
})
module.exports = router;