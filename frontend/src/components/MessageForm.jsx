import axios from 'axios';
import React,{useState} from 'react'
import { toast } from 'react-toastify';

const MessageForm = () => {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const handleMessage = async(e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    try{
      await axios.post('https://hospital-management-system-dkxp.onrender.com/api/v1/message/send',
        {firstName, lastName, email, phone, message},
        {
          withCredentials:true,
          headers:{
            'Content-Type':'application/json',
            // 'Accept':'application/json'
          },

      }
      ).then((res)=>{
        toast.success(res.data.message);
        setFirstName('');
        setLastName('');
        setEmail('');
        setPhone(''); 
        setMessage('');
      });

    }catch(error){
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className='container form-component message-form'>
      <h2>Send a Message</h2>
      <form onSubmit={handleMessage}>
        <div>
        <input type="text" 
        placeholder='First Name'
        value={firstName} 
        onChange={(e)=>setFirstName(e.target.value)} />

        <input  type="text" 
        placeholder='Last Name'
        value={lastName} 
        onChange={(e)=>setLastName(e.target.value)} />
        </div>

        <div>
        <input type="text" 
        placeholder='Email'
        value={email} 
        onChange={(e)=>setEmail(e.target.value)} />

        <input  type="number" 
        placeholder='Phone'
        value={phone} 
        onChange={(e)=>setPhone(e.target.value)} />
        </div>

        <textarea rows={7} 
        placeholder='Message'
         value={message}
          onChange={(e)=>setMessage(e.target.value)}
        ></textarea>
        <div style={{ justifyContent:'center', alignItems:'center'}}>
          <button type='submit'> Send</button>
        </div>
      </form>
    </div>
  )
}

export default MessageForm