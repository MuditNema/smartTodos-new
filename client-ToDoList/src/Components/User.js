import user from '../assets/User.png'
import { Usercontext } from '../UserContext/UserState';
import { useContext ,useState,useEffect} from 'react';
const User = () => {
    const usercontext = useContext(Usercontext);
    const {UserDetails,Success} = usercontext;
    const [userName, setuserName] = useState('Unidentified User');
    useEffect(() => {
        const Run = async () =>{
            if(Success){
                setuserName(UserDetails.username);
            }
            else{
                setuserName('Unidentified User');
            }
        }
        Run();
    }, [Success])
    
    return ( 
       <div className="user-info-wrapper">
           <img src={user} alt="" />
           <span>{userName}</span>
       </div> 
     );
}
 
export default User;